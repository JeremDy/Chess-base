import { connect } from 'react-redux';
import Setting from '../components/Setting';
import { toggleForm, sumbitUserName, writeUserName } from '../store/actions';

const mapStateToProps = state => ({
  hideForm: state.hideForm,
  valueWrittenUserName: state.valueWrittenUserName
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
