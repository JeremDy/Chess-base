import React from 'react';
import Cell from '../../../../containers/Cell.js';
import './board.sass';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Board = ({board, gameOver}) => {
  const transitionOptions = {
    transitionName: 'fade',
    transitionEnterTimeout: 10500,
    transitionLeaveTimeout: 10500
  };
  let theChild;
  if (gameOver) {
    theChild = <div className='gameOver' key='gameOver'>
      <p className='text title'> Game Over </p>

    </div>;
  }
  return (
    <div id='containerBoard'>
      <div className='mainBoard' key='mainBoard'>
        {board.map(cell => (
          <Cell row={Object.keys(cell)[0][0]}
            column={Object.keys(cell)[0][2]}
            item={cell[Object.keys(cell)[0]][0]}
            color={cell[Object.keys(cell)[0]][1]}
            key= {`${Object.keys(cell)[0][0]}/${Object.keys(cell)[0][2]}`}
          />
        ))}
      </div>
      <ReactCSSTransitionGroup {...transitionOptions}>
        {theChild}
      </ReactCSSTransitionGroup>
    </div>
  );
};

export default Board;