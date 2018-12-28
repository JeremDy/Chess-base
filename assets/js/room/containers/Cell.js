import { connect } from 'react-redux';
import Cell from '../components/FullRoom/ChessBlock/ChessBoard/Board/Cell';
import { handleClickOnCell } from '../store/actions';

const mapStateToProps = state => ({
  clickedCell: state.clickedCell,
  allowedMoveList: state.allowedMoveList,
  allowedKillList: state.allowedKillList
});

const mapDispatchToProps = dispatch => ({
  handleClickOnCell: (item, color, row, column) => () => {
    dispatch(handleClickOnCell(item, color, row, column));
  }
});

const CellContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cell);

export default CellContainer;
