import { connect } from 'react-redux';
import Message from '../components/Chat/Message';

const mapStateToProps = state => ({
  messageReceived: state.chat.messageReceived
});

const mapDispatchToProps = dispatch => ({
});

const MessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

export default MessageContainer;
