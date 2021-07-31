import axios from 'axios';
import {
  MEDICATION_INFO_FETCHED,
  MEDICATION_INFO_FETCHED_ERROR,
  MEDICATION_LIST_FETCHED,
  SET_ERROR_MEDICATION_LIST,
} from '../types';

export const getAllMedications = () => {
  return (dispatch, getState) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/medications/`,
      withCredentials: true,
    })
      .then(response => {
        dispatch(setUsersList(response.data));
      })
      .catch(error =>
        dispatch({
          type: SET_ERROR_MEDICATION_LIST,
          payload: {
            error: error.message,
            status: error.status,
          },
        })
      );
  };
};

export const setUsersList = data => ({
  type: MEDICATION_LIST_FETCHED,
  payload: data,
});

export const medicationInfoFetched = data => ({
  type: MEDICATION_INFO_FETCHED,
  payload: data,
});

export const setErrorMedicationInfo = data => ({
  type: MEDICATION_INFO_FETCHED_ERROR,
  payload: data,
});
