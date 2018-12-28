import React from 'react';

import Moves from '../../../containers/Movements.js'; 
import GiveUp from '../../../containers/GiveUp';
import Message from '../../../containers/Message';
import './infos.sass'

const Infos = () => (
  <div id="Infos">
    <Message />
    <Moves /> 
    <GiveUp />
  </div>
);

export default Infos;
