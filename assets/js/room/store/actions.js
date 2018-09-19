export const CELL_CLIC = 'actions/CELL_CLIC';

export const handleClickOnCell = (item, color, row, column) => ({
  type: CELL_CLIC,
  item,
  color,
  row,
  column
});

export const INITIAL_DISPLAY = 'actions/INITIAL_DISPLAY';

export const initialDisplay = (serverMessage, webSocket) => ({
  type: INITIAL_DISPLAY,
  serverMessage,
  webSocket
});

export const WEBSOCKET_CONNECT = 'actions/WEBSOCKET_CONNECT';

export const webSocketConnect = (channel) => ({
  type: WEBSOCKET_CONNECT,
  channel
});
