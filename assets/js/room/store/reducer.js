import {WEBSOCKET_CONNECT, CELL_CLIC, INITIAL_DISPLAY} from './actions';

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
  itemKillAble: [],
  clickedCell: [],
  authorizedCells: [],
  channel: '',
  canPlay: false,
  webSocket: ''
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) { // DEBUT DU SWITCH REDUCER
    case WEBSOCKET_CONNECT:
      return {
        ...state,
        channel: action.channel
      };
    // -----------------------------------------------------------------------------------------
    // ------------------------------------I-N-I-T---D-I-S-P-L-A-Y------------------------------
    // -----------------------------------------------------------------------------------------
    case INITIAL_DISPLAY:
    
      return {
        ...state,
        canPlay: action.serverMessage['canPlay'],
        webSocket: action.webSocket
      };

    // -----------------------------------------------------------------------------------------
    // ------------------------------------C-E-L-L- -C-L-I-C------------------------------------
    // -----------------------------------------------------------------------------------------
    case CELL_CLIC:

      const {item, row, column, color} = action;
      const numbRow = Number(row);// conversion en valeur numérique pour les opérations
      const numbColumn = Number(column);// conversion en valeur numérique pour les opérations
      let cell;// objet contenant les data de la cellule sur laquelle on vient de cliquer
      // Pour eviter les erreurs si l'on clique sur une case vide, on enleve la color ( une case vide n'a pas de couleur)
      (color != undefined) ? cell = {[`${row}/${column}`]: `${item}${color}`} : cell = {[`${row}/${column}`]: `${item}`};
      const clicCount = Number(state.clickedCell.length) + 1; // au début le tableau est vide donc vide + 1 = 1 = premier clic

      switch (clicCount) { // Debut du switch pour différencier clic 1 clic 2

        case 1: // premier clic
          if (item === 'E' || !state.canPlay) { return state; } else if (state.canPlay) { // annule tout effet d'un clic sur une cellule vide
            console.log('clic 1');

            let newAuthorizedCells = [];
            let newItemKillAble = [];
            let vector; // spécifique au pion pour déterminer la direction selon la couleur  L69
            let iterator; // commun à toutes les pièces
            let until; // spécifique au pion pour permettre la variation sur la ligne de départ

            switch (item) { // Selon la pièce sur laquelle on a clic, on va créer un tableau de cases autorisées
              // -----------------------------------------------------------------------------------------
              // ------------------------------------------PION-------------------------------------------
              // -----------------------------------------------------------------------------------------
              case 'P':

                console.log('Pion select');
                iterator = 1; // valeur d'iteration des cases
                (color === '1') ? vector = 1 : vector = (-1); // vecteur de direction selon noir ou blanc
                (row === '7' || row === '2') ? until = 3 : until = 2; // si le pion est sur sa ligne de dpéart ou pas

                if ((numbRow + vector < 9) & (numbRow + vector > 0)) {
                  while (state.board.find(cell => Object.keys(cell)[0] === `${numbRow + Number(vector) * iterator}/${numbColumn}`)[`${numbRow + Number(vector) * iterator}/${numbColumn}`] === 'E' & iterator < until) {
  
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow + Number(vector) * iterator}/${numbColumn}`)); // pousse les cases autorisées dans le tableau
                    if (((color === '0') & ((numbRow + iterator) === 1)) || ((color === '1') & ((numbRow + iterator) === 8)))  { break; } else { iterator = iterator + 1;} // permet d'éviter les erreur quand on arrive en bout de damier
  
                  };

                  if ((numbColumn + 1) < 9) {
                    if (state.board.find(cell => Object.keys(cell)[0] === `${numbRow + Number(vector)}/${numbColumn + 1}`)[`${numbRow + Number(vector)}/${numbColumn + 1}`] !== 'E') {
                      newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow + Number(vector)}/${numbColumn + 1}`));
                    }
                  }
                  if ((numbColumn - 1) > 0) {
                    if (state.board.find(cell => Object.keys(cell)[0] === `${numbRow + Number(vector)}/${numbColumn - 1}`)[`${numbRow + Number(vector)}/${numbColumn - 1}`] !== 'E') {
                      newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow + Number(vector)}/${numbColumn - 1}`));
                    }
                  }
                };

                console.log('newAuthorizedCells :', newAuthorizedCells);
                console.log('newItemKillAble :', newItemKillAble);
                break;

                // -----------------------------------------------------------------------------------------
                // ------------------------------------------TOUR-------------------------------------------
                // -----------------------------------------------------------------------------------------
              case 'T':
                console.log('Tour select');
                state.authorizedCells.length = 0; // Remise à 0 du tableau des cases autorisées

                if ((numbRow + 1) < 9) { // down /!\ le sens visuel et le sens de generation n'est pas le meme ( en haut à gauche : case 1/1 en bas à droite case 8/8)
                  iterator = 1;

                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`)[`${(numbRow + iterator)}/${numbColumn}`] === 'E') {

                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`));

                    if ((numbRow + iterator) === 8) { break; } else { iterator = iterator + 1; }

                  }
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`)[`${(numbRow + iterator)}/${numbColumn}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`));
                  }

                }

                if ((numbRow - 1) > 0) { // up
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`)[`${(numbRow - iterator)}/${numbColumn}`] === 'E') {

                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`));

                    if ((numbRow - iterator) === 1) { break; } else { iterator = iterator + 1; }

                  }
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`)[`${(numbRow - iterator)}/${numbColumn}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`));
                  }
                }

                if ((numbColumn + 1) < 9) { // right
                  iterator = 1;

                  while (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`)[`${numbRow}/${(numbColumn + iterator)}`] === 'E') {

                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`));

                    if ((numbColumn + iterator) === 8) { break; } else { iterator = iterator + 1; }

                  }
                  if (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`)[`${numbRow}/${(numbColumn + iterator)}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`));
                  }
                }

                if ((numbColumn - 1) > 0) { // left
                  iterator = 1;

                  while (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`)[`${numbRow}/${(numbColumn - iterator)}`] === 'E') {

                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`));

                    if ((numbColumn - iterator) === 1) { break; } else { iterator = iterator + 1; }

                  }
                  if (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`)[`${numbRow}/${(numbColumn - iterator)}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`));
                  }
                }
                console.log('newAuthorizedCells :', newAuthorizedCells);
                console.log('newItemKillAble :', newItemKillAble);
                break;

                // -----------------------------------------------------------------------------------------
                // ------------------------------------------CAVALIER---------------------------------------
                // -----------------------------------------------------------------------------------------
              case 'C':
                console.log('Cavalier select');
                // Deplacements positifs
                iterator = 0;
                let existingCell = []; // dans un premier temps : remplissage d'un tableau par les cellules qui existe et qui seraient autorisées
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
                  if (state.board.find(cell => Object.keys(cell)[0] === allnewKey[index]) !== undefined) {

                    existingCell.push(state.board.find(cell => Object.keys(cell)[0] === allnewKey[index]));

                  };
                };

                for (let index = 0; index < existingCell.length; index++) { // une fois le tableau créer on regarde parmis les cases existante et accessible lesquelles sont vides
                  if (Object.values(existingCell[index])[0] === 'E') {
                    newAuthorizedCells.push(existingCell[index]);// Et on les push dans le tableau des cases autorisées

                  } else if (Object.values(existingCell[index])[0] !== 'E') {
                    newItemKillAble.push(existingCell[index]);

                  };
                };

                console.log('newAuthorizedCells :', newAuthorizedCells);
                console.log('newItemKillAble :', newItemKillAble);
                break;

                // -----------------------------------------------------------------------------------------
                // ------------------------------------------FOU--------------------------------------------
                // -----------------------------------------------------------------------------------------
              case 'F':
                console.log('Fou select');
                state.authorizedCells.length = 0; // Remise à 0 du tableau des cases autorisées

                if (((numbRow + 1) < 9) & ((numbColumn + 1) < 9)) { // down-right
                  iterator = 1;

                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`)[`${(numbRow + iterator)}/${(numbColumn + iterator)}`] === 'E') {

                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`));// on push les cases dans le tab cases autorisées

                    if ((numbRow + iterator) === 8 || (numbColumn + iterator) === 8) { break; } else { iterator = iterator + 1; } // check si on est au bout du damier ou pas

                  }
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`)[`${(numbRow + iterator)}/${(numbColumn + iterator)}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`));
                  }
                }

                if (((numbRow - 1) > 0) & ((numbColumn + 1) < 9)) { // up-right
                  iterator = 1;

                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`)[`${(numbRow - iterator)}/${(numbColumn + iterator)}`] === 'E') {

                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`));

                    if ((numbRow - iterator) === 1 || (numbColumn + iterator) === 8) { break; } else { iterator = iterator + 1; }

                  }
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`)[`${(numbRow - iterator)}/${(numbColumn + iterator)}`]  !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`));
                  }
                }

                if (((numbRow + 1) < 9) & ((numbColumn - 1) > 0)) { // down-left
                  iterator = 1;

                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`)[`${(numbRow + iterator)}/${(numbColumn - iterator)}`] === 'E') {

                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`));

                    if ((numbRow + iterator) === 8 || (numbColumn - iterator) === 1) { break; } else { iterator = iterator + 1; }
                  }
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`)[`${(numbRow + iterator)}/${(numbColumn - iterator)}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`));
                  }
                }

                if (((numbRow - 1) > 0) & ((numbColumn - 1) > 0)) { // up-left
                  iterator = 1;

                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`)[`${(numbRow - iterator)}/${(numbColumn - iterator)}`] === 'E') {

                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`));

                    if ((numbRow - iterator) === 1 || (numbColumn - iterator) === 1) { break; } else { iterator = iterator + 1; }

                  }
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`)[`${(numbRow - iterator)}/${(numbColumn - iterator)}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`));
                  }
                }
                console.log('newAuthorizedCells :', newAuthorizedCells);
                console.log('newItemKillAble :', newItemKillAble);
                break;

                // -----------------------------------------------------------------------------------------
                // ------------------------------------------QUEEN------------------------------------------
                // -----------------------------------------------------------------------------------------
              case 'Q':
                console.log('Queen select');
                state.authorizedCells.length = 0; // Remise à 0 du tableau des cases autorisées
                
                if ((numbRow + 1) < 9) { // down /!\ le sens visuel et le sens de generation n'est pas le meme ( en haut à gauche : case 1/1 en bas à droite case 8/8)
                  iterator = 1;

                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`)[`${(numbRow + iterator)}/${numbColumn}`] === 'E') {

                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`));

                    if ((numbRow + iterator) === 8) { break; } else { iterator = iterator + 1; }

                  }
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`)[`${(numbRow + iterator)}/${numbColumn}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`));
                  }

                }

                if ((numbRow - 1) > 0) { // up
                  iterator = 1;
                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`)[`${(numbRow - iterator)}/${numbColumn}`] === 'E') {

                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`));

                    if ((numbRow - iterator) === 1) { break; } else { iterator = iterator + 1; }

                  }
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`)[`${(numbRow - iterator)}/${numbColumn}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`));
                  }
                }

                if ((numbColumn + 1) < 9) { // right
                  iterator = 1;

                  while (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`)[`${numbRow}/${(numbColumn + iterator)}`] === 'E') {

                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`));

                    if ((numbColumn + iterator) === 8) { break; } else { iterator = iterator + 1; }

                  }
                  if (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`)[`${numbRow}/${(numbColumn + iterator)}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`));
                  }
                }

                if ((numbColumn - 1) > 0) { // left
                  iterator = 1;

                  while (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`)[`${numbRow}/${(numbColumn - iterator)}`] === 'E') {

                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`));

                    if ((numbColumn - iterator) === 1) { break; } else { iterator = iterator + 1; }

                  }
                  if (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`)[`${numbRow}/${(numbColumn - iterator)}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`));
                  }
                }
                
                if (((numbRow + 1) < 9) & ((numbColumn + 1) < 9)) { // down-right
                  iterator = 1;

                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`)[`${(numbRow + iterator)}/${(numbColumn + iterator)}`] === 'E') {

                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`));// on push les cases dans le tab cases autorisées

                    if ((numbRow + iterator) === 8 || (numbColumn + iterator) === 8) { break; } else { iterator = iterator + 1; } // check si on est au bout du damier ou pas

                  }
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`)[`${(numbRow + iterator)}/${(numbColumn + iterator)}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`));
                  }
                }

                if (((numbRow - 1) > 0) & ((numbColumn + 1) < 9)) { // up-right
                  iterator = 1;

                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`)[`${(numbRow - iterator)}/${(numbColumn + iterator)}`] === 'E') {

                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`));

                    if ((numbRow - iterator) === 1 || (numbColumn + iterator) === 8) { break; } else { iterator = iterator + 1; }

                  }
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`)[`${(numbRow - iterator)}/${(numbColumn + iterator)}`]  !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`));
                  }
                }

                if (((numbRow + 1) < 9) & ((numbColumn - 1) > 0)) { // down-left
                  iterator = 1;

                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`)[`${(numbRow + iterator)}/${(numbColumn - iterator)}`] === 'E') {

                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`));

                    if ((numbRow + iterator) === 8 || (numbColumn - iterator) === 1) { break; } else { iterator = iterator + 1; }
                  }
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`)[`${(numbRow + iterator)}/${(numbColumn - iterator)}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`));
                  }
                }

                if (((numbRow - 1) > 0) & ((numbColumn - 1) > 0)) { // up-left
                  iterator = 1;

                  while (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`)[`${(numbRow - iterator)}/${(numbColumn - iterator)}`] === 'E') {

                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`));

                    if ((numbRow - iterator) === 1 || (numbColumn - iterator) === 1) { break; } else { iterator = iterator + 1; }

                  }
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`)[`${(numbRow - iterator)}/${(numbColumn - iterator)}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`));
                  }
                }
                console.log('newAuthorizedCells :', newAuthorizedCells);
                console.log('newItemKillAble :', newItemKillAble);
                break;
                // -----------------------------------------------------------------------------------------
                // ------------------------------------------KING-------------------------------------------
                // -----------------------------------------------------------------------------------------
              case 'K':
                console.log('King select');
                state.authorizedCells.length = 0; // Remise à 0 du tableau des cases autorisées
                if ((numbRow + 1) < 9) { // down  4
                  iterator = 1;
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`)[`${(numbRow + iterator)}/${numbColumn}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`));
                  } else if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`)[`${(numbRow + iterator)}/${numbColumn}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${numbColumn}`));
                  }
                }
                if ((numbRow - 1) > 0) { // up
                  iterator = 1;
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`)[`${(numbRow - iterator)}/${numbColumn}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`));
                    if ((numbRow - iterator) === 1) { break; } else { iterator = iterator + 1; }
                  } else if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`)[`${(numbRow - iterator)}/${numbColumn}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${numbColumn}`));
                  }
                }
                if ((numbColumn + 1) < 9) { // right
                  iterator = 1;
                  if (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`)[`${numbRow}/${(numbColumn + iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`));
                  } else if (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`)[`${numbRow}/${(numbColumn + iterator)}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn + iterator)}`));
                  }
                }
                if ((numbColumn - 1) > 0) { // left
                  iterator = 1;
                  if (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`)[`${numbRow}/${(numbColumn - iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`));
                  } else if (state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`)[`${numbRow}/${(numbColumn - iterator)}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${numbRow}/${(numbColumn - iterator)}`));
                  }
                }
                if (((numbRow + 1) < 9) & ((numbColumn + 1) < 9)) { // down-right
                  iterator = 1;
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`)[`${(numbRow + iterator)}/${(numbColumn + iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`));
                  } else if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`)[`${(numbRow + iterator)}/${(numbColumn + iterator)}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn + iterator)}`));
                  }
                }
                if (((numbRow - 1) > 0) & ((numbColumn + 1) < 9)) { // up-right
                  iterator = 1;
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`)[`${(numbRow - iterator)}/${(numbColumn + iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`));
                  } else if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`)[`${(numbRow - iterator)}/${(numbColumn + iterator)}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn + iterator)}`));
                  }
                }
                if (((numbRow + 1) < 9) & ((numbColumn - 1) > 0)) { // down-left
                  iterator = 1;
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`)[`${(numbRow + iterator)}/${(numbColumn - iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`));
                  } else if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`)[`${(numbRow + iterator)}/${(numbColumn - iterator)}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow + iterator)}/${(numbColumn - iterator)}`));
                  }
                }
                if (((numbRow - 1) > 0) & ((numbColumn - 1) > 0)) { // up-left
                  iterator = 1;
                  if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`)[`${(numbRow - iterator)}/${(numbColumn - iterator)}`] === 'E') {
                    newAuthorizedCells.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`));
                  } else if (state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`)[`${(numbRow - iterator)}/${(numbColumn - iterator)}`] !== 'E') {
                    newItemKillAble.push(state.board.find(cell => Object.keys(cell)[0] === `${(numbRow - iterator)}/${(numbColumn - iterator)}`));
                  }
                }
                console.log('newAuthorizedCells :', newAuthorizedCells);
                console.log('newItemKillAble :', newItemKillAble);
                break;
            //   case 'E': // Si clique sur une case vide --> Rien TODO: à supprimer si ok
            }
            
            return { // on renvoie le state + la case sur laquelle on a clic pour pouvoir avoir le premier clic en mémoire pour le clic n°2 + le nouveau tableau des case autorisées
              ...state,
              clickedCell: [cell],
              authorizedCells: newAuthorizedCells,
              itemKillAble: newItemKillAble
            };
          }; // fin du if (item === 'E') { return state; } else {
          break;

        case 2: // deuxième clic
          console.log('clic 2');

          let newBoard = [...state.board]; // on prepare le board que l'on aura modifier pour le renvoyer /!\ a ne pas faire de passage par référence
          let effectedMov = [cell, state.clickedCell[0]];

          if ((state.authorizedCells.find(cellOK => Object.keys(cell)[0] === Object.keys(cellOK)[0]) !== undefined) || // est ce que la case sur laquelle on clic fait partie des cases autorisées
          ((state.itemKillAble.find(cellOK => Object.keys(cell)[0] === Object.keys(cellOK)[0]) !== undefined))) { // est ce que la case sur laquelle on clic fait partie des cases killAble
// TODO: rajouter une condtion & si couleur de la pièce que je cible différente de ma couleur 
            const newItem = Object.values(state.clickedCell[0])[0]; // on récupère la pièce qui était sur la case du premier clic

            newBoard.find(cellToModify => Object.keys(cell)[0] === Object.keys(cellToModify)[0])[Object.keys(cell)[0]] = newItem; // on modifie la valeur pour y mettre la nouvelle pièce

            newBoard.find(cellToModify => Object.keys(state.clickedCell[0])[0] === Object.keys(cellToModify)[0])[Object.keys(state.clickedCell[0])[0]] = 'E'; // on 'vide la case du premier clic'

            console.log('cell dif');
            state.webSocket = WS.connect('ws://127.0.0.1:8080');
            state.webSocket.on('socket/connect', function(session) {
              session.publish(state.channel, effectedMov);
              console.log('effectedMov', [...effectedMov]);
            });
            return {
              ...state,
              clickedCell: [], // on réinitialise le tableau clicked cell pour pouvoir recevoir le prochain premier clic
              board: newBoard // on envoie le nouveau board modifié et le damier se mettra à jour
            };
          } else {
            console.log('pas autorisé pas killable');
            return {
              ...state,
              clickedCell: [],
              authorizedCells: [],
              itemKillAble: []
            };

          };
      } // end of switch clicCount
      break; // END CASE CELL CLIC

    default:
      return state;

  }; // end of reducer switch
}; // end of const reducer

export default reducer;
