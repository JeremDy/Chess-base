import React from 'react';
import './app.sass';
import Setting from 'src/container/setting';// etrange car ce chemin n'est pas bon mais fonctionne
import Message from 'src/container/message';
import Form from 'src/container/form';

const App = () => (
  <div id="app">
    <Setting />
    <Message />
    <Form />
  </div>
);

export default App;
