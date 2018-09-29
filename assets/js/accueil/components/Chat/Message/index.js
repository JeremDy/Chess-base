import React from 'react';
import './message.sass';
import Content from './content';
import scrollIntoView from "scroll-into-view";


class Message extends React.Component {
  componentWillUpdate() {
    scrollIntoView(this.something);
  }
  render() {
    const { messageReceived } = this.props;
    return (
      <div className="message-container">
        <ul id="messages">
          {messageReceived.map(message => (
            <Content
              userName={message.sender}
              messageSend={message.message}
              key={`${message.sender}/${message.message}`}
            />
          ))}
        </ul>
        <div ref={node => this.something = node} ></div>
      </div>
    )
  }
}

export default Message;
