import { SYMPTOMS_LIST_FETCHED, SET_ERROR_SYMPTOMS_LIST } from '../types';

const initialState = {
  symptoms: null,
  error: null,
  status: null,
  message: null,
};

export const symptoms = (state = initialState, action) => {
  switch (action.type) {
    case SYMPTOMS_LIST_FETCHED:
      return {
        symptoms: action.payload,
        error: null,
        status: null,
      };
    case SET_ERROR_SYMPTOMS_LIST: {
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
