import { DISPLAY_CHAT, DISPLAY_LIST, WEBSOCKET_CONNECT } from '../actions/router';

const initialState = {
  hide_chat: false,
  hide_list: true
};

const router = (state = initialState, action = {}) => {
  switch (action.type) {
    case WEBSOCKET_CONNECT:
      return {
        ...state
      };
    case DISPLAY_CHAT:
      return {
        ...state,
        hide_list: true,
        hide_chat: false
      };
    case DISPLAY_LIST:
      return {
        ...state,
        hide_list: false,
        hide_chat: true
      };
    default:
      return state;
  }
};

export default router;
