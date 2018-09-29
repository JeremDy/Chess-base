import React from 'react';
import './content.sass';

const Content = ({ userName, profilURL, baseURL }) => {
  const url = `${baseURL}${profilURL}`;

  return (
    <div className="player-content">
      <ul className="row-playerList">
        <li className="cellule name">{userName}</li>
        <li className="cellule link">
          <a href={url}> Voir son profil</a>
        </li>
        <li className="cellule add">
          <a href={url}>Ajouter en amis</a>
        </li>
      </ul>
    </div>
  );
};

export default Content;
