import { connect } from 'react-redux';
import Form from '../components/Chat/Form';
import { sumbitMessage, writeMessage } from '../store/actions/chat.js';

const mapStateToProps = state => ({
  valueWrittenMessage: state.chat.valueWrittenMessage
});

const mapDispatchToProps = dispatch => ({
  sumbitMessage: (evt) => {
    evt.preventDefault();
    dispatch(sumbitMessage());
  },
  writeMessage: (evt) => {
    dispatch(writeMessage(evt.target.value));
  }

});

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

export default FormContainer;
