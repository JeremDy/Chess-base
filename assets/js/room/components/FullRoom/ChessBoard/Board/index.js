import React from 'react';
import Cell from '../../../../containers/Cell.js';
import './board.sass';

const Board = ({board, gameOver}) => (
  <div >
    { gameOver === false &&
    <div className='board'>
      {board.map(cell => (
        <Cell row={Object.keys(cell)[0][0]}
          column={Object.keys(cell)[0][2]}
          item={cell[Object.keys(cell)[0]][0]}
          color={cell[Object.keys(cell)[0]][1]}
          key= {`${Object.keys(cell)[0][0]}/${Object.keys(cell)[0][2]}`}
        />
      ))}
    </div>
    }
    { gameOver === true &&
     <div className='board2'>
       <p className='text title'> Game Over </p>
       <p className='text'> Winner : </p>
       <p className='text'> Loser : </p>
     </div>
    }
  </div>
);

export default Board;