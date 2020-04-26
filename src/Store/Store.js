import { createStore, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {todos} from './TodosReducer';

const reducers = {
  todos,
};

// creates consumable reducer forcreateStore
const rootReducer = combineReducers(reducers);
// redux-persist
const persistConfig = {
  key: 'root',
  storage, // defaults to localStorage on the web
  stateReconciler: autoMergeLevel2 // Tells redux-persist how to reconcile intial + stored states
};
// persistConfig - tells Redux how to save, where to store app data
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
