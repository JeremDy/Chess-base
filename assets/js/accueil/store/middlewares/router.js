import { WEBSOCKET_CONNECT } from '../actions/router';
import { chatConnection } from '../actions/chat';
import { listConnection } from '../actions/playerList';

const routerMiddleware = store => next => (action) => {
  let webSocket;

  switch (action.type) {
    case WEBSOCKET_CONNECT:
      webSocket = WS.connect('ws://127.0.0.1:8080'); //ws://127.0.0.1:8080  // TODO: Objet WS non reconnue ?
      console.log('RouteMiddleware connect to', webSocket);
      webSocket.on('socket/connect', function(session) {
        store.dispatch(listConnection(session));
        store.dispatch(chatConnection(session));
      });
      break;

    default:
  }

  next(action);
};

export default routerMiddleware;
