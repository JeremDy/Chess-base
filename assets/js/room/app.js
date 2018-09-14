import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App/index.js';
// import { Provider } from 'react-redux';
// import store from './store';
// import { connection } from './store/actions';

const rootComponent = (
//   <Provider store={store}>
    <App />
//   </Provider>
);

render(rootComponent, document.getElementById('root'));

store.dispatch(connection());
