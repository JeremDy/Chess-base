export const TOGGLE_FORM = 'actions/TOGGLE_FORM';
export const USERNAME_SUBMIT = 'actions/USERNAME_SUBMIT';
export const USERNAME_WRITE = 'actions/USERNAME_WRITE';

export const MESSAGE_SUBMIT = 'actions/MESSAGE_SUBMIT';
export const MESSAGE_WRITE = 'actions/MESSAGE_WRITE';

// export const WEBSOCKET_CONNECT = 'actions/WEBSOCKET_CONNECT';
export const MESSAGE_SEND = 'actions/MESSAGE_SEND';
export const MESSAGE_RECEIVED = 'actions/MESSAGE_RECEIVED';
export const CHAT_CONNECT = 'actions/CHAT_CONNECT';

export const chatConnection = (session) => ({
  type: CHAT_CONNECT,
  value: session
});

export const send = () => ({
  type: MESSAGE_SEND
});

export const receiveMessage = (message) => ({
  type: MESSAGE_RECEIVED,
  value: message
});

export const toggleForm = () => ({
  type: TOGGLE_FORM
});

export const sumbitUserName = () => ({
  type: USERNAME_SUBMIT
});
export const writeUserName = (valueWrittenUserName) => ({
  type: USERNAME_WRITE,
  value: valueWrittenUserName
});

export const sumbitMessage = () => ({
  type: MESSAGE_SUBMIT
});
export const writeMessage = (valueWrittenMessage) => ({
  type: MESSAGE_WRITE,
  value: valueWrittenMessage
});