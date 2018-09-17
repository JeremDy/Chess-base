import { INITIAL_DISPLAY, receiveMessage, MESSAGE_SUBMIT } from '../actions';

const ioMiddle = store => next => (action) => {
  let webSocket;

  switch (action.type) {
    case INITIAL_DISPLAY:
      break;
    case MESSAGE_SUBMIT:
      break;
    default:
  }

  next(action);
};

export default ioMiddle;
