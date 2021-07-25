import axios from 'axios';
import { SET_ERROR_USER_LIST, USERS_LIST_FETCHED } from '../types';

export const getAllUsers = () => {
  return (dispatch, getState) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/users`,
      withCredentials: true,
    })
      .then(response => {
        dispatch(setUsersList(response.data));
      })
      .catch(error =>
        dispatch({
          type: SET_ERROR_USER_LIST,
          payload: {
            error: error.message,
            status: error.status,
          },
        })
      );
  };
};

export const setUsersList = data => ({
  type: USERS_LIST_FETCHED,
  payload: data,
});
