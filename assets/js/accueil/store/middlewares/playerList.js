import { receivedList, LIST_CONNECT } from '../actions/playerList.js';

const playerMiddleware = store => next => (action) => {
  switch (action.type) {
    case LIST_CONNECT:
      let session = action.value;
      console.log('playerMiddleware connect to', session);
    //   webSocket.on('socket/connect', function(session) {
    //     console.log('connec socket 1');
    //     session.subscribe('chat/global', function(uri, message) {
    //       console.log('public message received', message);
    //       store.dispatch(receivedList(message));
    //     });
    //     session.subscribe('chat/private', function(uri, message) {
    //       console.log('private message received',message);
    //       store.dispatch(receivedList(message));
    //     });
    //   });

      break;

    default:
  }

  next(action);
};

export default playerMiddleware;
