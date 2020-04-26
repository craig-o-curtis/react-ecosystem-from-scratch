import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// redux-persist
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react'
import { configureStore } from './Store/Store';
import App from './App';

const store = configureStore();
const persister = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate 
      loading={<div>Loading...</div>}
      persistor={persister}>
      <App/>
    </PersistGate>
  </Provider>, 
  document.getElementById('root')
);
