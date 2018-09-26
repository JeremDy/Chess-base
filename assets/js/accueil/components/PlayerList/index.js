import React from 'react';
import './list.sass';
import Content from './content.js';

const PlayerList = ({playerList}) => (
  <div className='bloc' id="PlayerList">
    <h1> PlayerList </h1>
    <ul id="messages">
    {console.log(playerList)}
      {playerList.map(player => (
        <Content
          userName={player}
        />
      ))}
    </ul>
  </div>
);

export default PlayerList;
