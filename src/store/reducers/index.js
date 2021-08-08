/* istanbul ignore file */
import { combineReducers } from 'redux';

import { user } from './userReducer';
import { usersList } from './usersList';
import { alergies } from './alergiesReducer';
import { medicationList } from './medicationReducer';
import { symptoms } from './symptomsReducer';
import { theme } from './themeReducer';

export const reducers = combineReducers({
  user,
  usersList,
  alergies,
  medicationList,
  symptoms,
  theme,
});
