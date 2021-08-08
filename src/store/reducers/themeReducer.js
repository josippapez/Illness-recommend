import { SET_THEME } from '../types';

const initialState = {
  darkTheme: false,
};

export const theme = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        darkTheme: action.payload,
      };
    default:
      return state;
  }
};
