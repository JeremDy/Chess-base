import React from 'react';

import Moves from './Moves';// etrange car ce chemin n'est pas bon mais fonctionne
import Nav from './Nav';
import Chat from './Chat';

const Infos = () => (
  <div id="Infos">
    <Moves />
    <Nav />
    <Chat />
  </div>
);

export default Infos;
