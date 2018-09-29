import React from 'react';

import Moves from '../../../containers/Movements.js'; 
import Nav from './Nav';
import Message from '../../../containers/Message';
import './infos.sass'

const Infos = () => (
  <div id="Infos">
    <Moves />
    {/* <Nav /> */}
    <Message  />
  </div>
);

export default Infos;
