import { receivedList, LIST_CONNECT } from '../actions/playerList.js';

const playerMiddleware = store => next => (action) => {
  switch (action.type) {
    case LIST_CONNECT:
      let session = action.value;
      console.log('playerMiddleware connect to', session);
      session.subscribe('player', function(uri, list) {
        console.log('public list received', list);
        store.dispatch(receivedList(list));
      });
      break;
    default:
  }
  next(action);
};

export default playerMiddleware;
