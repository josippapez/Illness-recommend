import { PATIENT_INFO_FETCHED, PATIENT_INFO_FETCHED_ERROR } from '../types';

const initialState = {
  patientInfo: null,
  error: null,
  status: null,
  message: null,
};

export const patient = (state = initialState, action) => {
  switch (action.type) {
    case PATIENT_INFO_FETCHED: {
      return {
        ...state,
        patientInfo: action.payload,
        status: null,
        message: null,
        error: null,
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
