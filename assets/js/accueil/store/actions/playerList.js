export const LIST_RECEIVED = 'actions/LIST_RECEIVED';

export const receivedList = (list) => ({
  type: LIST_RECEIVED,
  list
});
export const LIST_CONNECT = 'actions/LIST_CONNECT';

export const listConnection = (session) => ({
  type: LIST_CONNECT,
  value: session
});