import React from 'react';

import Messages from './Messages';

const Content = ({ messageReceived }) => (
  <div id="content" >
    <ul id="messages">
      {messageReceived.map(message => (
        <Messages
          userName={message.sender}
          messageSend={message.message}
          key={message.id}
        />
      ))}
    </ul>
  </div>
);

export default Content;