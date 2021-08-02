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

export const createMedication = medication => {
  return (dispatch, getState) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/medications/`,
      withCredentials: true,
      data: medication,
    })
      .then(response => {
        dispatch(
          setErrorMedicationInfo({ error: null, status: response.status })
        );
        dispatch(setErrorMedicationInfo({ error: null, status: null }));
        dispatch(getAllMedications());
      })
      .catch(error => {
        dispatch(
          setErrorMedicationInfo({
            error: error.response.data,
            status: error.status,
          })
        );
      });
  };
};

export const updateMedication = medication => {
  return (dispatch, getState) => {
    axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URL}/medications/`,
      withCredentials: true,
      data: medication,
    })
      .then(response => {
        dispatch(
          setErrorMedicationInfo({ error: null, status: response.status })
        );
        dispatch(setErrorMedicationInfo({ error: null, status: null }));
        dispatch(getAllMedications());
      })
      .catch(error =>
        dispatch(
          setErrorMedicationInfo({
            error: error.response.data,
            status: error.status,
          })
        )
      );
  };
};

export const removeMedicationById = id => {
  return (dispatch, getState) => {
    axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/medications/delete`,
      withCredentials: true,
      data: { id },
    })
      .then(response => {
        dispatch(
          setErrorMedicationInfo({
            error: null,
            status: response.status,
          })
        );
        dispatch(
          setErrorMedicationInfo({
            error: null,
            status: null,
          })
        );
        dispatch(getAllMedications());
      })
      .catch(error =>
        dispatch(
          setErrorMedicationInfo({
            error: error.response.data,
            status: error.status,
          })
        )
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
