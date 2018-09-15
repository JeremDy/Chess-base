import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router/index.js';
import { Provider } from 'react-redux';
import store from './store';
import { connection } from './store/actions';
import { BrowserRouter as Routering } from 'react-router-dom';

const rootComponent = (
  <Provider store={store}>
    <Routering>
      <Router />
    </Routering>
  </Provider>
);

render(rootComponent, document.getElementById('root'));

store.dispatch(connection());
