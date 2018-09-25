import { combineReducers } from 'redux';
import chat from './chat.js';
import router from './router.js';
import playerList from './playerList.js';

const reducer = combineReducers({
  chat,
  router,
  playerList
});

export default reducer;