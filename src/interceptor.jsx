import axios from 'axios';
import Cookies from 'js-cookie';
import token from 'jsonwebtoken';
import moment from 'moment';
import { userLoggedIn } from './store/actions';

import { persistor, store } from './store/store';

let subscribers = [];
let isAlreadyFetchingAccessToken = false;

export const addSubscriber = callback => {
  subscribers.push(callback);
};

export const refreshAuthentication = () => {
  return axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL}/authentication/refresh`,
    headers: {
      Authorization: `Bearer ${Cookies.get('Refreshtoken')}`,
    },
  })
    .then(response => {
      Cookies.set('Accesstoken', response.data, {
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
      });
      return response;
    })
    .catch(error => error);
};

export const logOutAndWipeLocalStorage = () => {
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
  window.location.replace('/login');
};

export const onAccessTokenFetched = () => {
  subscribers.forEach(callback => {
    callback();
  });
  subscribers = [];
};

export const refreshAccessTokenAndReattemptRequest = async (
  error,
  refreshToken
) => {
  try {
    const { response: errorResponse } = error;
    if (!refreshToken) {
      return Promise.reject(error);
    }
    const originalRequest = new Promise(resolve => {
      addSubscriber(() => {
        errorResponse.config.headers.Authorization = `Bearer ${Cookies.get(
          'Accesstoken'
        )}`;
        resolve(axios(errorResponse.config));
      });
    });
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      const response = await refreshAuthentication();
      if (response.status !== 200) logOutAndWipeLocalStorage();
      if (!response.data) return Promise.reject(error);
      const accessTokenExpiration = token.decode(Cookies.get('Accesstoken'));
      if (
        !accessTokenExpiration ||
        accessTokenExpiration.exp <= moment.utc().unix()
      ) {
        alert('Vaša sjednica je istekla. Ponovno se prijavite!');
        logOutAndWipeLocalStorage();
      }
      onAccessTokenFetched();
      isAlreadyFetchingAccessToken = false;
    }
    return originalRequest;
  } catch (err) {
    logOutAndWipeLocalStorage();
    return Promise.reject(err);
  }
};

export const intercept = () => {
  axios.interceptors.request.use(
    request => {
      const refreshTokenExpiration = token.decode(Cookies.get('Refreshtoken'));
      if (
        refreshTokenExpiration &&
        refreshTokenExpiration.exp <= moment.utc().unix()
      ) {
        return logOutAndWipeLocalStorage();
      }
      return request;
    },
    error => {
      const accessTokenExpiration = token.decode(Cookies.get('Accesstoken'));
      const refreshTokenExpiration = token.decode(Cookies.get('Refreshtoken'));
      if (
        !refreshTokenExpiration ||
        (refreshTokenExpiration &&
          refreshTokenExpiration.exp <= moment.utc().unix())
      ) {
        alert('Vaša sjednica je istekla. Ponovno se prijavite!');
        logOutAndWipeLocalStorage();
      }
      if (
        accessTokenExpiration &&
        accessTokenExpiration.exp <= moment.utc().unix()
      ) {
        return refreshAccessTokenAndReattemptRequest(
          error,
          refreshTokenExpiration
        );
      }
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    response => response,
    error => {
      const accessTokenExpiration = token.decode(Cookies.get('Accesstoken'));
      const refreshTokenExpiration = token.decode(Cookies.get('Refreshtoken'));
      if (
        !refreshTokenExpiration ||
        (refreshTokenExpiration &&
          refreshTokenExpiration.exp <= moment.utc().unix())
      ) {
        alert('Vaša sjednica je istekla. Ponovno se prijavite!');
        logOutAndWipeLocalStorage();
      }
      if (
        accessTokenExpiration &&
        accessTokenExpiration.exp <= moment.utc().unix()
      ) {
        return refreshAccessTokenAndReattemptRequest(
          error,
          refreshTokenExpiration
        );
      }
      return Promise.reject(error);
    }
  );
};
