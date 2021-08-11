import axios from 'axios';
import Cookies from 'js-cookie';
import {
  PATIENT_INFO_FETCHED,
  PATIENT_INFO_FETCHED_ERROR,
  PATIENT_LIST_FETCHED,
} from '../types';

export const getAllPatientsForAdmin = () => {
  return (dispatch, getState) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/patients-details/`,
      headers: {
        Authorization: `Bearer ${Cookies.get('Accesstoken')}`,
      },
    })
      .then(response => {
        dispatch(setPatientsList(response.data));
      })
      .catch(error =>
        setErrorCurrentPatientInfo({
          message: error.message,
          error: error.message,
          status: error.status,
        })
      );
  };
};

export const getAllPatientsForUser = () => {
  return (dispatch, getState) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/patients-details/forUser`,
      headers: {
        Authorization: `Bearer ${Cookies.get('Accesstoken')}`,
      },
    })
      .then(response => {
        dispatch(setPatientsList(response.data));
      })
      .catch(error =>
        setErrorCurrentPatientInfo({
          message: error.message,
          error: error.message,
          status: error.status,
        })
      );
  };
};

export const searchPatientsByText = query => {
  return (dispatch, getState) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/patients-details/search?search=${query}`,
      headers: {
        Authorization: `Bearer ${Cookies.get('Accesstoken')}`,
      },
    })
      .then(response => {
        dispatch(setPatientsList(response.data));
      })
      .catch(error =>
        dispatch(
          setErrorCurrentPatientInfo({
            message: error.message,
            error: error.message,
            status: error.status,
          })
        )
      );
  };
};

export const fetchPatientById = patientId => {
  return (dispatch, getState) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/patients-details/${patientId}`,
      headers: {
        Authorization: `Bearer ${Cookies.get('Accesstoken')}`,
      },
    })
      .then(response => {
        dispatch(currentPatientInfoFetched(response.data));
      })
      .catch(error =>
        dispatch(
          setErrorCurrentPatientInfo({
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
      headers: {
        Authorization: `Bearer ${Cookies.get('Accesstoken')}`,
      },
      data: {
        ...patient,
      },
    })
      .then(response => {
        dispatch(fetchPatientById(response.data.id));
        dispatch(
          setErrorCurrentPatientInfo({
            message: response.data.successMessage,
            error: null,
            status: response.status,
          })
        );
        dispatch(
          setErrorCurrentPatientInfo({
            message: null,
            error: null,
            status: null,
          })
        );
      })
      .catch(error => {
        dispatch(
          setErrorCurrentPatientInfo({
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
      headers: {
        Authorization: `Bearer ${Cookies.get('Accesstoken')}`,
      },
      data: {
        ...patient,
      },
    })
      .then(response => {
        dispatch(
          setErrorCurrentPatientInfo({
            message: response.data.successMessage,
            error: null,
            status: response.status,
          })
        );
        dispatch(
          setErrorCurrentPatientInfo({
            message: null,
            error: null,
            status: null,
          })
        );
        dispatch(fetchPatientById(patient.id));
      })
      .catch(error =>
        dispatch(
          setErrorCurrentPatientInfo({
            error: error.response.data,
            status: error.status,
          })
        )
      );
  };
};

export const removePatientDetailsById = id => {
  return (dispatch, getState) => {
    axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/patients-details/delete`,
      headers: {
        Authorization: `Bearer ${Cookies.get('Accesstoken')}`,
      },
      data: { id },
    })
      .then(response => {
        dispatch(
          setErrorCurrentPatientInfo({
            message: response.data.successMessage,
            error: null,
            status: response.status,
          })
        );
        dispatch(
          setErrorCurrentPatientInfo({
            message: null,
            error: null,
            status: null,
          })
        );
        dispatch(getAllPatientsForAdmin());
      })
      .catch(error =>
        dispatch(
          setErrorCurrentPatientInfo({
            error: error.response.data,
            status: error.status,
          })
        )
      );
  };
};

export const setPatientsList = data => ({
  type: PATIENT_LIST_FETCHED,
  payload: data,
});

export const currentPatientInfoFetched = data => ({
  type: PATIENT_INFO_FETCHED,
  payload: data,
});

export const setErrorCurrentPatientInfo = data => ({
  type: PATIENT_INFO_FETCHED_ERROR,
  payload: data,
});
