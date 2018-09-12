import { WEBSOCKET_CONNECT, receiveMessage, MESSAGE_SUBMIT } from '../actions';

const ioMiddle = store => next => (action) => {
  let webSocket;
  switch (action.type) {
    case WEBSOCKET_CONNECT:

      webSocket = WS.connect('ws://127.0.0.1:8080'); //ws://127.0.0.1:8080
      console.log('connect')
      webSocket.on('socket/connect', function(session) {
        console.log('connec socket 1')
        session.subscribe('chat/global', function(uri, message) {
            console.log('public message received',message);
          store.dispatch(receiveMessage(message));
        });
        session.subscribe('chat/private', function(uri, message) {
          console.log('private message received',message);
        store.dispatch(receiveMessage(message));
      });
      });

      break;

    case MESSAGE_SUBMIT:
      webSocket = WS.connect('ws://127.0.0.1:8080');
      const { valueWrittenMessage: messageSend, valueWrittenUserName: userName } = store.getState();
      console.log('submit')
      if (messageSend.substr(0,1)==='/') {
        let privateUser = messageSend.substr(1, messageSend.search(' ')-1);
        let privateMessage = messageSend.substr(messageSend.search(' ')+1 ,9999);
        const message = {message: privateMessage, receiver: privateUser};
        webSocket.on('socket/connect', function(session) {
          session.publish('chat/private', message);
          console.log('private message send', message);
        });
      }else{
      const message = {message: messageSend, receiver: userName};
      webSocket.on('socket/connect', function(session) {
        session.publish('chat/global', message);
        console.log('public message send', message);
      });
      }
      break;
    default:
  }

  next(action);
};

export default ioMiddle;
