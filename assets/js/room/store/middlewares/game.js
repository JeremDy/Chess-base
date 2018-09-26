import { INITIAL_DISPLAY, messageReceived } from '../actions';

const ioMiddle = store => next => (action) => {
  switch (action.type) {
    case INITIAL_DISPLAY:
      let channel = action.channel;
      let session = action.session;
      session.subscribe(channel, function(uri, serverMessage) {
        store.dispatch(messageReceived(serverMessage, session));
      });
      break;
    default:
  }

  next(action);
};

export default ioMiddle;
