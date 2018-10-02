import React from 'react';
import './content.sass';
import classNames from 'classnames';


const content = ({ item, itemKill, cell, myColor, whitePlayer, blackPlayer }) => {
  let whoPlay;
  let me;
  let myOpponent;
  let whoPlayLeft;
  let whoPlayRight;
  let itemKillé;
  let itemColor;
  let itemKillColor;
  myColor == '1' ? me = whitePlayer : me = blackPlayer;
  myColor == '1' ? myOpponent = blackPlayer : myOpponent = whitePlayer;
  item[1] == '1' ? itemColor = 'blanc' : itemColor = 'noir';
  itemKill[1] == '1' ? itemKillColor = 'blanc' : itemKillColor = 'noir';
  if (item[1] == myColor) {
    whoPlay = me;
    whoPlayLeft = ` ${me}: `;
    whoPlayRight = '';
  } else if (item[1] != myColor) {
    whoPlay = myOpponent;
    whoPlayLeft = '';
    whoPlayRight = ` :${myOpponent}`;
  }

  const className = classNames(
    ' mov-content',
    {
      'me': whoPlay === me,
      'myOpponent': whoPlay === myOpponent
    });

  switch (item[0]) {
    case 'P':
      item = 'Pion';
      break;
    case 'C':
      item = 'Cavalier';
      break;
    case 'T':
      item = 'Tour';
      break;
    case 'F':
      item = 'Fou';
      break;
    case 'Q':
      item = 'Reine';
      break;
    case 'K':
      item = 'Roi';
      break;
    default:
      break;
  }
  switch (itemKill[0]) {
    case 'P':
      itemKillé = 'Pion';
      break;
    case 'C':
      itemKillé = 'Cavalier';
      break;
    case 'T':
      itemKillé = 'Tour';
      break;
    case 'F':
      itemKillé = 'Fou';
      break;
    case 'Q':
      itemKillé = 'Reine';
      break;
    case 'K':
      itemKillé = 'Roi';
      break;
    default:
      break;
  }
  return (
    <div>
      { 'E' === itemKill &&
  <ul className={className}>
    <li className="rowMov"> <span className="player">{whoPlayLeft}</span>  {item} {itemColor} en {cell} <span className="player">{whoPlayRight}</span></li>
  </ul>
      }
      { 'E' !== itemKill &&
    <ul className={className}>
      <li className="rowMove"> <span className="player">{whoPlayLeft}</span> Prise du {itemKillé} {itemKillColor} en {cell} par le {item} {itemColor}<span className="player">{whoPlayRight}</span></li>
    </ul>
      }
    </div>
  );
};

export default content;
