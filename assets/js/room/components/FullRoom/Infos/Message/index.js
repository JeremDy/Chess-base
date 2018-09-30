import React from 'react';
import './messageInfo.sass'
import { css } from 'react-emotion';
import { PacmanLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

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
      commentaire = serverMessage['timer'];
    }
    console.log('serverMessage', serverMessage);
    console.log('serverMessage[error]', serverMessage['error']);
    console.log('commentaire',commentaire)
    return (
        
      <div id="info-bloc">
        <div id="Message">
          <h3 id="message-title"> Commentaires </h3>
          <div className="severMessage">
            <p>{commentaire}</p>
          </div>
        </div>
        <div className='sweet-loading'>
          <PacmanLoader
            className={override}
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