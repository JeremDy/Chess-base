import React from 'react';
import './giveup.sass';

const GiveUp = ({giveUp}) => (
  <div id="GiveUp">
    <input className="giveUp-button" type="button" value='Abandonner' onClick={giveUp}/>
  </div>
);
export default GiveUp;