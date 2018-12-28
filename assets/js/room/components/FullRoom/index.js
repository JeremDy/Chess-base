import React from 'react';
import Infos from './Infos';
import ChessBlock from './ChessBlock';


import './fullRoom.sass'

const FullRoom = () => (
  <div id="FullRoom" className="row" >
    <ChessBlock/>
    <Infos />
  </div>
);

export default FullRoom;