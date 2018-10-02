import React from 'react';
import './messageInfo.sass'
import { PacmanLoader } from 'react-spinners';

class Message extends React.Component {
  render() {
    let commentaire = '';
    const {serverMessage, amIWaiting} = this.props;

    if (('' !== serverMessage['message']) & (undefined !== serverMessage['message'])) {
      commentaire = serverMessage['message'];
    } else if (('' !== serverMessage['endGame']) & (undefined !== serverMessage['endGame'])) {
      commentaire = serverMessage['endGame'];
    } else if (('' !== serverMessage['echec']) & (undefined !== serverMessage['echec'])) {
      commentaire = serverMessage['echec'];
    } else if (('' !== serverMessage['error']) & (undefined !== serverMessage['error'])) {
      commentaire = serverMessage['error'];
    } else if (('' !== serverMessage['timer']) & (undefined !== serverMessage['timer'])) {
      if (serverMessage['timer'] === 'start') {
        commentaire = '       L\'adversaire est parti ...';
      } else if (serverMessage['timer'] === 'end') {
        commentaire = '       Nan mais là il abuse, aller t\'as gagné';
      } else if (serverMessage['timer'] === 'stop') {
        commentaire = '       Ah il est revenue... l\'idiot';
      }
    }
    return (
      <div id="info-bloc">
        <div id="Message">
          <h3 id="message-title"> Commentaires </h3>
          <div className="severMessage">
            <p className="comment">{commentaire}</p>
          </div>
        </div>
        <div className='sweet-loading'>
          <PacmanLoader
            className="pacman"
            sizeUnit={'px'}
            size={25}
            color={'#000000'}
            loading={amIWaiting}
          />
        </div>
      </div>
    );
  }
}

export default Message;