import { USERS_LIST_FETCHED, SET_ERROR_USER_LIST } from '../types';

const initialState = {
  users: null,
  error: null,
  status: null,
};

export const usersList = (state = initialState, action) => {
  switch (action.type) {
    case USERS_LIST_FETCHED:
      return {
        users: action.payload,
        error: null,
        status: null,
      };
    case SET_ERROR_USER_LIST: {
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
