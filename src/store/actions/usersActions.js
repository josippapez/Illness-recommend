import axios from 'axios';
import {
  SET_ERROR_USER_LIST,
  USERS_LIST_FETCHED,
  USER_INFO_FETCHED,
  USER_INFO_FETCHED_ERROR,
} from '../types';
import { createAlergiesUserInfoRelation } from './alergiesActions';

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

export const searchUsersByText = query => {
  return (dispatch, getState) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/users/search?search=${query}`,
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

export const fetchUserInfoById = userId => {
  return (dispatch, getState) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/users/${userId}`,
      withCredentials: true,
    })
      .then(response => {
        dispatch(userInfoFetched(response));
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

export const updateUserDetails = userDetails => {
  return (dispatch, getState) => {
    axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URL}/users/`,
      withCredentials: true,
      data: {
        ...userDetails,
      },
    })
      .then(response => {
        dispatch(
          setErrorUserInfo({
            message: response.data.successMessage,
            error: null,
            status: response.status,
          })
        );
        dispatch(
          setErrorUserInfo({ message: null, error: null, status: null })
        );
        dispatch(getAllUsers());
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

export const removeUserById = id => {
  return (dispatch, getState) => {
    axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/users/delete`,
      withCredentials: true,
      data: { id },
    })
      .then(response => {
        dispatch(
          setErrorUserInfo({
            message: response.data.successMessage,
            error: null,
            status: response.status,
          })
        );
        dispatch(
          setErrorUserInfo({ message: null, error: null, status: null })
        );
        dispatch(getAllUsers());
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

export const userInfoFetched = data => ({
  type: USER_INFO_FETCHED,
  payload: data,
});

export const setUsersList = data => ({
  type: USERS_LIST_FETCHED,
  payload: data,
});

export const setErrorUserInfo = data => ({
  type: USER_INFO_FETCHED_ERROR,
  payload: data,
});
