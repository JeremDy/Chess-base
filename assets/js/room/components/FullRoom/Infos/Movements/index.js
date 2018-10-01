import React from 'react';
import './movements.sass';
import Content from './Content';
import scrollIntoView from "scroll-into-view";

class Movements extends React.Component {
  componentWillUpdate() {
    scrollIntoView(this.something);
  }
  render() {
    const { moveList, color, whitePlayer, blackPlayer } = this.props;
    return (
      <div id="movements" >
        <h3 className="titleMov" >Liste des actions</h3>
        <div className="moveList">
          {moveList.map(moves => (
            <Content
              blackPlayer={blackPlayer}
              whitePlayer={whitePlayer}
              myColor={color}
              item={moves['Item']}
              itemKill={moves['ItemKill']}
              cell={moves['ArrivedCell']}
            />
          ))}
          {moveList.length > 8 &&
          <div ref={node => this.something = node} ></div> }
        </div>
      </div>
    )
  }
} 


export default Movements;