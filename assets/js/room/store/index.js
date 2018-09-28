import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer'; // notre reducer custom
import game from './middlewares/game.js'; // notre middleware custom
import router from './middlewares/router.js'; // notre middleware custom

// Extension Redux Dev Tools
const devTools = [
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
];

// Middlewares custom — on n'en a qu'un seul
const socketMiddleware = applyMiddleware(game, router);

// socketMiddleware : les extensions/outils + les middlewares custom
// const socketMiddleware = compose(socketMiddleware, ...devTools);

// Store, configuré avec le reducer et les "enhancers"
const store = createStore(reducer, socketMiddleware); //createStore(reducer, enhancers);

export default store;