import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  SET_ERROR_USER,
  USER_INFO_FETCHED,
  USER_INFO_FETCHED_ERROR,
} from '../types';

const initialState = {
  userInfo: { data: null, error: null, status: null },
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
        role: action.payload.role,
        isAuthenticated: true,
        error: null,
        status: null,
      };
    case USER_LOGGED_OUT: {
      return {
        id: null,
        name: null,
        email: null,
        role: null,
        isAuthenticated: false,
        error: null,
        status: null,
      };
    }
    case USER_INFO_FETCHED: {
      return {
        ...state,
        userInfo: { data: action.payload.data, error: null, status: null },
      };
    }
    case USER_INFO_FETCHED_ERROR: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          error: action.payload.error,
          status: action.payload.status,
        },
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
