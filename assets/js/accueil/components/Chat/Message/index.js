import React from 'react';
import './message.sass';
import Content from './content';

const Message = ({ messageReceived }) => (
  <div className="message-container">
    <ul id="messages">
      {messageReceived.map(message => (
        <Content
          userName={message.sender}
          messageSend={message.message}
          key={`${message.sender}/${message.message}`}
        />
      ))}
    </ul>
  </div>
);

export default Message;
