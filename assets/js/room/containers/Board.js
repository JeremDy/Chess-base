import { connect } from 'react-redux';
import Board from '../components/FullRoom/ChessBoard/Board';
import { } from '../store/actions';

const mapStateToProps = state => ({
  board: state.board
});

const mapDispatchToProps = dispatch => ({

});

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default BoardContainer;
