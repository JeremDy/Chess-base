import { WEBSOCKET_CONNECT, INITIAL_DISPLAY, initialDisplay, MESSAGE_SUBMIT } from '../actions';

const ioMiddle = store => next => (action) => {
  let webSocket;

  switch (action.type) {
    case WEBSOCKET_CONNECT:
      const channel = action.channel;

      webSocket = WS.connect('ws://127.0.0.1:8080'); //ws://127.0.0.1:8080  // TODO: Objet WS non reconnue ?
      webSocket.on('socket/connect', function(session) {
        console.log('connect to :' + channel);
        session.subscribe(channel, function(uri, serverMessage) {
          console.log(serverMessage);
          store.dispatch(initialDisplay(serverMessage, webSocket));
        });
      });
      break;
    case MESSAGE_SUBMIT:
      break;
    default:
  }

  next(action);
};

export default ioMiddle;
