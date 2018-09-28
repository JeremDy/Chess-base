import React from 'react';

import ChessBoard from './ChessBoard';
import Infos from './Infos';
import RoomNav from './RoomNav';
import './fullRoom.sass'

const FullRoom = () => (
  <div id="FullRoom">
    <ChessBoard />

     <Infos />
    {/* <RoomNav />  */}
  </div>
);

export default FullRoom;
