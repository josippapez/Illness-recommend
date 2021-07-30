/* istanbul ignore file */
import { combineReducers } from 'redux';

import { user } from './userReducer';
import { usersList } from './usersList';
import { alergies } from './alergiesReducer';

export const reducers = combineReducers({
  user,
  usersList,
  alergies,
});
