import React from 'react';
import './messageInfo.sass'
const Message = ({serverMessage}) => (
  <div id="Message">
    <h3 id="message-title"> Commentaires </h3>
    <div className="severMessage">
      { undefined !== serverMessage['message'] &&
        <p> {serverMessage['message']} </p>
      }
      { undefined !== serverMessage['endGame'] &&
        <p> {serverMessage['endGame']} </p>
      }
      { undefined !== serverMessage['echec'] &&
        <p> {serverMessage['echec']} </p>
      }
      { undefined !== serverMessage['error'] &&
        <p> {serverMessage['error']} </p>
      }
    </div>
  </div>
);

export default Message;