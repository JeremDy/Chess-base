import { connect } from 'react-redux';
import PlayerList from '../components/PlayerList/index.js';

const mapStateToProps = state => ({
  playerList: state.playerList.list,
  baseURL: state.router.baseURL
});

const mapDispatchToProps = dispatch => ({
});

const PlayerListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerList);

export default PlayerListContainer;
