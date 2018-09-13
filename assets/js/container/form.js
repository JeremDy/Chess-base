import { connect } from 'react-redux';
import Form from '../components/Form';
import { sumbitMessage, writeMessage } from '../store/actions';

const mapStateToProps = state => ({
  valueWrittenMessage: state.valueWrittenMessage
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
