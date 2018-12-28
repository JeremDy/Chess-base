import React from 'react'
import ChessBoard from './ChessBoard';
import './chessBlock.sass';
import CellAround from '../../../containers/CellAround';

class ChessBlock extends React.Component{

    constructor(props){
        super(props);
        this.divRef = React.createRef()
        this.state = {
            width:null
        }
    }

    componentDidMount(){
        window.addEventListener("resize", this.updateWidth);
        this.setState( {width: this.divRef.current.clientWidth} )
        console.log('hey');
    }

    updateWidth = () => {
        this.setState( {width: this.divRef.current.clientWidth} )
        console.log(this.state);
        console.log('hello');
    }
    
    render (){
        const fontSize = this.state.width /45;
        console.log('font', fontSize); 
        return(
            <div ref={this.divRef} id="chessBlock" style={{fontSize}}>
                <CellAround />
                <ChessBoard />
            </div>
        )
    }

}

export default ChessBlock;