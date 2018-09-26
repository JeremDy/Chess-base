import { connect } from 'react-redux';
import Setting from '../components/Chat/Setting';
import { toggleForm, sumbitUserName, writeUserName } from '../store/actions/chat.js';

const mapStateToProps = state => ({
  hideForm: state.chat.hideForm,
  valueWrittenUserName: state.chat.valueWrittenUserName
});

const mapDispatchToProps = dispatch => ({
  toggleForm: () => {
    dispatch(toggleForm());
  },
  sumbitUserName: (evt) => {
    evt.preventDefault();
    dispatch(sumbitUserName());
  },
  writeUserName: (evt) => {
    dispatch(writeUserName(evt.target.value));
  }

});

const SettingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);

export default SettingContainer;
