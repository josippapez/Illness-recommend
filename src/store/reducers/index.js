/* istanbul ignore file */
import { combineReducers } from 'redux';

import { user } from './userReducer';
import { usersList } from './usersList';

export const reducers = combineReducers({
  user,
  usersList,
});
