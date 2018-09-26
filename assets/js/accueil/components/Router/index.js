import React from 'react';
import Chat from '../Chat';
import PlayerList from '../../container/playerList.js';
import './router.sass';

const Router = ({hide_chat, hide_list, displayChat, displayList}) => (
  <div id="router">
    <button className='onglet' onClick={displayChat}> ChatRoom </button>
    <button className='onglet' onClick={displayList}> Players </button>
    { hide_chat === false &&
    <Chat /> }
    { hide_list === false &&
        <PlayerList /> }

  </div>
);

export default Router;
