import {WEBSOCKET_CONNECT, CELL_CLIC, MESSAGE_RECEIVED, INITIAL_DISPLAY} from './actions';
import library from '../functions/utils';

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
  rockAllowed: false,
  gameOver: false,
  lastBoard: [],
  whitePlayer: '',
  blackPlayer: '',
  winner: '',
  loser: '',
  movementsList: [],
  allowedMoveList: [],
  allowedKillList: [],
  allowedMove: [],
  allowedKill: [],
  clickedCell: [],
  channel: '',
  canPlay: false,
  newPositions: [],
  webSocketSession: ''
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) { // DEBUT DU SWITCH REDUCER
    case WEBSOCKET_CONNECT:
      let rotateBoard = [...state.board];

      if (action.color == 1) { rotateBoard.reverse(); }
      console.log('------Initialisation------');
      console.log('Mycolor is :', action.color, action.channel);
      return {
        ...state,
        channel: action.channel,
        myColor: action.color,

        board: rotateBoard
      };
    case INITIAL_DISPLAY:
      let newWhitePlayer = action.channel.split('/')[2];
      let newBlackPlayer = action.channel.split('/')[3];
      return {
        ...state,
        blackPlayer: newBlackPlayer,
        whitePlayer: newWhitePlayer,
        webSocketSession: action.session
      };
    // -----------------------------------------------------------------------------------------
    // ------------------------------------I-N-I-T---D-I-S-P-L-A-Y------------------------------
    // -----------------------------------------------------------------------------------------
    case MESSAGE_RECEIVED:
      let newGameOver = false; // false par défaut , le passage au true déclenchera l'animation de game Over
      let newBoard = [...state.board]; // le nouveau board qui va être rendu par react
      let newLastBoard = [...state.lastBoard];// le board n-1 renvoyé par le serveur
      let couldPlay;
      let newMovementsList = [];

      // défini si le joueur peut ou non jouer selon la valeur de canplay envoyé à chaque tour par le serveur
      if (undefined !== action.serverMessage['canPlay']) {
        couldPlay = action.serverMessage['canPlay'];

        // si le message du serveur contient movement, c'est une validation de mouvement
        if (undefined !== action.serverMessage['movement']) {
          newBoard.find(cell => Object.keys(cell)[0] === Object.keys(action.serverMessage['movement']['newPositions'])[0])[`${Object.keys(action.serverMessage['movement']['newPositions'])[0]}`] = Object.values(action.serverMessage['movement']['newPositions'])[0];
          newBoard.find(cell => Object.keys(cell)[0] === Object.keys(action.serverMessage['movement']['newPositions'])[1])[`${Object.keys(action.serverMessage['movement']['newPositions'])[1]}`] = Object.values(action.serverMessage['movement']['newPositions'])[1];
        }
        return {
          ...state,
          canPlay: couldPlay,
          board: newBoard
        };
      }
      // si lastboard il y a alors on le convertie au format du board [{'row/column':'item/color'},{}]
      if (undefined !== action.serverMessage['lastBoard']) {
        newLastBoard = library.convertServerBoardToClientBoard(action.serverMessage['lastBoard']);
        if (!library.compareOldNewBoard(newLastBoard, newBoard, state.myColor)) {
          if (state.myColor == 1) { newBoard = newLastBoard.reverse(); } else { newBoard = newLastBoard; }
        }
        return {
          ...state,
          board: newBoard,
          lastBoard: newLastBoard
        };
      }
      // gameOVer si l'on reçoit un message du serveur avec endGame
      if (undefined !== action.serverMessage['endGame']) {
        newGameOver = true;
        console.log('Axel: The Game is now Over');
        return {
          ...state,
          gameOver: newGameOver
        };
      }

      // si le message contient error on va revenir au board précédent
      if (undefined !== action.serverMessage['error']) {
        switch (action.serverMessage['error']) {
          case 'Votre roi est en echec !!':
            if (state.myColor == 1) {
              state.lastBoard.reverse();
            }// selon la couleur on oublie pas de rebasculer le damier pour bien afficher la couleur
            newBoard = state.lastBoard;
            console.log('Merci de rejouer');
            couldPlay = true;
            return {
              ...state,
              board: newBoard,
              canPlay: couldPlay
            };
          case 'Ce n\'est pas votre tour.':
          
          case 'Adversaire non connecté !':
         
          case 'Cette piece n\'existe pas !':
         
          case 'Ce n\'est pas une de vos pieces!':
         
          case 'Ce mouvement est incorect !':
           
        }
      }
      if (undefined !== action.serverMessage['echec']) {
        switch (action.serverMessage['echec']) {
          case 'Vous avez mis le roi adverse en echec !':
            break;
          case 'votre roi est en echec !':
            break;
        }
      }

      if (undefined !== action.serverMessage['movementList']) {
        newMovementsList = library.convertMovementList(action.serverMessage['movementList'])
        return {
          ...state,
          movementsList: newMovementsList
        };
      }
      return {
        ...state
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
      if (clicCount === 1 || color == state.myColor) { // Debut du switch pour différencier clic 1 clic 2
        // premier clic
        // console.log('not over',item, row, column, color)
        let newMoveAllowed = [];
        let newKillAllowed = [];
        let newRockAllowed = false;
        if (item === 'E' || !state.canPlay || color != state.myColor) { return state; } else if (state.canPlay & (color == state.myColor)) { // annule tout effet d'un clic sur une cellule vide
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
              library.king(color, numbRow, numbColumn, state.board, newMoveAllowed, newKillAllowed, newRockAllowed);
              newRockAllowed = library.king(color, numbRow, numbColumn, state.board, newMoveAllowed, newKillAllowed, newRockAllowed)
              break;
          }

          let newAllowedMoveList = [];
          let newAllowedKillList = [];
          for (const key in newMoveAllowed) {
            if (newMoveAllowed.hasOwnProperty(key)) {
              newAllowedMoveList.push(Object.keys(newMoveAllowed[key])[0]);
            }
          }
          for (const key in newKillAllowed) {
            if (newKillAllowed.hasOwnProperty(key)) {
              newAllowedKillList.push(Object.keys(newKillAllowed[key])[0]);
            }
          }
          return { // on renvoie le state + la case sur laquelle on a clic pour pouvoir avoir le premier clic en mémoire pour le clic n°2 + le nouveau tableau des case autorisées
            ...state,
            rockAllowed: newRockAllowed,
            allowedKillList: newAllowedKillList,
            allowedMoveList: newAllowedMoveList,
            allowedMove: newMoveAllowed,
            allowedKill: newKillAllowed,
            clickedCell: [cell]
          };
        }; // fin du if (item === 'E') { return state; } else {
        break;

      } else if (clicCount === 2 || color != state.myColor) {// deuxième clic
        console.log(state);
        console.log('Clic N°2 done');
        let opponentColor;
        let kingPos;
        let vector;
        state.myColor === 0 ? vector = -1 : vector = 1; // pour gerer la direction des mouvements de pions adverses
        state.myColor === 1 ? opponentColor = '0' : opponentColor = '1'; // pour identifer les pièce opponents

        if (Object.values(state.clickedCell[0])[0] === `${'K'}${state.myColor}`) { // lors du click n°1 sur le roi il faut, lors du 2eme clic verifier qu'il n'y a pas echec par des pion
          // cas d'echec par les pions
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
          if (Object.values(state.clickedCell[0])[0] === `${'K'}${state.myColor}` & state.rockAllowed === true) {
            if ((numbRow === 1) || (numbRow === 8)) {
              if (numbColumn === 2) {
                newBoard.find(cellToModify => `${numbRow}/1` === Object.keys(cellToModify)[0])[`${numbRow}/1`] = 'E';
                newBoard.find(cellToModify => `${numbRow}/3` === Object.keys(cellToModify)[0])[`${numbRow}/3`] = 'T';
              } else if (numbColumn === 6) {
                newBoard.find(cellToModify => `${numbRow}/8` === Object.keys(cellToModify)[0])[`${numbRow}/8`] = 'E';
                newBoard.find(cellToModify => `${numbRow}/5` === Object.keys(cellToModify)[0])[`${numbRow}/5`] = 'T';
              }
            }
          }
          const newItem = Object.values(state.clickedCell[0])[0]; // on récupère la pièce qui était sur la case du premier clic
          newBoard.find(cellToModify => Object.keys(cell)[0] === Object.keys(cellToModify)[0])[Object.keys(cell)[0]] = newItem; // on modifie la valeur pour y mettre la nouvelle pièce
          newBoard.find(cellToModify => Object.keys(state.clickedCell[0])[0] === Object.keys(cellToModify)[0])[Object.keys(state.clickedCell[0])[0]] = 'E'; // on 'vide la case du premier clic'
          dataToSend['newPositions'][Object.keys(cell)[0]] = newItem;
          dataToSend['newPositions'][Object.keys(state.clickedCell[0])[0]] = 'E';

          state.webSocketSession.publish(state.channel, {...dataToSend});
          console.log('Message to server:', dataToSend);

          return {
            ...state,
            allowedKillList: [],
            allowedMoveList: [],
            clickedCell: [], // on réinitialise le tableau clicked cell pour pouvoir recevoir le prochain premier clic
            board: newBoard // on envoie le nouveau board modifié et le damier se mettra à jour
          };
        } else {
          console.log('Movement not allowed');
          return {
            ...state,
            couldPlay: true
          };
        }
      } // end of switch clicCount
      break; // END CASE CELL CLIC
    default:
      return state;
  }; // end of reducer switch
}; // end of const reducer

export default reducer;
