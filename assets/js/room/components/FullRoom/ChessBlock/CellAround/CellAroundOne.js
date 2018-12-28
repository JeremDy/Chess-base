import React from 'react';
import './cellAroundOne.sass';

const CellAroundOne = ({item}) => {
  return (
    <div className="container-cellAroundOne" >
      <p className ="itemCellAround">{item}</p>
    </div>
  );
};

export default CellAroundOne ;