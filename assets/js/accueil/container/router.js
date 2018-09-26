import { connect } from 'react-redux';
import Router from '../components/Router';
import { displayChat, displayList } from '../store/actions/router.js';

const mapStateToProps = state => ({
  hide_chat: state.router.hide_chat,
  hide_list: state.router.hide_list
});

const mapDispatchToProps = dispatch => ({
  displayChat: () => {
    dispatch(displayChat());
  },
  displayList: () => {
    dispatch(displayList());
  }
});

const RouterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Router);

export default RouterContainer;
