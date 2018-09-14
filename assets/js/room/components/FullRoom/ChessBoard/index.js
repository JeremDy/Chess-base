import React from 'react';

import Player from './Player';// etrange car ce chemin n'est pas bon mais fonctionne
import Board from './Board';

const ChessBoard = () => (
  <div id="ChessBoard">
    <Player />
    <Board />
    <Player />
  </div>
);

export default ChessBoard;
