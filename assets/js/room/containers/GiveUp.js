import { connect } from 'react-redux';
import GiveUp from '../components/FullRoom/Infos/GiveUp';
import { giveUp } from '../store/actions';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  giveUp: () => {
    dispatch(giveUp());
  }
});

const GiveUpContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GiveUp);

export default GiveUpContainer;
