import React from 'react';
import './chat.sass';
import Setting from '../../container/setting';// etrange car ce chemin n'est pas bon mais fonctionne
import Message from '../../container/message';
import Form from '../../container/form';

const Chat = () => (
  <div className='bloc' id="Chat">
    <Setting />
    <Message />
    <Form />
  </div>
);

export default Chat;
