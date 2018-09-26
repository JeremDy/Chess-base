import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Router from './container/router.js';
import { Provider } from 'react-redux';
import store from './store';
import { webSocketConnect } from './store/actions/router.js';

const rootComponent = (
  <Provider store={store}>
    <Router />
  </Provider>
);

render(rootComponent, document.getElementById('root'));

store.dispatch(webSocketConnect());
