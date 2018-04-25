import React, { Component } from 'react';
import Square from './Square.jsx';
import './css/Board.css';

export default class Board extends Component{
  state={
    squares: Array(36).fill(null),
    xIsNext: true,
  }
  calculateWinner = (squares) => {
    const lines = [
      [0,1,2,3,4],
      [1,2,3,4,5],

      [6,7,8,9,10],
      [7,8,9,10,11],

      [12,13,14,15,16],
      [13,14,15,16,17],

      [18,19,20,21,22],
      [19,20,21,22,23],

      [24,25,26,27,28],
      [25,26,27,28,29],

      [30,31,32,33,34],
      [31,32,33,34,35],
      //row
      [0,6,12,18,24],
      [6,12,18,24,30],

      [1,7,13,19,25],
      [7,13,19,25,31],

      [2,8,14,20,26],
      [8,14,20,26,32],

      [3,9,15,21,27],
      [9,15,21,27,33],

      [4,10,16,22,28],
      [10,16,22,28,34],

      [5,11,17,23,29],
      [11,17,23,29,35],
      //col
      [0,7,14,21,28],
      [7,14,21,28,35],

      [5,10,15,20,25],
      [10,15,20,25,30],

      [1,8,15,22,29],
      [6,13,20,27,34],

      [4,9,14,19,24],
      [11,16,21,26,31],
      //x
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a,b,c,d,e] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
        return squares[a];
      }
    }
    return null;
  }
  renderSquare(i){
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )
  }
  handleClick = (i) => {
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = (this.state.xIsNext ? 'X' : 'O');
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  restStatus = () =>{
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
    });
  }
  render() {
    const winner = this.calculateWinner(this.state.squares);
    // const status = "Next player " + (this.state.xIsNext ? 'X' : 'O');
    let status;
    if (winner) {
      status = "Winner is " + winner;
    }else {
      // let arrayNotFull = '';
      // if(this.state.squares){
      //   this.state.squares.map((a,index) => {
      //     if(a === null){
      //       arrayNotFull = true;
      //     }
      //   })
      // }
      // status = "Next player " + (arrayNotFull === '' ? (this.state.xIsNext ? 'X' : 'O') : 'Deuce');
      status = "Next player " + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <div className="status">{status}</div>
        <button onClick={this.restStatus}>Reset</button>
        <br/><br/>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
        <div className="board-row">
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
        </div>
        <div className="board-row">
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
        </div>
        <div className="board-row">
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
        </div>
        <div className="board-row">
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
          {this.renderSquare(35)}
        </div>
      </div>
    );
  }
}
