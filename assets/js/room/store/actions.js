export const CELL_CLIC = 'actions/CELL_CLIC';
export const MESSAGE_RECEIVED = 'actions/MESSAGE_RECEIVED';
export const INITIAL_DISPLAY = 'actions/INITIAL_DISPLAY';
export const WEBSOCKET_CONNECT = 'actions/WEBSOCKET_CONNECT';
export const GIVE_UP = 'actions/GIVE_UP';


export const handleClickOnCell = (item, color, row, column) => ({
  type: CELL_CLIC,
  item,
  color,
  row,
  column
});

export const messageReceived = (serverMessage, session) => ({
  type: MESSAGE_RECEIVED,
  serverMessage,
  session
});

export const initialDisplay = (session, channel) => ({
  type: INITIAL_DISPLAY,
  session,
  channel
});

export const webSocketConnect = (channel, color) => ({
  type: WEBSOCKET_CONNECT,
  channel,
  color
});

export const giveUp = () => ({
  type: GIVE_UP
});