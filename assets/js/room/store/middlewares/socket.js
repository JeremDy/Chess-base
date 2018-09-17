import { INITIAL_DISPLAY, receiveMessage, MESSAGE_SUBMIT } from '../actions';

const ioMiddle = store => next => (action) => {
  let webSocket;

  switch (action.type) {
    case INITIAL_DISPLAY:
    //   const channel = store.state.channel;
    //   console.log('channel', channel);
    //   webSocket = WS.connect('ws://127.0.0.1:8080'); //ws://127.0.0.1:8080
    //   console.log('connect to chess socket');
    //   webSocket.on(channel, function(session) {
    //     console.log('connect to ' + channel);
    //     session.subscribe(channel, function(uri, payload) {
    //       console.log('payload received', payload);
    //     //   store.dispatch(receiveMessage(message));
    //     });
    //   });

      break;

    case MESSAGE_SUBMIT:
    //   webSocket = WS.connect('ws://127.0.0.1:8080');
    //   const { valueWrittenMessage: messageSend, valueWrittenUserName: userName } = store.getState();
    //   console.log('submit')
    //   if (messageSend.substr(0,1)==='/') {
    //     let privateUser = messageSend.substr(1, messageSend.search(' ')-1);
    //     let privateMessage = messageSend.substr(messageSend.search(' ')+1 ,9999);
    //     const message = {message: privateMessage, receiver: privateUser};
    //     webSocket.on('socket/connect', function(session) {
    //       session.publish('chat/private', message);
    //       console.log('private message send', message);
    //     });
    //   }else{
    //   const message = {message: messageSend, receiver: userName};
    //   webSocket.on('socket/connect', function(session) {
    //     session.publish('chat/global', message);
    //     console.log('public message send', message);
    //   });
    //   }
      break;
    default:
  }

  next(action);
};

export default ioMiddle;
