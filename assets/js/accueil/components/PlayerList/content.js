import React from 'react';
import './content.sass';

const Content = ({ userName }) => (
  <div className="player-content">
    <li className="name">{userName}</li>
  </div>
);

export default Content;
