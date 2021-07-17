/* istanbul ignore file */
import { combineReducers } from 'redux';

import { user } from './userReducer';

export const reducers = combineReducers({
  user,
});
