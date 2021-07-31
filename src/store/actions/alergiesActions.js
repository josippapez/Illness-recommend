import axios from 'axios';
import { ALERGIES_LIST_FETCHED, SET_ERROR_ALERGIES_LIST } from '../types';
import { userInfoFetched } from './usersActions';

export const getAllAlergies = () => {
  return (dispatch, getState) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/alergies`,
      withCredentials: true,
    })
      .then(response => {
        dispatch(setAlergiesList(response.data));
      })
      .catch(error =>
        dispatch({
          type: SET_ERROR_ALERGIES_LIST,
          payload: {
            error: error.message,
            status: error.status,
          },
        })
      );
  };
};

export const createNewAlery = alergy => {
  return (dispatch, getState) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/alergies/`,
      withCredentials: true,
      data: {
        name: alergy,
      },
    })
      .then(response => {
        console.log(response);
        dispatch(getAllAlergies());
      })
      .catch(error =>
        dispatch({
          type: SET_ERROR_ALERGIES_LIST,
          payload: {
            error: error.message,
            status: error.status,
          },
        })
      );
  };
};

export const setAlergiesList = data => ({
  type: ALERGIES_LIST_FETCHED,
  payload: data,
});
