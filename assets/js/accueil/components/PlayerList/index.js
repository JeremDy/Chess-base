import React from 'react';
import './list.sass';
import Content from './content.js';

const PlayerList = ({playerList, baseURL}) => (
  <div className='bloc' id="PlayerList">
    <h1 className='title' > Liste des joueurs en ligne</h1>
    {console.log(playerList)}
    {playerList.map(player => (
      <Content
        userName={player['name']}
        profilURL={player['profilPath']}
        baseURL={baseURL}
        key= {player['name']+player['profilPath']}
      />
    ))}

  </div>
);

export default PlayerList;
