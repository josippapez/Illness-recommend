import axios from 'axios';
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
      .catch(error =>
        dispatch(
          loginError({
            message: error.response.data.message,
            status: error.response.status,
          })
        )
      );
  };
};

export const loginUser = (email, password) => {
  return (dispatch, getState) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/authentication/log-in`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then(response => {
        dispatch(userLoggedIn(response.data));
      })
      .catch(error =>
        dispatch(
          loginError({
            message: error.response.data.message,
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
    role: user.role
  },
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

export const loginError = error => ({
  type: SET_ERROR_USER,
  payload: {
    error: error.message,
    status: error.status,
  },
});
