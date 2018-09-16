import {CELL_CLIC, INITIAL_DISPLAY} from './actions';

const initialState = {
  board: [
    {'1/1': 'T1'}, {'1/2': 'C1'}, {'1/3': 'F1'}, {'1/4': 'Q1'}, {'1/5': 'K1'}, {'1/6': 'F1'}, {'1/7': 'C1'}, {'1/8': 'T1'},
    {'2/1': 'P1'}, {'2/2': 'P1'}, {'2/3': 'P1'}, {'2/4': 'P1'}, {'2/5': 'P1'}, {'2/6': 'P1'}, {'2/7': 'P1'}, {'2/8': 'P1'},
    {'3/1': 'E'}, {'3/2': 'E'}, {'3/3': 'E'}, {'3/4': 'E'}, {'3/5': 'E'}, {'3/6': 'E'}, {'3/7': 'E'}, {'3/8': 'E'},
    {'4/1': 'E'}, {'4/2': 'E'}, {'4/3': 'E'}, {'4/4': 'E'}, {'4/5': 'E'}, {'4/6': 'E'}, {'4/7': 'E'}, {'4/8': 'E'},
    {'5/1': 'E'}, {'5/2': 'E'}, {'5/3': 'E'}, {'5/4': 'E'}, {'5/5': 'E'}, {'5/6': 'E'}, {'5/7': 'E'}, {'5/8': 'E'},
    {'6/1': 'E'}, {'6/2': 'E'}, {'6/3': 'E'}, {'6/4': 'E'}, {'6/5': 'E'}, {'6/6': 'E'}, {'6/7': 'E'}, {'6/8': 'E'},
    {'7/1': 'P0'}, {'7/2': 'P0'}, {'7/3': 'P0'}, {'7/4': 'P0'}, {'7/5': 'P0'}, {'7/6': 'P0'}, {'7/7': 'P0'}, {'7/8': 'P0'},
    {'8/1': 'T0'}, {'8/2': 'C0'}, {'8/3': 'F0'}, {'8/4': 'K0'}, {'8/5': 'Q0'}, {'8/6': 'F0'}, {'8/7': 'C0'}, {'8/8': 'T0'}
  ],
  clickedCell: [],
  authorizedCells: []
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INITIAL_DISPLAY:
      return {
        ...state
      };
    case CELL_CLIC:
      const {item, row, column, color} = action;
      const cell = {[`${row}/${column}`]: `${item}${color}`};
      const clicN = Number(state.clickedCell.length) + 1;
      switch (clicN) {
        case 1: // premier clic
          console.log('clic 1');
          switch (item) {
            case 'P': // ----------------PION -----------------
              console.log('Pion select');
              let vector;
              let iterator = 1; // valeur d'iteration des cases
              let until;
              (color === '1') ? vector = 1 : vector = (-1); // vecteur de direction selon noir ou blanc
              (row === '7' || row === '2') ? until = 3 : until = 2; // si le pion est sur sa ligne de dpéart ou pas

              while (state.board.find(cell => Object.keys(cell)[0] ===
              `${Number(row) + Number(vector) * Number(iterator)}/${column}`)[`${Number(row) + Number(vector) * Number(iterator)}/${column}`] === 'E' & iterator < until) { // si case vide + iterator < until
                state.authorizedCells.push(state.board.find(cell => Object.keys(cell)[0] ===
                `${Number(row) + Number(vector) * Number(iterator)}/${column}`));
                iterator = iterator + 1;
              };
              console.log('state.authorizedCells :', state.authorizedCells);
              break;
            case 'T':
            case 'C':
            case 'F':
            case 'Q':
            case 'K':
            case 'E':
          }
          return {
            ...state,
            clickedCell: [cell]
          };
        case 2: // deuxième clic
          console.log('clic 2');
          let newBoard = [...state.board];
          if (state.authorizedCells.find(cellOK => Object.keys(cell)[0] === Object.keys(cellOK)[0]) !== undefined) {
            const newItem = Object.values(state.clickedCell[0])[0];
            newBoard.find(cellToModify => Object.keys(cell)[0] === Object.keys(cellToModify)[0])[Object.keys(cell)[0]] = newItem;
            newBoard.find(cellToModify => Object.keys(state.clickedCell[0])[0] === Object.keys(cellToModify)[0])[Object.keys(state.clickedCell[0])[0]] = 'E';
          } else {
            console.log('case nok');
          }
          return {
            ...state,
            clickedCell: [],
            board: newBoard
          };
        default:
      }
    default:
      return state;
  }
};

export default reducer;
