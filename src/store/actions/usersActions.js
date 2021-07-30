import axios from 'axios';
import {
  SET_ERROR_USER_LIST,
  USERS_LIST_FETCHED,
  USER_INFO_FETCHED,
  USER_INFO_FETCHED_ERROR,
} from '../types';

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

export const fetchUserInfoById = userId => {
  return (dispatch, getState) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/users-details/${userId}`,
      withCredentials: true,
    })
      .then(response => {
        dispatch(userInfoFetched(response));
      })
      .catch(error =>
        dispatch(
          setErrorUserInfo({
            error: error.message,
            status: error.status,
          })
        )
      );
  };
};

export const userInfoFetched = data => ({
  type: USER_INFO_FETCHED,
  payload: data,
});

export const setErrorUserInfo = data => ({
  type: USER_INFO_FETCHED_ERROR,
  payload: data,
});
