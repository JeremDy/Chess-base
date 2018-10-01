import React from 'react';

const GiveUp = ({giveUp}) => (
  <div id="GiveUp">
    <input type="button" value='Abandonner' onClick={giveUp}/>
  </div>
);
export default GiveUp;