import { connect } from 'react-redux';
import CellAround from '../components/FullRoom/ChessBlock/CellAround/index.js';

const mapStateToProps = state => ({
  myColor: state.myColor
});

const mapDispatchToProps = dispatch => ({

});

const CellAroundContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CellAround);

export default CellAroundContainer;
