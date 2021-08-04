import {
  MEDICATION_INFO_FETCHED,
  MEDICATION_INFO_FETCHED_ERROR,
  MEDICATION_LIST_FETCHED,
  SET_ERROR_MEDICATION_LIST,
} from '../types';

const initialState = {
  medicationInfo: { data: null, error: null, status: null },
  medications: null,
  error: null,
  status: null,
};

export const medicationList = (state = initialState, action) => {
  switch (action.type) {
    case MEDICATION_LIST_FETCHED:
      return {
        medications: action.payload,
        error: null,
        status: null,
      };
    case SET_ERROR_MEDICATION_LIST: {
      return {
        ...state,
        error: action.payload.error,
        status: action.payload.status,
        message: action.payload.message,
      };
    }
    case MEDICATION_INFO_FETCHED: {
      return {
        ...state,
        medicationInfo: {
          data: action.payload.data,
          error: null,
          status: null,
          message: action.payload.message,
        },
      };
    }
    case MEDICATION_INFO_FETCHED_ERROR: {
      return {
        ...state,
        medicationInfo: {
          ...state.medicationInfo,
          error: action.payload.error,
          status: action.payload.status,
          message: action.payload.message,
        },
      };
    }
    default:
      return state;
  }
};
