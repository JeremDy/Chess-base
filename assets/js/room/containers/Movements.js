import { connect } from 'react-redux';
import Movements from '../components/FullRoom/Infos/Movements';
import { } from '../store/actions';

const mapStateToProps = state => ({
  moveList: state.movementsList,
  color: state.myColor,
  whitePlayer: state.whitePlayer,
  blackPlayer: state.blackPlayer
});

const mapDispatchToProps = dispatch => ({

});

const MovementsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Movements);

export default MovementsContainer;
