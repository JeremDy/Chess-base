import { connect } from 'react-redux';
import Setting from 'src/components/Setting';
import { toggleForm, sumbitUserName, writeUserName } from 'src/store/actions';

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
