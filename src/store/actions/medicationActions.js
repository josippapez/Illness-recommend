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
        dispatch(setMedicationsList(response.data));
      })
      .catch(error =>
        dispatch({
          type: SET_ERROR_MEDICATION_LIST,
          payload: {
            message: error.message,
            error: error.message,
            status: error.status,
          },
        })
      );
  };
};

export const searchMedicationsByText = query => {
  return (dispatch, getState) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/medications/search?search=${query}`,
      withCredentials: true,
    })
      .then(response => {
        dispatch(setMedicationsList(response.data));
      })
      .catch(error =>
        dispatch({
          type: SET_ERROR_MEDICATION_LIST,
          payload: {
            message: error.message,
            error: error.message,
            status: error.status,
          },
        })
      );
  };
};

export const getMedicationsBySymptomsAndAlergies = symptoms => {
  return (dispatch, getState) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/medications/find-by-symptoms`,
      withCredentials: true,
      data: symptoms,
    })
      .then(response => {
        dispatch(
          setErrorMedicationInfo({
            message: response.data.successMessage,
            error: null,
            status: response.status,
          })
        );
        dispatch(
          setErrorMedicationInfo({ message: null, error: null, status: null })
        );
        dispatch(setMedicationsList(response.data));
      })
      .catch(error =>
        dispatch({
          type: SET_ERROR_MEDICATION_LIST,
          payload: {
            message: error.message,
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
          setErrorMedicationInfo({
            message: response.data.successMessage,
            error: null,
            status: response.status,
          })
        );
        dispatch(
          setErrorMedicationInfo({ message: null, error: null, status: null })
        );
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
          setErrorMedicationInfo({
            message: response.data.successMessage,
            error: null,
            status: response.status,
          })
        );
        dispatch(
          setErrorMedicationInfo({ message: null, error: null, status: null })
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
            message: response.data.successMessage,
            error: null,
            status: response.status,
          })
        );
        dispatch(
          setErrorMedicationInfo({ message: null, error: null, status: null })
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

export const setMedicationsList = data => ({
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
