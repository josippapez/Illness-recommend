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

export const removeUserById = id => {
  return (dispatch, getState) => {
    axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/users/delete`,
      withCredentials: true,
    })
      .then(response => {
        console.log(response);
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

export const createUserDetails = user => {
  return (dispatch, getState) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/users-details/`,
      withCredentials: true,
      data: {
        id: user.id,
        age: Number(user.age),
        weight: Number(user.weight),
        pregnantOrBreastFeed: user.pregnantOrBreastFeed,
        alergies: user.alergies,
      },
    })
      .then(response => {
        dispatch(setErrorUserInfo({ error: null, status: response.status }));
        dispatch(setErrorUserInfo({ error: null, status: null }));
      })
      .catch(error => {
        dispatch(
          setErrorUserInfo({
            error: error.response.data,
            status: error.status,
          })
        );
      });
  };
};

export const updateUserDetails = user => {
  return (dispatch, getState) => {
    axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URL}/users-details/`,
      withCredentials: true,
      data: {
        id: user.id,
        age: Number(user.age),
        weight: Number(user.weight),
        pregnantOrBreastFeed: user.pregnantOrBreastFeed,
        alergies: user.alergies,
      },
    })
      .then(response => {
        dispatch(setErrorUserInfo({ error: null, status: response.status }));
        dispatch(setErrorUserInfo({ error: null, status: null }));
      })
      .catch(error =>
        dispatch(
          setErrorUserInfo({
            error: error.response.data,
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
