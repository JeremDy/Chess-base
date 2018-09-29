import React from 'react';
import './chat.sass';
import Message from '../../container/message';
import Form from '../../container/form';

const Chat = () => (
  <div className='bloc' id="Chat">
    <Message />
    <Form />
  </div>
);

export default Chat;
