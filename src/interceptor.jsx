import axios from 'axios';
import Cookies from 'js-cookie';
import token from 'jsonwebtoken';
import moment from 'moment';
import { userLoggedOut } from './store/actions';

import { persistor, store } from './store/store';

let subscribers = [];
let isAlreadyFetchingAccessToken = false;

export const getAuthData = localStore => {
  if (!localStore.user.accessToken || !localStore.user.refreshToken) {
    const { accessToken, refreshToken } = localStore.user;
    return { accessToken, refreshToken };
  }
  return localStore ? localStore.user : '';
};

export const addSubscriber = callback => {
  subscribers.push(callback);
};

export const refreshAuthentication = refreshToken => {
  return axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL}/authentication/refresh`,
    withCredentials: true,
  });
};

export const logOutAndWipeLocalStorage = () => {
  window.location.replace('/login');
  persistor.pause();
  persistor
    .purge()
    .then(() => persistor.flush())
    .finally(() => {
      window.localStorage.clear();
      window.localStorage.removeItem('persist:root');
      Cookies.remove('Refreshtoken');
      Cookies.remove('Accesstoken');
    });
  store.dispatch(userLoggedOut());
};

export const onAccessTokenFetched = accessToken => {
  subscribers.forEach(callback => callback(accessToken));
  subscribers = [];
};

export const refreshAccessTokenAndReattemptRequest = async error => {
  console.log('refreshing');
  try {
    const { response: errorResponse } = error;
    const { refreshToken } = getAuthData(store.getState());
    if (!refreshToken) {
      return Promise.reject(error);
    }

    const originalRequest = new Promise(resolve => {
      addSubscriber(accessToken => {
        errorResponse.config.headers.Authorization = `Bearer ${accessToken}`;
        resolve(axios(errorResponse.config));
      });
    });
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      const response = await refreshAuthentication(refreshToken);

      if (response.status !== 200) logOutAndWipeLocalStorage();
      if (!response.data) return Promise.reject(error);

      const newAccessToken = response.data.access_token;
      const newRefreshToken = response.data.refresh_token;

      const newAccessTokenExpiration = token.decode(newAccessToken);
      const newRefreshTokenExpiration = token.decode(newRefreshToken);
      if (
        newAccessTokenExpiration.exp <= moment.utc().unix() ||
        newRefreshTokenExpiration.exp <= moment.utc().unix()
      ) {
        alert('Vaša sjednica je istekla. Ponovno se prijavite!');
        logOutAndWipeLocalStorage();
      }

      onAccessTokenFetched(newAccessToken);
      isAlreadyFetchingAccessToken = false;
    }
    return originalRequest;
  } catch (err) {
    logOutAndWipeLocalStorage();
    return Promise.reject(err);
  }
};

export const isTokenExpiredError = errorResponse => {
  if (errorResponse) return errorResponse.status === 401;
  return false;
};

export const intercept = () => {
  axios.interceptors.request.use(
    request => {
      const refreshTokenExpiration = token.decode(Cookies.get('Refreshtoken'));
      if (
        refreshTokenExpiration &&
        refreshTokenExpiration.exp <= moment.utc().unix()
      ) {
        alert('Vaša sjednica je istekla. Ponovno se prijavite!');
        return logOutAndWipeLocalStorage();
      }
      return request;
    },
    error => {
      const accessTokenExpiration = token.decode(Cookies.get('Accesstoken'));
      const refreshTokenExpiration = token.decode(Cookies.get('Refreshtoken'));
      if (
        accessTokenExpiration &&
        accessTokenExpiration.exp <= moment.utc().unix()
      ) {
        refreshAccessTokenAndReattemptRequest(error);
      }
      if (
        refreshTokenExpiration &&
        refreshTokenExpiration.exp <= moment.utc().unix()
      ) {
        alert('Vaša sjednica je istekla. Ponovno se prijavite!');
        logOutAndWipeLocalStorage();
      }
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    response => response,
    error => {
      const errorResponse = error.response;
      if (isTokenExpiredError(errorResponse)) {
        return refreshAccessTokenAndReattemptRequest(error);
      }
      return Promise.reject(error);
    }
  );
};
