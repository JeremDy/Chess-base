import React from 'react';

import Content from './Content';

const Movements = ({ moveList, color, whitePlayer, blackPlayer }) => (
  <div id="moveList" >
    <h3 className="titleMov" >Liste des actions</h3>
    {moveList.map(moves => (
      <Content
        blackPlayer={blackPlayer}
        whitePlayer={whitePlayer}
        myColor={color}
        item={moves['Item']}
        itemKill={moves['ItemKill']}
        cell={moves['ArrivedCell']}
     
      />
    ))}
  </div>
);

export default Movements;