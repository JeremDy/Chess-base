import React from 'react';
import './app.sass';
import Setting from '../../container/setting';// etrange car ce chemin n'est pas bon mais fonctionne
import Message from '../../container/message';
import Form from '../../container/form';

const App = () => (
  <div id="app">
    <Setting />
    <Message />
    <Form />
  </div>
);

export default App;
