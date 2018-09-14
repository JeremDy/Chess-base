import React from 'react';

const Movements = ({ player, ref, id }) => (

  <div className="message-content">
    <li className="username">{player}</li>
    <li className="message">{ref}</li>
  </div>
);

export default Movements;
