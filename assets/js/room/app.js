import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { initialDisplay, webSocketConnect } from './store/actions';
import FullRoom from './components/FullRoom';

const rootComponent = (
  <Provider store={store}>
    <FullRoom />
  </Provider>
  
);

render(rootComponent, document.getElementById('root'));


store.dispatch(webSocketConnect(GAME_CHANEL));
