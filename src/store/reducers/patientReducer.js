import {
  PATIENT_INFO_FETCHED,
  PATIENT_INFO_FETCHED_ERROR,
  PATIENT_LIST_FETCHED,
  VIEWING_PATIENT_INFO_FETCHED,
} from '../types';

const initialState = {
  currentPatientInfo: null,
  viewingPatientInfo: null,
  error: null,
  status: null,
  message: null,
  patientList: null,
};

export const patient = (state = initialState, action) => {
  switch (action.type) {
    case PATIENT_LIST_FETCHED: {
      return {
        ...state,
        patientList: action.payload,
        status: null,
        message: null,
        error: null,
      };
    }
    case PATIENT_INFO_FETCHED: {
      return {
        ...state,
        currentPatientInfo: action.payload,
        status: null,
        message: null,
        error: null,
      };
    }
    case VIEWING_PATIENT_INFO_FETCHED: {
      return {
        ...state,
        viewingPatientInfo: action.payload,
      };
    }
    case PATIENT_INFO_FETCHED_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        status: action.payload.status,
        message: action.payload.message,
      };
    }
    default:
      return state;
  }
};
