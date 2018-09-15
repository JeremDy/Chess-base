import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer'; // notre reducer custom
import socket from './middlewares/socket'; // notre middleware custom

// Extension Redux Dev Tools
const devTools = [
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
];

// Middlewares custom — on n'en a qu'un seul
const socketMiddleware = applyMiddleware(socket);

// Enhancers : les extensions/outils + les middlewares custom
const enhancers = compose(socketMiddleware, ...devTools);

// Store, configuré avec le reducer et les "enhancers"
const store = createStore(reducer,enhancers); //createStore(reducer, enhancers);

export default store;