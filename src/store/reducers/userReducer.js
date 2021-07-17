import { USER_LOGGED_IN, USER_LOGGED_OUT, SET_ERROR_USER } from '../types';

const initialState = {
  role: null,
  isAuthenticated: false,
  error: null,
  status: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        isAuthenticated: true,
        error: null,
        status: null,
      };
    case USER_LOGGED_OUT: {
      return {
        id: null,
        name: null,
        email: null,
        isAuthenticated: false,
        error: null,
        status: null,
      };
    }
    case SET_ERROR_USER: {
      return {
        ...state,
        error: action.payload.error,
        status: action.payload.status,
      };
    }
    default:
      return state;
  }
};
