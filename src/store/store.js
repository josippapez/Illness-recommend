import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { reducers } from './reducers';

const middleware = [];

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

middleware.push(thunk);
if (process.env.NODE_ENV === 'development') middleware.push(logger);

const store = createStore(persistedReducer, applyMiddleware(...middleware));

const persistor = persistStore(store);

export { persistor, store };
