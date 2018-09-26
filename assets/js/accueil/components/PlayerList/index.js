import React from 'react';
import './list.sass';

const PlayerList = ({list}) => (
  <div className='bloc' id="PlayerList">
    <h1> PlayerList </h1>
    <ul id="messages">
    LIST
      {/* {list.map(player => (
        <Content
          userName={player.name}
          messageSend={player.route}
        />
      ))} */}
    </ul>
  </div>
);

export default PlayerList;
