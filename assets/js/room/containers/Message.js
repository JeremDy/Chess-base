import { connect } from 'react-redux';
import Message from '../components/FullRoom/Infos/Message';
import { } from '../store/actions';

const mapStateToProps = state => ({
  serverMessage: state.serverMessage,
  amIWaiting: state.amIWaiting
});

const mapDispatchToProps = dispatch => ({

});

const MessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

export default MessageContainer;
