import axios from 'axios';
import { SYMPTOMS_LIST_FETCHED, SET_ERROR_SYMPTOMS_LIST } from '../types';

export const getAllSymptoms = () => {
  return (dispatch, getState) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/symptom`,
      withCredentials: true,
    })
      .then(response => {
        dispatch(setSymptomsList(response.data));
      })
      .catch(error =>
        dispatch({
          type: SET_ERROR_SYMPTOMS_LIST,
          payload: {
            error: error.message,
            status: error.status,
          },
        })
      );
  };
};

export const setSymptomsList = data => ({
  type: SYMPTOMS_LIST_FETCHED,
  payload: data,
});
