import React from 'react';

import Movements from './Movements';

const Content = ({ movesReceived }) => (
  <div id="content" >
    <ul id="messages">
      {movesReceived.map(moves => (
        <Movements
          userName={moves.player}
          messageSend={moves.ref}
          key={moves.id}
        />
      ))}
    </ul>
  </div>
);

export default Content;