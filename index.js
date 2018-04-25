import React, { Component } from 'react';
import Board from './Board.jsx';
import './css/Game.css';

class Game extends Component {
  // state={
  //   history=[{
  //     squares: Array(9).fill(null),
  //   }],
  //   xIsNext: true,
  // }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }

}

export default Game;
