import axios from 'axios';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';

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
        console.log(response);
        dispatch(loginUser(email, password));
      })
      .catch(error => console.log(error));
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
        console.log(response);
        dispatch(userLoggedIn(response.data));
      })
      .catch(error => console.log(error));
  };
};

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  payload: {
    id: user.id,
    email: user.email,
    name: user.name,
  },
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});
