import { ALERGIES_LIST_FETCHED, SET_ERROR_ALERGIES_LIST } from '../types';

const initialState = {
  alergies: null,
  error: null,
  status: null,
  message: null,
};

export const alergies = (state = initialState, action) => {
  switch (action.type) {
    case ALERGIES_LIST_FETCHED:
      return {
        alergies: action.payload,
        error: null,
        status: null,
      };
    case SET_ERROR_ALERGIES_LIST: {
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
