import React from 'react';
import './content.sass';

const Content = ({ userName, messageSend, id }) => (

  <div className="message-content">
    <li className="username">{userName}</li>
    <li className="message">{messageSend}</li>
  </div>
);

export default Content;
