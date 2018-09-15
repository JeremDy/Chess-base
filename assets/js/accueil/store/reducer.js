import { TOGGLE_FORM, USERNAME_SUBMIT, USERNAME_WRITE, MESSAGE_SUBMIT, MESSAGE_WRITE, WEBSOCKET_CONNECT, MESSAGE_RECEIVED } from './actions';

const initialState = {
  hideForm: true,
  valueWrittenUserName: 'public',
  valueWrittenMessage: '',
  messageReceived: []
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case WEBSOCKET_CONNECT:
      return {
        ...state
      };
    case MESSAGE_RECEIVED:
      return {
        ...state,
        messageReceived: state.messageReceived.concat([action.value])
        //const tasks = [...this.state.tasks, newTask];
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

export default reducer;
