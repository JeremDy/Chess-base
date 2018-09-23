import {WEBSOCKET_CONNECT, CELL_CLIC, INITIAL_DISPLAY} from './actions';
import library from '../functions/utils.js';

const initialState = {
  board: [
    {'1/1': 'T1'}, {'1/2': 'C1'}, {'1/3': 'F1'}, {'1/4': 'K1'}, {'1/5': 'Q1'}, {'1/6': 'F1'}, {'1/7': 'C1'}, {'1/8': 'T1'},
    {'2/1': 'P1'}, {'2/2': 'P1'}, {'2/3': 'P1'}, {'2/4': 'P1'}, {'2/5': 'P1'}, {'2/6': 'P1'}, {'2/7': 'P1'}, {'2/8': 'P1'},
    {'3/1': 'E'}, {'3/2': 'E'}, {'3/3': 'E'}, {'3/4': 'E'}, {'3/5': 'E'}, {'3/6': 'E'}, {'3/7': 'E'}, {'3/8': 'E'},
    {'4/1': 'E'}, {'4/2': 'E'}, {'4/3': 'E'}, {'4/4': 'E'}, {'4/5': 'E'}, {'4/6': 'E'}, {'4/7': 'E'}, {'4/8': 'E'},
    {'5/1': 'E'}, {'5/2': 'E'}, {'5/3': 'E'}, {'5/4': 'E'}, {'5/5': 'E'}, {'5/6': 'E'}, {'5/7': 'E'}, {'5/8': 'E'},
    {'6/1': 'E'}, {'6/2': 'E'}, {'6/3': 'E'}, {'6/4': 'E'}, {'6/5': 'E'}, {'6/6': 'E'}, {'6/7': 'E'}, {'6/8': 'E'},
    {'7/1': 'P0'}, {'7/2': 'P0'}, {'7/3': 'P0'}, {'7/4': 'P0'}, {'7/5': 'P0'}, {'7/6': 'P0'}, {'7/7': 'P0'}, {'7/8': 'P0'},
    {'8/1': 'T0'}, {'8/2': 'C0'}, {'8/3': 'F0'}, {'8/4': 'K0'}, {'8/5': 'Q0'}, {'8/6': 'F0'}, {'8/7': 'C0'}, {'8/8': 'T0'}
  ],
  allKillOpponent: [],
  allMoveOpponent: [],
  opponentAction: {},
  myAction: {},
  allowedMove: [],
  allowedKill: [],
  clickedCell: [],
  cellsBeforeKing: [],
  myColor: '',
  channel: '',
  canPlay: false,
  newPositions: [],
  webSocket: ''
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) { // DEBUT DU SWITCH REDUCER
    case WEBSOCKET_CONNECT:

      let rotateBoard = [...state.board];
      if (action.color == 1) { rotateBoard.reverse(); }
      console.log('------Initialisation------');
      console.log('Mycolor is :', action.color);

      return {
        ...state,
        channel: action.channel,
        myColor: action.color,
        board: rotateBoard
      };
    // -----------------------------------------------------------------------------------------
    // ------------------------------------I-N-I-T---D-I-S-P-L-A-Y------------------------------
    // -----------------------------------------------------------------------------------------
    case INITIAL_DISPLAY:
      let newBoard = [...state.board];
    //   let newOpponentAction = {...state.opponentAction};
    //   let colorOp;
    //   let rowOp;
    //   let columnOp;
    //   let itemOp;
    //   let newMoveAllowed = [];
    //   let newKillAllowed = [];
    let allKill = [];
    let allMove = [];
    let newMyAction = library.getAllMyMov(action.color, state.board);
    let newOpponentAction = library.getAllOpponentMov(action.color, state.board);
      if (action.serverMessage['movement'] !== undefined) {
        newBoard.find(cell => Object.keys(cell)[0] === Object.keys(action.serverMessage['movement']['newPositions'])[0])[`${Object.keys(action.serverMessage['movement']['newPositions'])[0]}`] = Object.values(action.serverMessage['movement']['newPositions'])[0];
        newBoard.find(cell => Object.keys(cell)[0] === Object.keys(action.serverMessage['movement']['newPositions'])[1])[`${Object.keys(action.serverMessage['movement']['newPositions'])[1]}`] = Object.values(action.serverMessage['movement']['newPositions'])[1];

        // rowOp = Number(Object.keys(action.serverMessage['movement']['newPositions'])[0].slice(0, 1));
        // columnOp = Number(Object.keys(action.serverMessage['movement']['newPositions'])[0].slice(2, 3));
        // itemOp = Object.values(action.serverMessage['movement']['newPositions'])[0].slice(0, 1);
        // colorOp = Object.values(action.serverMessage['movement']['newPositions'])[0].slice(1, 2);

        // switch (itemOp) { // Selon la pièce sur laquelle on a clic, on va créer un tableau de cases autorisées
        //   case 'P':
        //     library.pion(colorOp, rowOp, columnOp, state.board, newMoveAllowed, newKillAllowed);
        //     break;
        //   case 'T':
        //     library.tour(colorOp, rowOp, columnOp, state.board, newMoveAllowed, newKillAllowed);
        //     break;
        //   case 'C':
        //     library.cavalier(colorOp, rowOp, columnOp, state.board, newMoveAllowed, newKillAllowed);
        //     break;
        //   case 'F':
        //     library.fou(colorOp, rowOp, columnOp, state.board, newMoveAllowed, newKillAllowed);
        //     break;
        //   case 'Q':
        //     library.queen(colorOp, rowOp, columnOp, state.board, newMoveAllowed, newKillAllowed);
        //     break;
        //   case 'K':
        //     library.king(colorOp, rowOp, columnOp, state.board, newMoveAllowed, newKillAllowed);
        //     break;
        // }
        // newOpponentAction[`${itemOp}${colorOp}`]['newAllowedMove'] = {...newOpponentAction[`${itemOp}${colorOp}`]['newAllowedMove'], ...newMoveAllowed};
        // newOpponentAction[`${itemOp}${colorOp}`]['newAllowedKill'] = {...newOpponentAction[`${itemOp}${colorOp}`]['newAllowedKill'], ...newKillAllowed};
       
        allKill = library.getAllKillOpponent(newMyAction, state.myColor);
        allMove = library.getAllMoveOpponent(newOpponentAction, state.myColor);
        console.log('allKill',allKill, 'allMove', allMove);
      }
      return {
        ...state,
        allKillOpponent: allKill,
        allMoveOpponent: allMove,
        canPlay: action.serverMessage['canPlay'],
        board: newBoard,
        opponentAction: newOpponentAction,
        myAction: newMyAction,
        // opponentAction: newOpponentAction,
        webSocket: action.webSocket
      };

    // -----------------------------------------------------------------------------------------
    // ------------------------------------C-E-L-L- -C-L-I-C------------------------------------
    // -----------------------------------------------------------------------------------------
    case CELL_CLIC:

    

      const {item, row, column, color} = action;
      const numbRow = Number(row);// conversion en valeur numérique pour les opérations
      const numbColumn = Number(column);// conversion en valeur numérique pour les opérations
      let cell;// objet contenant les dataToSend de la cellule sur laquelle on vient de cliquer
      // Pour eviter les erreurs si l'on clique sur une case vide, on enleve la color ( une case vide n'a pas de couleur)
      (color !== undefined) ? cell = {[`${row}/${column}`]: `${item}${color}`} : cell = {[`${row}/${column}`]: `${item}`};
      const clicCount = Number(state.clickedCell.length) + 1; // au début le tableau est vide donc vide + 1 = 1 = premier clic
      switch (clicCount) { // Debut du switch pour différencier clic 1 clic 2
        case 1: // premier clic
          let newMoveAllowed = [];
          let newKillAllowed = [];
          if (item === 'E' || !state.canPlay || color != state.myColor) { return state; } else if (state.canPlay & color == state.myColor) { // annule tout effet d'un clic sur une cellule vide
            console.log('Clic N°1 done');
            switch (item) { // Selon la pièce sur laquelle on a clic, on va créer un tableau de cases autorisées
              case 'P':
                library.pion(color, numbRow, numbColumn, state.board, newMoveAllowed, newKillAllowed);
                break;
              case 'T':
                library.tour(color, numbRow, numbColumn, state.board, newMoveAllowed, newKillAllowed);
                break;
              case 'C':
                library.cavalier(color, numbRow, numbColumn, state.board, newMoveAllowed, newKillAllowed);
                break;
              case 'F':
                library.fou(color, numbRow, numbColumn, state.board, newMoveAllowed, newKillAllowed);
                break;
              case 'Q':
                library.queen(color, numbRow, numbColumn, state.board, newMoveAllowed, newKillAllowed);
                break;
              case 'K':
                library.king(color, numbRow, numbColumn, state.board, newMoveAllowed, newKillAllowed)
                break;
            }
            return { // on renvoie le state + la case sur laquelle on a clic pour pouvoir avoir le premier clic en mémoire pour le clic n°2 + le nouveau tableau des case autorisées
              ...state,
              allowedMove: newMoveAllowed,
              allowedKill: newKillAllowed,
              clickedCell: [cell]
            
            };
          }; // fin du if (item === 'E') { return state; } else {
          break;

        case 2: // deuxième clic
          console.log('Clic N°2 done');
       
          let opponentColor;
          let kingPos;
          let vector;
          state.myColor === 0 ? vector = -1 : vector = 1; // pour gerer la direction des mouvements de pions adverses
          state.myColor === 1 ? opponentColor = '0' : opponentColor = '1'; // pour identifer les pièce opponents

          if (Object.values(state.clickedCell[0])[0] === `${'K'}${state.myColor}`) { // lors du click n°1 sur le roi il faut, lors du 2eme clic verifier qu'il n'y a pas echec par des pion
            // cas d'echec par les pions
            console.log('rois', state.allMoveOpponent, state.allMoveOpponent.find(cell => Object.keys(cell)[0] === `${numbRow}/${numbColumn}`) !== undefined);
            if ((numbRow - 1 > 0) & (numbRow + 1 < 9) & (numbColumn + 1 < 9) & (numbColumn - 1 > 0)) {
              if ((state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + 1 * vector)}/${(numbColumn + 1)}`)[`${(numbRow + 1 * vector)}/${(numbColumn + 1)}`] === `${'P'}${opponentColor}`) ||
              (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + 1 * vector)}/${(numbColumn - 1)}`)[`${(numbRow + 1 * vector)}/${(numbColumn - 1)}`] === `${'P'}${opponentColor}`)) {
                console.log('Echec: Move not allowed');
                return {
                  ...state,
                  clickedCell: [],
                  allowedMove: [],
                  allowedKill: []
                };
              };
            } else if ((numbColumn + 1 === 9)) { // cas où l'on est à la limite droite du damier
              if ((state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + 1 * vector)}/${(numbColumn - 1)}`)[`${(numbRow + 1 * vector)}/${(numbColumn - 1)}`] === `${'P'}${opponentColor}`)) {
                console.log('Echec: Move not allowed');
                return {
                  ...state,
                  clickedCell: [],
                  allowedMove: [],
                  allowedKill: []
                };
              }
            } else if ((numbColumn - 1 === 0)) { // cas où l'on est à la limite gauche du damier
              if ((state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + 1 * vector)}/${(numbColumn + 1)}`)[`${(numbRow + 1 * vector)}/${(numbColumn + 1)}`] === `${'P'}${opponentColor}`)) {
                console.log('Echec: Move not allowed');
                return {
                  ...state,
                  clickedCell: [],
                  allowedMove: [],
                  allowedKill: []
                };
              }
            } else if (state.allMoveOpponent.find(cell => Object.keys(cell)[0] === `${numbRow}/${numbColumn}`) !== undefined) {
              console.log('Echec: Move not allowed yepa');
              return {
                ...state,
                clickedCell: [],
                allowedMove: [],
                allowedKill: []
              };
            }
            // empeche le roi d'être à moins d'une case d'un autre rois
            kingPos = Object.keys(state.board.find(cell => Object.values(cell)[0] === `${'K'}${opponentColor}`)); // kingPos ["8/4"]
            if (Math.sqrt(Math.pow((numbRow - Number(kingPos[0].substring(0,1))),2) + Math.pow((numbColumn - Number(kingPos[0].substring(2,3))),2)) <= Math.sqrt(2) ) {
              console.log('roi trop pret');
              return {
                ...state,
                clickedCell: [],
                allowedMove: [],
                allowedKill: []
              };
            }
            


          }

          let newBoard = [...state.board]; // on prepare le board que l'on aura modifier pour le renvoyer /!\ a ne pas faire de passage par référence
          let dataToSend = [];
          let mov = [];
          dataToSend['newPositions'] = {...cell, ...state.clickedCell[0]};
          mov['new'] = Object.keys(cell)[0];
          mov['old'] = Object.keys(state.clickedCell[0])[0];
          dataToSend['movement'] = {...mov};

          if ((((state.allowedMove.find(cellOK => Object.keys(cell)[0] === Object.keys(cellOK)[0]) !== undefined) || // est ce que la case sur laquelle on clic fait partie des cases autorisées
          ((state.allowedKill.find(cellOK => Object.keys(cell)[0] === Object.keys(cellOK)[0]) !== undefined))) & (state.myColor != color)) & (item != 'K')) { // est ce que la case sur laquelle on clic fait partie des cases killAble
// TODO: rajouter une condtion & si couleur de la pièce que je cible différente de ma couleur

            const newItem = Object.values(state.clickedCell[0])[0]; // on récupère la pièce qui était sur la case du premier clic
            newBoard.find(cellToModify => Object.keys(cell)[0] === Object.keys(cellToModify)[0])[Object.keys(cell)[0]] = newItem; // on modifie la valeur pour y mettre la nouvelle pièce
            newBoard.find(cellToModify => Object.keys(state.clickedCell[0])[0] === Object.keys(cellToModify)[0])[Object.keys(state.clickedCell[0])[0]] = 'E'; // on 'vide la case du premier clic'
            dataToSend['newPositions'][Object.keys(cell)[0]] = newItem;
            dataToSend['newPositions'][Object.keys(state.clickedCell[0])[0]] = 'E';

            state.webSocket = WS.connect('ws://127.0.0.1:8080');
            state.webSocket.on('socket/connect', function(session) {
              session.publish(state.channel, {...dataToSend});
              console.log('Message to server:', dataToSend);
            });
            return {
              ...state,
              clickedCell: [], // on réinitialise le tableau clicked cell pour pouvoir recevoir le prochain premier clic
              board: newBoard // on envoie le nouveau board modifié et le damier se mettra à jour

            };
          } else {
            console.log('Movement not allowed');
            return {
              ...state,
              clickedCell: [],
              allowedMove: [],
              allowedKill: [],
            };

          };
      } // end of switch clicCount
      break; // END CASE CELL CLIC

    default:
      return state;

  }; // end of reducer switch
}; // end of const reducer

export default reducer;
