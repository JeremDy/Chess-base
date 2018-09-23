import React from 'react';
import './cell.sass';
import classNames from 'classnames';

const Cell = ({ item, color, row, column, handleClickOnCell, allowedMoveList, allowedKillList }) => {
  const val = Number(row) + Number(column);

  const className = classNames(
    'fas',
    {
      'fa-chess-pawn': item === 'P',
      'fa-chess-queen': item === 'Q',
      'fa-chess-rook': item === 'T',
      'fa-chess-knight': item === 'C',
      'fa-chess-king': item === 'K',
      'fa-chess-bishop': item === 'F',
      'white': color === '1',
      'black': color === '0'
    });
  const backGround = classNames(
    'cell',
    {
      'allowedToMove': allowedMoveList.includes(`${row}/${column}`),
      'allowedToKill': allowedKillList.includes(`${row}/${column}`),
      'brown': (val % 2 === 1),
      'beige': !(val % 2 === 1)
    }
  );

  return (
    <div className={backGround} onClick={handleClickOnCell(item, color, row, column)}>
      <p className ={className}></p>
    </div>
  );
};

export default Cell;