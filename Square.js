import React, { Component } from 'react';
import './css/Square.css';

export default class Square extends Component {
  setX = () => {
    this.props.onClick()
  }
  render(){
    return (
      <button className="square" onClick={this.setX}>
        {this.props.value}
      </button>
    )
  }
}
