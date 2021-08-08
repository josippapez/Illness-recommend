import { SET_THEME } from '../types';

export const setDarkTheme = data => ({
  type: SET_THEME,
  payload: data,
});
