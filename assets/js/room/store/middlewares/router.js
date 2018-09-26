import { WEBSOCKET_CONNECT, initialDisplay } from '../actions';

const routerMiddleware = store => next => (action) => {
  let webSocket;
  switch (action.type) {
    case WEBSOCKET_CONNECT:
      let channel = action.channel;
      webSocket = WS.connect('ws://127.0.0.1:8080'); //ws://127.0.0.1:8080  // TODO: Objet WS non reconnue ?
      webSocket.on('socket/connect', function(session) {
        store.dispatch(initialDisplay(session, channel));
      });
      break;

    default:
  }
  next(action);
};

export default routerMiddleware;
