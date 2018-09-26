import { CHAT_CONNECT, receiveMessage } from '../actions/chat.js';

const chatMiddleware = store => next => (action) => {
  switch (action.type) {
    case CHAT_CONNECT:
      let session = action.value;
      console.log('chatMiddleware :connect to:', session);
      session.subscribe('chat/global', function(uri, message) {
        console.log('public message received', message);
        store.dispatch(receiveMessage(message));
      });
      session.subscribe('chat/private', function(uri, message) {
        console.log('private message received',message);
        store.dispatch(receiveMessage(message));
      });
      break;
    default:
  }
  next(action);
};

export default chatMiddleware;
