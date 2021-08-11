import axios from 'axios';
import Cookies from 'js-cookie';
import { ALERGIES_LIST_FETCHED, SET_ERROR_ALERGIES_LIST } from '../types';

export const getAllAlergies = () => {
  return (dispatch, getState) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/alergies`,
      headers: {
        Authorization: `Bearer ${Cookies.get('Accesstoken')}`,
      },
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

export const setAlergiesList = data => ({
  type: ALERGIES_LIST_FETCHED,
  payload: data,
});
