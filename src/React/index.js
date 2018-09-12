import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from 'src/components/App';
import { Provider } from 'react-redux';
import store from 'src/store';
import { connection } from 'src/store/actions';

const rootComponent = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(rootComponent, document.getElementById('root'));
console.log('src/index')
store.dispatch(connection());
