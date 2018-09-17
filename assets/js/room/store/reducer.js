import {CELL_CLIC, INITIAL_DISPLAY} from './actions';
import { S_IFBLK } from 'constants';

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
  authorizedCells: [],
  channel: ''
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INITIAL_DISPLAY:

      let webSocket;
      const channel = action.channel;
      console.log('connect to channel:', channel);
      webSocket = WS.connect('ws://127.0.0.1:8080'); //ws://127.0.0.1:8080

      webSocket.on('socket/connect', function(session) {
        console.log('connect to :' + channel);
        session.subscribe(channel, function(uri, newKeyementsConfirmation) {
          console.log('payload received:', newKeyementsConfirmation);
        });
      });

      return {
        ...state,
        channel: action.channel
      };

    case CELL_CLIC:

      const {item, row, column, color} = action;
      const numbRow = Number(row);
      const numbColumn = Number(column);
      let cell;
      (color != undefined) ? cell = {[`${row}/${column}`]: `${item}${color}`} : cell = {[`${row}/${column}`]: `${item}`};

      const clicN = Number(state.clickedCell.length) + 1;

      switch (clicN) {

        case 1: // premier clic
          if (item === 'E') { return state; } else { // annule tout effet d'un clic sur une cellule vide
            console.log('clic 1');
            // ---------------------------------Variable definition
            let newAuthorizedCells = [];
            let vector;
            let iterator;
            let until;

            switch (item) {
              case 'P': // ----------------PION -----------------
                console.log('Pion select');
                iterator = 1; // valeur d'iteration des cases
                (color === '1') ? vector = 1 : vector = (-1); // vecteur de direction selon noir ou blanc
                (row === '7' || row === '2') ? until = 3 : until = 2; // si le pion est sur sa ligne de dpéart ou pas
                while (state.board.find(cell => Object.keys(cell)[0] ===
                `${numbRow + Number(vector) * iterator}/${column}`)[`${numbRow + Number(vector) * iterator}/${column}`] === 'E' &
                 iterator < until) { // si case vide + iterator < until
                  newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] ===
                  `${numbRow + Number(vector) * iterator}/${column}`));
                  iterator = iterator + 1;
                };
                console.log('state.authorizedCells :', state.authorizedCells);
                break;
              case 'T': // ----------------TOUR -----------------
                console.log('Tour select');
                state.authorizedCells.length = 0;

                if ((numbRow + 1) < 9) { // down  4
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`)[`${(numbRow + iterator)}/${numbColumn}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`));
                    if ((numbRow + iterator) === 8) { break; } else { iterator = iterator + 1; }
                  }
                }
                if ((numbRow - 1) > 0) { // up
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`)[`${(numbRow - iterator)}/${numbColumn}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`));
                    if ((numbRow - iterator) === 1) { break; } else { iterator = iterator + 1; }
                  }
                }

                if ((numbColumn + 1) < 9) { // right
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`)[`${numbRow}/${(numbColumn + iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`));
                    if ((numbColumn + iterator) === 8) { break; } else { iterator = iterator + 1; }
                  }
                }
                if ((numbColumn - 1) > 0) { // left
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`)[`${numbRow}/${(numbColumn - iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`));
                    if ((numbColumn - iterator) === 1) { break; } else { iterator = iterator + 1; }
                  }
                }
                console.log('newAuthorizedCells :', newAuthorizedCells);
                break;
              case 'C': // ----------------CAVALIER -----------------
                console.log('Cavalier select');
                // Deplacements positifs
                iterator = 0;
                let existingCell = [];
                let northLeftnewKey = `${numbRow - 2}/${numbColumn - 1}`;
                let northRightnewKey = `${numbRow - 2}/${numbColumn + 1}`;
                let southLeftnewKey = `${numbRow + 2}/${numbColumn - 1}`;
                let southRightnewKey = `${numbRow + 2}/${numbColumn + 1}`;
                let eastUpnewKey = `${numbRow - 1}/${numbColumn + 2}`;
                let eastDownnewKey = `${numbRow + 1}/${numbColumn + 2}`;
                let westUpnewKey = `${numbRow - 1}/${numbColumn - 2}`;
                let westDownnewKey = `${numbRow + 1}/${numbColumn - 2}`;
                let allnewKey = [northLeftnewKey, northRightnewKey, southLeftnewKey, southRightnewKey, eastUpnewKey, eastDownnewKey, westUpnewKey, westDownnewKey];

                for (let index = 0; index < 8; index++) {
                  if (state.board.find(cell => Object.keys(cell)[0] ===
                    allnewKey[index]) !== undefined) {
                    existingCell.push(state.board.find(cell => Object.keys(cell)[0] ===
                    allnewKey[index]));
                  }
                }
                iterator = 0;
                while (iterator < existingCell.length) {
                  if (Object.values(existingCell[iterator])[0] === 'E') {
                    newAuthorizedCells.push(existingCell[iterator]);
                  }
                  iterator = iterator + 1;
                };
                console.log('newAuthorizedCells :', newAuthorizedCells);
                break;
              case 'F':
                console.log('Fou select');
                console.log('numbRow', numbRow)
                state.authorizedCells.length = 0;
                if (((numbRow + 1) < 9) & ((numbColumn + 1) < 9)) { // down-right
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`)[`${(numbRow + iterator)}/${(numbColumn + iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`));
                    if ((numbRow + iterator) === 8 || (numbColumn + iterator) === 8) { break; } else { iterator = iterator + 1; }
                  }
                }
                if (((numbRow - 1) > 0) & ((numbColumn + 1) < 9)) { // up-right
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`)[`${(numbRow - iterator)}/${(numbColumn + iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`));
                    if ((numbRow - iterator) === 1 || (numbColumn + iterator) === 8) { break; } else { iterator = iterator + 1; }
                  }
                }
                if (((numbRow + 1) < 9) & ((numbColumn - 1) > 0)) { // down-left
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`)[`${(numbRow + iterator)}/${(numbColumn - iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`));
                    if ((numbRow + iterator) === 8 || (numbColumn - iterator) === 1) { break; } else { iterator = iterator + 1; }
                  }
                }
                if (((numbRow - 1) > 0) & ((numbColumn - 1) > 0)) { // up-left
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`)[`${(numbRow - iterator)}/${(numbColumn - iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`));
                    if ((numbRow - iterator) === 1 || (numbColumn - iterator) === 1) { break; } else { iterator = iterator + 1; }
                  }
                }
                console.log('newAuthorizedCells :', newAuthorizedCells);
                break;
              case 'Q':
                console.log('Queen select');
                state.authorizedCells.length = 0;
                if ((numbRow + 1) < 9) { // down  4
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`)[`${(numbRow + iterator)}/${numbColumn}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`));
                    if ((numbRow + iterator) === 8) { break; } else { iterator = iterator + 1; }
                  }
                }
                if ((numbRow - 1) > 0) { // up
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`)[`${(numbRow - iterator)}/${numbColumn}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`));
                    if ((numbRow - iterator) === 1) { break; } else { iterator = iterator + 1; }
                  }
                }
                if ((numbColumn + 1) < 9) { // right
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`)[`${numbRow}/${(numbColumn + iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`));
                    if ((numbColumn + iterator) === 8) { break; } else { iterator = iterator + 1; }
                  }
                }
                if ((numbColumn - 1) > 0) { // left
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`)[`${numbRow}/${(numbColumn - iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`));
                    if ((numbColumn - iterator) === 1) { break; } else { iterator = iterator + 1; }
                  }
                }
                if (((numbRow + 1) < 9) & ((numbColumn + 1) < 9)) { // down-right
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`)[`${(numbRow + iterator)}/${(numbColumn + iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`));
                    if ((numbRow + iterator) === 8 || (numbColumn + iterator) === 8) { break; } else { iterator = iterator + 1; }
                  }
                }
                if (((numbRow - 1) > 0) & ((numbColumn + 1) < 9)) { // up-right
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`)[`${(numbRow - iterator)}/${(numbColumn + iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`));
                    if ((numbRow - iterator) === 1 || (numbColumn + iterator) === 8) { break; } else { iterator = iterator + 1; }
                  }
                }
                if (((numbRow + 1) < 9) & ((numbColumn - 1) > 0)) { // down-left
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`)[`${(numbRow + iterator)}/${(numbColumn - iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`));
                    if ((numbRow + iterator) === 8 || (numbColumn - iterator) === 1) { break; } else { iterator = iterator + 1; }
                  }
                }
                if (((numbRow - 1) > 0) & ((numbColumn - 1) > 0)) { // up-left
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`)[`${(numbRow - iterator)}/${(numbColumn - iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`));
                    if ((numbRow - iterator) === 1 || (numbColumn - iterator) === 1) { break; } else { iterator = iterator + 1; }
                  }
                }
                console.log('newAuthorizedCells :', newAuthorizedCells);
                break;
              case 'K':
                console.log('King select');
                state.authorizedCells.length = 0;
                if ((numbRow + 1) < 9) { // down  4
                  iterator = 1;
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`)[`${(numbRow + iterator)}/${numbColumn}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`));
                    
                  }
                }
                if ((numbRow - 1) > 0) { // up
                  iterator = 1;
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`)[`${(numbRow - iterator)}/${numbColumn}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`));
                    if ((numbRow - iterator) === 1) { break; } else { iterator = iterator + 1; }
                  }
                }
                if ((numbColumn + 1) < 9) { // right
                  iterator = 1;
                  if (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`)[`${numbRow}/${(numbColumn + iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`));

                  }
                }
                if ((numbColumn - 1) > 0) { // left
                  iterator = 1;
                  if (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`)[`${numbRow}/${(numbColumn - iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`));

                  }
                }
                if (((numbRow + 1) < 9) & ((numbColumn + 1) < 9)) { // down-right
                  iterator = 1;
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`)[`${(numbRow + iterator)}/${(numbColumn + iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`));

                  }
                }
                if (((numbRow - 1) > 0) & ((numbColumn + 1) < 9)) { // up-right
                  iterator = 1;
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`)[`${(numbRow - iterator)}/${(numbColumn + iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`));
  
                  }
                }
                if (((numbRow + 1) < 9) & ((numbColumn - 1) > 0)) { // down-left
                  iterator = 1;
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`)[`${(numbRow + iterator)}/${(numbColumn - iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`));
  
                  }
                }
                if (((numbRow - 1) > 0) & ((numbColumn - 1) > 0)) { // up-left
                  iterator = 1;
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`)[`${(numbRow - iterator)}/${(numbColumn - iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`));
 
                  }
                }
                console.log('newAuthorizedCells :', newAuthorizedCells);
                break;
              case 'E':
            }
            return {
              ...state,
              clickedCell: [cell],
              authorizedCells: newAuthorizedCells
            };
          }
        case 2: // deuxième clic
          console.log('clic 2');
          let newBoard = [...state.board];
          let newKeyements = [cell, state.clickedCell[0]];
          if (state.authorizedCells.find(cellOK => Object.keys(cell)[0] === Object.keys(cellOK)[0]) !== undefined) {
            const newItem = Object.values(state.clickedCell[0])[0];
            newBoard.find(cellToModify => Object.keys(cell)[0] === Object.keys(cellToModify)[0])[Object.keys(cell)[0]] = newItem;
            newBoard.find(cellToModify => Object.keys(state.clickedCell[0])[0] === Object.keys(cellToModify)[0])[Object.keys(state.clickedCell[0])[0]] = 'E';
          } else {
            console.log('case nok');
          }

          webSocket = WS.connect('ws://127.0.0.1:8080');
          webSocket.on('socket/connect', function(session) {
            session.publish(state.channel, newKeyements);
            console.log('newKeyements', [...newKeyements]);
          });
          return {
            ...state,
            clickedCell: [],
            board: newBoard
          };
      }
      break; // END CASE CELL CLIC

    default:
      return state;
  }
};

export default reducer;
