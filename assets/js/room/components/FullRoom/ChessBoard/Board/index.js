import React from 'react';
import Cell from '../../../../containers/Cell.js';
import './board.sass';

const Board = ({board}) => (
  <div id='board'>
    {console.log(board)}
    {board.map(cell => (
      <Cell row={Object.keys(cell)[0][0]}
        column={Object.keys(cell)[0][2]}
        item={cell[Object.keys(cell)[0]][0]}
        color={cell[Object.keys(cell)[0]][1]}
      />
    ))}
  </div>
  
);

export default Board;