import { connect } from 'react-redux';
import Message from 'src/components/Message';

const mapStateToProps = state => ({
  messageReceived: state.messageReceived
});

const mapDispatchToProps = dispatch => ({
});

const MessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

export default MessageContainer;
