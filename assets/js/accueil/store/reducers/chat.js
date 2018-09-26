import { TOGGLE_FORM, USERNAME_SUBMIT, USERNAME_WRITE, MESSAGE_SUBMIT, MESSAGE_WRITE, CHAT_CONNECT, MESSAGE_RECEIVED } from '../actions/chat.js';

const initialState = {
  hideForm: false,
  valueWrittenUserName: 'public',
  valueWrittenMessage: '',
  messageReceived: [],
  session: ''
};

const chat = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHAT_CONNECT:
      let newSession = action.value;
      console.log('REDUCER CHAT CONNECT', newSession);
      return {
        ...state,
        session: newSession
      };
    case MESSAGE_RECEIVED:
      return {
        ...state,
        messageReceived: state.messageReceived.concat([action.value])
      };
    case TOGGLE_FORM:
      return {
        ...state,
        hideForm: !state.hideForm
      };
    case USERNAME_SUBMIT:
      return {
        ...state,
        // valueWrittenUserName: '',
        hideForm: !state.hideForm
      };
    case USERNAME_WRITE:
      return {
        ...state,
        valueWrittenUserName: action.value
      };
    case MESSAGE_SUBMIT:
      const { valueWrittenMessage: messageSend, valueWrittenUserName: userName } = state;
      console.log('submit',messageSend);
      if (messageSend.substr(0, 1) === '/') {
        let privateUser = messageSend.substr(1, messageSend.search(' ') - 1);
        let privateMessage = messageSend.substr(messageSend.search(' ') + 1, 9999);
        const message = {message: privateMessage, receiver: privateUser};
        state.session.publish('chat/private', message);
        console.log('private message send', message);
      } else {
        const message = {message: messageSend, receiver: userName};
        state.session.publish('chat/global', message);
        console.log('public message send',state.session, message);
      }
      return {
        ...state,
        valueWrittenMessage: ''
      };
    case MESSAGE_WRITE:
      return {
        ...state,
        valueWrittenMessage: action.value
      };
    default:
      return state;
  }
};

export default chat;
