var library = {

  pion: function(color, row, column, stateBoard, newMoveAllowed, newKillAllowed) {
    let i = 1; // valeur d'iteration des cases
    let vector; // spécifique au pion pour déterminer la direction selon la couleur  L69
    let until;

    (color == '1') ? vector = 1 : vector = (-1); // vecteur de direction selon noir ou blanc
    (row === 7 || row === 2) ? until = 3 : until = 2; // si le pion est sur sa ligne de départ ou pas
    if ((row + vector < 9) & (row + vector > 0)) {
      while (
        Object.values(stateBoard.find(boardCell => Object.keys(boardCell)[0] === `${row + Number(vector) * i}/${column}`))[0] === 'E' &
        (i < until)
      ) {
        newMoveAllowed.push(stateBoard.find(boardCell => Object.keys(boardCell)[0] === `${row + Number(vector) * i}/${column}`)); // pousse les cases autorisées dans le tableau
        if (((color === '0') & ((row + i) === 1)) || ((color === '1') & ((row + i) === 8))) { break; } else { i = i + 1; } // permet d'éviter les erreur quand on arrive en bout de damier
      };
      if ((column + 1) < 9) { // prise de pièce vers la droite
        if (
          Object.values(stateBoard.find(boardCell => Object.keys(boardCell)[0] === `${row + Number(vector)}/${column + 1}`))[0] !== 'E' &
          Object.values(stateBoard.find(boardCell => Object.keys(boardCell)[0] === `${row + Number(vector)}/${column + 1}`))[0].slice(1, 2) != color
        ) {
          newKillAllowed.push(stateBoard.find(boardCell => Object.keys(boardCell)[0] === `${row + Number(vector)}/${column + 1}`));
        }
      }
      if ((column - 1) > 0) { // prise de pièce vers la gauche
        if (
          Object.values(stateBoard.find(boardCell => Object.keys(boardCell)[0] === `${row + Number(vector)}/${column - 1}`))[0] !== 'E' &
          Object.values(stateBoard.find(boardCell => Object.keys(boardCell)[0] === `${row + Number(vector)}/${column - 1}`))[0].slice(1, 2) != color
        ) {
          newKillAllowed.push(stateBoard.find(boardCell => Object.keys(boardCell)[0] === `${row + Number(vector)}/${column - 1}`));
        }
      }
    };

    console.log('Pion allowed action : newmove', newMoveAllowed,'newkill', newKillAllowed);
  },
  tour: function(color, row, column, stateBoard, newMoveAllowed, newKillAllowed) {
    let i; // valeur d'iteration des cases
    if ((row + 1) < 9) { // down /!\ le sens visuel et le sens de generation n'est pas le meme ( en haut à gauche : case 1/1 en bas à droite case 8/8)
      i = 1;

      while (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`));
        if ((row + i) === 8) { break; } else { i = i + 1; }
      }

      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`));
      }
    }

    if ((row - 1) > 0) { // up
      i = 1;
      while (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`));
        if ((row - i) === 1) { break; } else { i = i + 1; }
      }
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`));
      }
    }

    if ((column + 1) < 9) { // right
      i = 1;
      while (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`));
        if ((column + i) === 8) { break; } else { i = i + 1; }
      }
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`));
      }
    }

    if ((column - 1) > 0) { // left
      i = 1;
      while (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`));
        if ((column - i) === 1) { break; } else { i = i + 1; }
      }
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`));
      }
    }
    // console.log('Tour allowed action :', newMoveAllowed, newKillAllowed);
  },
  cavalier: function(color, row, column, stateBoard, newMoveAllowed, newKillAllowed) {
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
      if (Object.values(existingCell[index])[0] === 'E'
      ) {
        newMoveAllowed.push(existingCell[index]);// Et on les push dans le tableau des cases autorisées
      } else if (Object.values(existingCell[index])[0] !== 'E' & Object.values(existingCell[index])[0].slice(1, 2) != color) {
        newKillAllowed.push(existingCell[index]);
      };
    };
    // console.log('Cavalier allowed action :', newMoveAllowed, newKillAllowed);
  },
  fou: function(color, row, column, stateBoard, newMoveAllowed, newKillAllowed) {
    let i; // valeur d'iteration des cases
    if (((row + 1) < 9) & ((column + 1) < 9)) { // down-right
      i = 1;
      while (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`));// on push les cases dans le tab cases autorisées
        if ((row + i) === 8 || (column + i) === 8) { break; } else { i = i + 1; } // check si on est au bout du damier ou pas
      }
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`));
      }
    }

    if (((row - 1) > 0) & ((column + 1) < 9)) { // up-right
      i = 1;
      while (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`));
        if ((row - i) === 1 || (column + i) === 8) { break; } else { i = i + 1; }
      }
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`));
      }
    }

    if (((row + 1) < 9) & ((column - 1) > 0)) { // down-left
      i = 1;
      while (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`));
        if ((row + i) === 8 || (column - i) === 1) { break; } else { i = i + 1; }
      }
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`));
      }
    }

    if (((row - 1) > 0) & ((column - 1) > 0)) { // up-left
      i = 1;
      while (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`));
        if ((row - i) === 1 || (column - i) === 1) { break; } else { i = i + 1; }
      }
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`));
      }
    }
    // console.log('Fou allowed action :', newMoveAllowed, newKillAllowed)
  },
  queen: function(color, row, column, stateBoard, newMoveAllowed, newKillAllowed) {
    let i; // valeur d'iteration des cases
    if ((row + 1) < 9) { // down /!\ le sens visuel et le sens de generation n'est pas le meme ( en haut à gauche : case 1/1 en bas à droite case 8/8)
      i = 1;
      while (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`));
        if ((row + i) === 8) { break; } else { i = i + 1; }
      }
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`));
      }
    }

    if ((row - 1) > 0) { // up
      i = 1;
      while (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`));
        if ((row - i) === 1) { break; } else { i = i + 1; }
      }
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`));
      }
    }

    if ((column + 1) < 9) { // right
      i = 1;
      while (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`));
        if ((column + i) === 8) { break; } else { i = i + 1; }
      }
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`));
      }
    }

    if ((column - 1) > 0) { // left
      i = 1;
      while (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`));
        if ((column - i) === 1) { break; } else { i = i + 1; }
      }
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`));
      }
    }

    if (((row + 1) < 9) & ((column + 1) < 9)) { // down-right
      i = 1;
      while (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`));// on push les cases dans le tab cases autorisées
        if ((row + i) === 8 || (column + i) === 8) { break; } else { i = i + 1; } // check si on est au bout du damier ou pas
      }
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`));
      }
    }

    if (((row - 1) > 0) & ((column + 1) < 9)) { // up-right
      i = 1;
      while (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`));
        if ((row - i) === 1 || (column + i) === 8) { break; } else { i = i + 1; }
      }
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`));
      }
    }

    if (((row + 1) < 9) & ((column - 1) > 0)) { // down-left
      i = 1;
      while (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`));
        if ((row + i) === 8 || (column - i) === 1) { break; } else { i = i + 1; }
      }
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`));
      }
    }

    if (((row - 1) > 0) & ((column - 1) > 0)) { // up-left
      i = 1;
      while (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`));
        if ((row - i) === 1 || (column - i) === 1) { break; } else { i = i + 1; }
      }
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`));
      }
    }
    //   console.log('Queen allowed action :', newMoveAllowed, newKillAllowed)
  },
  king: function(color, row, column, stateBoard, newMoveAllowed, newKillAllowed) {
    let i; // valeur d'iteration des cases
    if ((row + 1) < 9) { // down  4
      i = 1;
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`));
        console.log('1er if')
      } else if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`))[0].slice(1, 2) != color

      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${column}`));
      }
    }
    if ((row - 1) > 0) { // up
      i = 1;
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`));
      } else if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${column}`));
      }
    }
    if ((column + 1) < 9) { // right
      i = 1;
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`));
      } else if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column + i)}`));
      }
    }
    if ((column - 1) > 0) { // left
      i = 1;
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`));
      } else if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${row}/${(column - i)}`));
      }
    }
    if (((row + 1) < 9) & ((column + 1) < 9)) { // down-right
      i = 1;
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`));
      } else if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column + i)}`));
      }
    }
    if (((row - 1) > 0) & ((column + 1) < 9)) { // up-right
      i = 1;
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`));
      } else if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column + i)}`));
      }
    }
    if (((row + 1) < 9) & ((column - 1) > 0)) { // down-left
      i = 1;
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`));
      } else if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`))[0].slice(1, 2) != color
      ) {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row + i)}/${(column - i)}`));
      }
    }
    if (((row - 1) > 0) & ((column - 1) > 0)) { // up-left
      i = 1;
      if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`))[0] === 'E'
      ) {
        newMoveAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`));
      } else if (
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`))[0] !== 'E' &
        Object.values(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`))[0].slice(1, 2) != color
      )     {
        newKillAllowed.push(stateBoard.find(cell => Object.keys(cell)[0] === `${(row - i)}/${(column - i)}`));
      }
    }
    // console.log('King allowed actions :',  newMoveAllowed, newKillAllowed);
  },
  createArray: function(arrayName, myColor) {
    let color;
    let partList = ['P', 'T', 'C', 'F', 'Q', 'K'];
    if (arrayName === 'opponentAction'
  ) {
      myColor == 1 ? color = 0 : color = 1;
    } else if (arrayName === 'myAction'
  ) {
      myColor == 1 ? color = 1 : color = 0;
    } else { console.log('erreur'); };

    arrayName = {};
    partList.forEach(part => {
      arrayName[`${part}${color}`] = {};
    });
    partList.forEach(part => {
      arrayName[`${part}${color}`]['newAllowedMove'] = {};
      arrayName[`${part}${color}`]['newAllowedKill'] = {};
    });
    return arrayName;
  },
  getAllOpponentMov: function(myColor, board) {
    let color;
    myColor == 1 ? color = 0 : color = 1;
    let opponentMov = library.createArray('opponentAction', myColor);
    let partList = ['P', 'T', 'C', 'F', 'Q', 'K'];
    let partWithThisColor = board.filter(cell => Object.values(cell)[0].slice(1,2) == color);
    partList.forEach(function(part) {
      let newMoveAllowed = [];
      let newKillAllowed = [];
      partWithThisColor.filter(cell => Object.values(cell)[0].slice(0,1) === part).forEach(function(cell) {
        let rowOp = Number(Object.keys(cell)[0].slice(0, 1));
        let columnOp = Number(Object.keys(cell)[0].slice(2, 3));
        switch (part) { // Selon la pièce sur laquelle on a clic, on va créer un tableau de cases autorisées
          case 'P':
            library.pion(color, rowOp, columnOp, board, newMoveAllowed, newKillAllowed);
            break;
          case 'T':
            library.tour(color, rowOp, columnOp, board, newMoveAllowed, newKillAllowed);
            break;
          case 'C':
            library.cavalier(color, rowOp, columnOp, board, newMoveAllowed, newKillAllowed);
            break;
          case 'F':
            library.fou(color, rowOp, columnOp, board, newMoveAllowed, newKillAllowed);
            break;
          case 'Q':
            library.queen(color, rowOp, columnOp, board, newMoveAllowed, newKillAllowed);
            break;
          case 'K':
            library.king(color, rowOp, columnOp, board, newMoveAllowed, newKillAllowed);
            break;
        }
        // console.log('getAllOpponentMov',opponentMov);

        opponentMov[`${part}${color}`]['newAllowedMove'] = {...newMoveAllowed};
        opponentMov[`${part}${color}`]['newAllowedKill'] = {...newKillAllowed};
      });
    }); 
    return opponentMov;
  },
  getAllMyMov: function(myColor, board) {
    let color;
    myColor == 1 ? color = 1 : color = 0;
    let myMov = library.createArray('myAction', myColor);
    let partList = ['P', 'T', 'C', 'F', 'Q', 'K'];
    let partWithThisColor = board.filter(cell => Object.values(cell)[0].slice(1,2) == color);
    partList.forEach(function(part) {
      let newMoveAllowed = [];
      let newKillAllowed = [];
      partWithThisColor.filter(cell => Object.values(cell)[0].slice(0,1) === part).forEach(function(cell) {
        let rowOp = Number(Object.keys(cell)[0].slice(0, 1));
        let columnOp = Number(Object.keys(cell)[0].slice(2, 3));
        switch (part) { // Selon la pièce sur laquelle on a clic, on va créer un tableau de cases autorisées
          case 'P':
            library.pion(color, rowOp, columnOp, board, newMoveAllowed, newKillAllowed);
            break;
          case 'T':
            library.tour(color, rowOp, columnOp, board, newMoveAllowed, newKillAllowed);
            break;
          case 'C':
            library.cavalier(color, rowOp, columnOp, board, newMoveAllowed, newKillAllowed);
            break;
          case 'F':
            library.fou(color, rowOp, columnOp, board, newMoveAllowed, newKillAllowed);
            break;
          case 'Q':
            library.queen(color, rowOp, columnOp, board, newMoveAllowed, newKillAllowed);
            break;
          case 'K':
            library.king(color, rowOp, columnOp, board, newMoveAllowed, newKillAllowed);
            break;
        }
        // console.log('getAllMyMov', myMov);
        myMov[`${part}${color}`]['newAllowedMove'] = {...newMoveAllowed};
        myMov[`${part}${color}`]['newAllowedKill'] = {...newKillAllowed};
      });
    }); 
    return myMov;
  }
};

export default library;