import React from 'react';

const Messages = ({ userName, messageSend, id }) => (

  <div className="message-content">
    <li className="username">{userName}</li>
    <li className="message">{messageSend}</li>
  </div>
);

export default Messages;
