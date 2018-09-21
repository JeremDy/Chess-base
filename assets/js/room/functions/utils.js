var library = {

  pion: function(clicCount, color, row, column, stateBoard, nextAction, newMoveAllowed, newKillAllowed) {
    console.log('Pion select by clic N° ' + clicCount);
    let i = 1; // valeur d'iteration des cases
    let nextMoveAllowed = [];
    let nextKillAllowed = [];
    let P = {nextMoveAllowed, nextKillAllowed};
    let vector; // spécifique au pion pour déterminer la direction selon la couleur  L69
    let until;

    (color === '1') ? vector = 1 : vector = (-1); // vecteur de direction selon noir ou blanc
    (row === 7 || row === 2) ? until = 3 : until = 2; // si le pion est sur sa ligne de dpéart ou pas

    if ((row + vector < 9) & (row + vector > 0)) {
      while (stateBoard.find(boardCell => Object.keys(boardCell)[0] === `${row + Number(vector) * i}/${column}`)[`${row + Number(vector) * i}/${column}`] === 'E' & i < until) {
        nextMoveAllowed.push(stateBoard.find(boardCell => Object.keys(boardCell)[0] === `${row + Number(vector) * i}/${column}`)); // pousse les cases autorisées dans le tableau
        if (((color === '0') & ((row + i) === 1)) || ((color === '1') & ((row + i) === 8))) { break; } else { i = i + 1; } // permet d'éviter les erreur quand on arrive en bout de damier
      };
      if ((column + 1) < 9) { // prise de pièce vers la droite
        if (stateBoard.find(boardCell => Object.keys(boardCell)[0] === `${row + Number(vector)}/${column + 1}`)[`${row + Number(vector)}/${column + 1}`] !== 'E') {
          nextKillAllowed.push(stateBoard.find(boardCell => Object.keys(boardCell)[0] === `${row + Number(vector)}/${column + 1}`));
        }
      }
      if ((column - 1) > 0) { // prise de pièce vers la gauche
        if (stateBoard.find(boardCell => Object.keys(boardCell)[0] === `${row + Number(vector)}/${column - 1}`)[`${row + Number(vector)}/${column - 1}`] !== 'E') {
          nextKillAllowed.push(stateBoard.find(boardCell => Object.keys(boardCell)[0] === `${row + Number(vector)}/${column - 1}`));
        }
      }
    };
    console.log('Pion next actions :', P);
    nextAction.push(P);
    newMoveAllowed.push(...nextMoveAllowed);
    newKillAllowed.push(...nextKillAllowed);
  },
  tour: function(clicCount, color, row, column, stateBoard, nextAction, newMoveAllowed, newKillAllowed) {
    console.log('Tour select by clic N° ' + clicCount);
    let i; // valeur d'iteration des cases
    let nextMoveAllowed = [];
    let nextKillAllowed = [];
    let T = {nextMoveAllowed, nextKillAllowed};

    if ((row + 1) < 9) { // down /!\ le sens visuel et le sens de generation n'est pas le meme ( en haut à gauche : case 1/1 en bas à droite case 8/8)
      i = 1;

      while (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`)[`${(row + i)}/${column}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`));
        if ((row + i) === 8) { break; } else { i = i + 1; }
      }
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`)[`${(row + i)}/${column}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`));
      }
    }

    if ((row - 1) > 0) { // up
      i = 1;
      while (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`)[`${(row - i)}/${column}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`));
        if ((row - i) === 1) { break; } else { i = i + 1; }
      }
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`)[`${(row - i)}/${column}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`));
      }
    }

    if ((column + 1) < 9) { // right
      i = 1;
      while (stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`)[`${row}/${(column + i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`));
        if ((column + i) === 8) { break; } else { i = i + 1; }
      }
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`)[`${row}/${(column + i)}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`));
      }
    }

    if ((column - 1) > 0) { // left
      i = 1;
      while (stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`)[`${row}/${(column - i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`));
        if ((column - i) === 1) { break; } else { i = i + 1; }
      }
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`)[`${row}/${(column - i)}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`));
      }
    }
    console.log('Tour next actions :', T);
    nextAction.push(T);
    newMoveAllowed.push(...nextMoveAllowed);
    newKillAllowed.push(...nextKillAllowed);
  },
  cavalier: function(clicCount, color, row, column, stateBoard, nextAction, newMoveAllowed, newKillAllowed) {
    console.log('Cavalier select by clic N° ' + clicCount);
    let nextMoveAllowed = [];
    let nextKillAllowed = [];
    let C = {nextMoveAllowed, nextKillAllowed};
    let existingCell = []; // dans un premier temps : remplissage d'un tableau par les cellules qui existe et qui seraient autorisées
    let northLeftnewKey = `${row - 2}/${column - 1}`;
    let northRightnewKey = `${row - 2}/${column + 1}`;
    let southLeftnewKey = `${row + 2}/${column - 1}`;
    let southRightnewKey = `${row + 2}/${column + 1}`;
    let eastUpnewKey = `${row - 1}/${column + 2}`;
    let eastDownnewKey = `${row + 1}/${column + 2}`;
    let westUpnewKey = `${row - 1}/${column - 2}`;
    let westDownnewKey = `${row + 1}/${column - 2}`;
    let allnewKey = [northLeftnewKey, northRightnewKey, southLeftnewKey, southRightnewKey, eastUpnewKey, eastDownnewKey, westUpnewKey, westDownnewKey];
    for (let index = 0; index < 8; index++) {
      if (stateBoard.find(cell => Object.keys(cell)[0] === allnewKey[index]) !== undefined) {
        existingCell.push(stateBoard.find(cell => Object.keys(cell)[0] === allnewKey[index]));
      };
    };
    for (let index = 0; index < existingCell.length; index++) { // une fois le tableau créer on regarde parmis les cases existante et accessible lesquelles sont vides
      if (Object.values(existingCell[index])[0] === 'E') {
        nextMoveAllowed.push(existingCell[index]);// Et on les push dans le tableau des cases autorisées
      } else if (Object.values(existingCell[index])[0] !== 'E') {
        nextKillAllowed.push(existingCell[index]);
      };
    };
    console.log('Cavalier next actions :' + C);
    nextAction.push(C);
    newMoveAllowed.push(...nextMoveAllowed);
    newKillAllowed.push(...nextKillAllowed);
  },
  fou: function(clicCount, color, row, column, stateBoard, nextAction, newMoveAllowed, newKillAllowed) {
    console.log('Fou select by clic N° ' + clicCount);
    let i; // valeur d'iteration des cases
    let nextMoveAllowed = [];
    let nextKillAllowed = [];
    let F = {nextMoveAllowed, nextKillAllowed};

    if (((row + 1) < 9) & ((column + 1) < 9)) { // down-right
      i = 1;
      while (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`)[`${(row + i)}/${(column + i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`));// on push les cases dans le tab cases autorisées
        if ((row + i) === 8 || (column + i) === 8) { break; } else { i = i + 1; } // check si on est au bout du damier ou pas
      }
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`)[`${(row + i)}/${(column + i)}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`));
      }
    }

    if (((row - 1) > 0) & ((column + 1) < 9)) { // up-right
      i = 1;
      while (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`)[`${(row - i)}/${(column + i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`));
        if ((row - i) === 1 || (column + i) === 8) { break; } else { i = i + 1; }
      }
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`)[`${(row - i)}/${(column + i)}`]  !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`));
      }
    }

    if (((row + 1) < 9) & ((column - 1) > 0)) { // down-left
      i = 1;
      while (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`)[`${(row + i)}/${(column - i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`));
        if ((row + i) === 8 || (column - i) === 1) { break; } else { i = i + 1; }
      }
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`)[`${(row + i)}/${(column - i)}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`));
      }
    }

    if (((row - 1) > 0) & ((column - 1) > 0)) { // up-left
      i = 1;
      while (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`)[`${(row - i)}/${(column - i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`));
        if ((row - i) === 1 || (column - i) === 1) { break; } else { i = i + 1; }
      }
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`)[`${(row - i)}/${(column - i)}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`));
      }
    }
    console.log('Fou next actions :', F);
    nextAction.push(F);
    newMoveAllowed.push(...nextMoveAllowed);
    newKillAllowed.push(...nextKillAllowed);
  },
  queen: function(clicCount, color, row, column, stateBoard, nextAction, newMoveAllowed, newKillAllowed) {
    console.log('Queen select by clic N° ' + clicCount);
    let i; // valeur d'iteration des cases
    let nextMoveAllowed = [];
    let nextKillAllowed = [];
    let Q = {nextMoveAllowed, nextKillAllowed};

    if ((row + 1) < 9) { // down /!\ le sens visuel et le sens de generation n'est pas le meme ( en haut à gauche : case 1/1 en bas à droite case 8/8)
      i = 1;
      while (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`)[`${(row + i)}/${column}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`));
        if ((row + i) === 8) { break; } else { i = i + 1; }
      }
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`)[`${(row + i)}/${column}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`));
      }
    }

    if ((row - 1) > 0) { // up
      i = 1;
      while (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`)[`${(row - i)}/${column}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`));
        if ((row - i) === 1) { break; } else { i = i + 1; }
      }
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`)[`${(row - i)}/${column}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`));
      }
    }

    if ((column + 1) < 9) { // right
      i = 1;
      while (stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`)[`${row}/${(column + i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`));
        if ((column + i) === 8) { break; } else { i = i + 1; }
      }
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`)[`${row}/${(column + i)}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`));
      }
    }

    if ((column - 1) > 0) { // left
      i = 1;
      while (stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`)[`${row}/${(column - i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`));
        if ((column - i) === 1) { break; } else { i = i + 1; }
      }
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`)[`${row}/${(column - i)}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`));
      }
    }

    if (((row + 1) < 9) & ((column + 1) < 9)) { // down-right
      i = 1;
      while (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`)[`${(row + i)}/${(column + i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`));// on push les cases dans le tab cases autorisées
        if ((row + i) === 8 || (column + i) === 8) { break; } else { i = i + 1; } // check si on est au bout du damier ou pas
      }
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`)[`${(row + i)}/${(column + i)}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`));
      }
    }

    if (((row - 1) > 0) & ((column + 1) < 9)) { // up-right
      i = 1;
      while (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`)[`${(row - i)}/${(column + i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`));
        if ((row - i) === 1 || (column + i) === 8) { break; } else { i = i + 1; }
      }
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`)[`${(row - i)}/${(column + i)}`]  !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`));
      }
    }

    if (((row + 1) < 9) & ((column - 1) > 0)) { // down-left
      i = 1;
      while (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`)[`${(row + i)}/${(column - i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`));
        if ((row + i) === 8 || (column - i) === 1) { break; } else { i = i + 1; }
      }
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`)[`${(row + i)}/${(column - i)}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`));
      }
    }

    if (((row - 1) > 0) & ((column - 1) > 0)) { // up-left
      i = 1;
      while (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`)[`${(row - i)}/${(column - i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`));
        if ((row - i) === 1 || (column - i) === 1) { break; } else { i = i + 1; }
      }
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`)[`${(row - i)}/${(column - i)}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`));
      }
    }
    console.log('Queen next actions :', Q);
    nextAction.push(Q);
    newMoveAllowed.push(...nextMoveAllowed);
    newKillAllowed.push(...nextKillAllowed);
  },
  king: function(clicCount, color, row, column, stateBoard, nextAction, newMoveAllowed, newKillAllowed) {
    console.log('King select by clic N° ' + clicCount);
    let i; // valeur d'iteration des cases
    let nextMoveAllowed = [];
    let nextKillAllowed = [];
    let K = {nextMoveAllowed, nextKillAllowed};
    if ((row + 1) < 9) { // down  4
      i = 1;
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`)[`${(row + i)}/${column}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`));
        console.log('1er if')
      } else if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`)[`${(row + i)}/${column}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`));
      }
    }
    if ((row - 1) > 0) { // up
      i = 1;
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`)[`${(row - i)}/${column}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`));
      } else if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`)[`${(row - i)}/${column}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`));
      }
    }
    if ((column + 1) < 9) { // right
      i = 1;
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`)[`${row}/${(column + i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`));
      } else if (stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`)[`${row}/${(column + i)}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`));
      }
    }
    if ((column - 1) > 0) { // left
      i = 1;
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`)[`${row}/${(column - i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`));
      } else if (stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`)[`${row}/${(column - i)}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`));
      }
    }
    if (((row + 1) < 9) & ((column + 1) < 9)) { // down-right
      i = 1;
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`)[`${(row + i)}/${(column + i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`));
      } else if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`)[`${(row + i)}/${(column + i)}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`));
      }
    }
    if (((row - 1) > 0) & ((column + 1) < 9)) { // up-right
      i = 1;
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`)[`${(row - i)}/${(column + i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`));
      } else if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`)[`${(row - i)}/${(column + i)}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`));
      }
    }
    if (((row + 1) < 9) & ((column - 1) > 0)) { // down-left
      i = 1;
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`)[`${(row + i)}/${(column - i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`));
      } else if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`)[`${(row + i)}/${(column - i)}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`));
      }
    }
    if (((row - 1) > 0) & ((column - 1) > 0)) { // up-left
      i = 1;
      if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`)[`${(row - i)}/${(column - i)}`] === 'E') {
        nextMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`));
      } else if (stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`)[`${(row - i)}/${(column - i)}`] !== 'E') {
        nextKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`));
      }
    }
    console.log('King next actions :', K);
    nextAction.push(K);
    newMoveAllowed.push(...nextMoveAllowed);
    newKillAllowed.push(...nextKillAllowed);
  }

};

export default library;