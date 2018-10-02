import { connect } from 'react-redux';
import Board from '../components/FullRoom/ChessBoard/Board';

const mapStateToProps = state => ({
  aroundBoard: state.aroundBoard,
  board: state.board,
  gameOver: state.gameOver
});

const mapDispatchToProps = dispatch => ({

});

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default BoardContainer;
