import { LIST_RECEIVED, LIST_CONNECT } from '../actions/playerList';

const initialState = {
  list: {'name': 'Axel', 'route': 'axel/beau/gosse'},
  session: ''
};

const playerList = (state = initialState, action = {}) => {
  switch (action.type) {
    case LIST_RECEIVED:
      return {
        ...state,
        list: action.list
      };
    case LIST_CONNECT:
      let newSession = action.value;
      console.log('REDUCER LIST CONNECT', newSession);
      return {
        ...state,
        session: newSession
      };
    default:
      return state;
  }
};

export default playerList;
