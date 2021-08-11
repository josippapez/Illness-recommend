import axios from 'axios';
import { PATIENT_INFO_FETCHED, PATIENT_INFO_FETCHED_ERROR } from '../types';

export const fetchPatientById = patientId => {
  return (dispatch, getState) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/patients-details/${patientId}`,
      withCredentials: true,
    })
      .then(response => {
        dispatch(patientInfoFetched(response.data));
      })
      .catch(error =>
        dispatch(
          setErrorPatientInfo({
            error: error.message,
            status: error.status,
          })
        )
      );
  };
};

export const createPatientDetails = patient => {
  return (dispatch, getState) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/patients-details/`,
      withCredentials: true,
      data: {
        ...patient,
      },
    })
      .then(response => {
        dispatch(fetchPatientById(response.data.id));
        dispatch(
          setErrorPatientInfo({
            message: response.data.successMessage,
            error: null,
            status: response.status,
          })
        );
        dispatch(
          setErrorPatientInfo({ message: null, error: null, status: null })
        );
      })
      .catch(error => {
        dispatch(
          setErrorPatientInfo({
            error: error.response.data,
            status: error.status,
          })
        );
      });
  };
};

export const updatePatientDetails = patient => {
  return (dispatch, getState) => {
    axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URL}/patients-details/`,
      withCredentials: true,
      data: {
        ...patient,
      },
    })
      .then(response => {
        dispatch(
          setErrorPatientInfo({
            message: response.data.successMessage,
            error: null,
            status: response.status,
          })
        );
        dispatch(
          setErrorPatientInfo({ message: null, error: null, status: null })
        );
        dispatch(fetchPatientById(patient.id));
      })
      .catch(error =>
        dispatch(
          setErrorPatientInfo({
            error: error.response.data,
            status: error.status,
          })
        )
      );
  };
};

export const patientInfoFetched = data => ({
  type: PATIENT_INFO_FETCHED,
  payload: data,
});

export const setErrorPatientInfo = data => ({
  type: PATIENT_INFO_FETCHED_ERROR,
  payload: data,
});
