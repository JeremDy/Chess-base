import { connect } from 'react-redux';
import Form from 'src/components/Form';
import { sumbitMessage, writeMessage } from 'src/store/actions';

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
