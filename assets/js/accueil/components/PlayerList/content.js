import React from 'react';
import './content.sass';

const Content = ({ name, route, id }) => (

  <div className="player-content">
    <li className="name">{name}</li>
    <li className="message">{route}</li>
  </div>
);

export default Content;
