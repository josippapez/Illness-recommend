import axios from 'axios';
import Cookies from 'js-cookie';
import { SET_ERROR_USER, USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';

export const registerUser = (name, email, password) => {
  return (dispatch, getState) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/authentication/register`,
      data: {
        name,
        email,
        password,
      },
    })
      .then(response => {
        dispatch(loginUser(email, password));
      })
      .catch(error => {
        dispatch(
          loginError({
            error: error.response.data,
            status: error.response.status,
          })
        );
      });
  };
};

export const loginUser = (email, password) => {
  return (dispatch, getState) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/authentication/log-in`,
      data: {
        email,
        password,
      },
    })
      .then(response => {
        Cookies.set('Accesstoken', response.data.accessToken, {
          expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
        });
        Cookies.set('Refreshtoken', response.data.refreshToken, {
          expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
        });
        dispatch(userLoggedIn(response.data.user));
      })
      .catch(error =>
        dispatch(
          loginError({
            message: error.response.data.successMessage,
            error: error.response.data,
            status: error.response.status,
          })
        )
      );
  };
};

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  payload: {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  },
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

export const loginError = data => ({
  type: SET_ERROR_USER,
  payload: data,
});
