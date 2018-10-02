import React from 'react';

import ChessBoard from './ChessBoard';
import Infos from './Infos';
import CellAround from '../../containers/CellAround';

import './fullRoom.sass'

const FullRoom = () => (
  <div id="FullRoom">
    <CellAround />
    <ChessBoard />
    <Infos />

  </div>
);

export default FullRoom;
