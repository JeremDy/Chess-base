import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers'; // notre reducer custom
import chatMiddleware from './middlewares/chat'; // notre middleware custom
import playerListMiddleware from './middlewares/playerList'; 
import routerMiddleware from './middlewares/router'; 

// Extension Redux Dev Tools
// const devTools = [
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ];

// Middlewares custom — on n'en a qu'un seul
const socketMiddleware = applyMiddleware(chatMiddleware, playerListMiddleware, routerMiddleware);

// Enhancers : les extensions/outils + les middlewares custom
// const enhancers = compose(socketMiddleware, ...devTools);

// Store, configuré avec le reducer et les "enhancers"
const store = createStore(reducer, socketMiddleware); //createStore(reducer, enhancers);

export default store;