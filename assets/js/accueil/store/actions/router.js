export const DISPLAY_CHAT = 'actions/DISPLAY_CHAT';
export const DISPLAY_LIST = 'actions/DISPLAY_LIST';
export const WEBSOCKET_CONNECT = 'actions/WEBSOCKET_CONNECT';

export const displayChat = () => ({
  type: DISPLAY_CHAT
});

export const displayList = () => ({
  type: DISPLAY_LIST
});

export const webSocketConnect = () => ({
  type: WEBSOCKET_CONNECT
});
