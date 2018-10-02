import React from 'react';

import Player from './Player';// etrange car ce chemin n'est pas bon mais fonctionne
import Board from '../../../containers/Board.js';
import './chessBoard.sass';
const ChessBoard = () => (
  <div id="ChessBoard">
    <Board />
  </div>
);

export default ChessBoard;
