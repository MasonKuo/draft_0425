# draft_0425

--index 

import React, { Component } from 'react';
import { withRouter,Switch,Redirect,Link,Route,BrowserRouter as Router} from 'react-router-dom';
import { Menu, Icon, Layout, Input } from 'antd';
import Content1 from './content1';
import Home from './pageHome';
import Braft from './pageBraft';
import Appstore from './pageAppstore';
import Navigation from './Navigation';
import './css/header.css';
import logo from '../react.svg';
// import './css/content.css';
const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Search = Input.Search;

const data = {
  messages: 'Messages',
}

const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/Braft',
        component: Braft,
    },
    {
        path: '/AppStore',
        component: Appstore,
    },
    {
      path: '/Navigation/:option',
      component: Navigation,
    }
];

class Header1 extends Component {
  state = {
    current: 'home',
    searchMessages: '',
  }
  handleClick = (e) => {
    console.log('click', e);
    this.setState({
      current: e.key,
    });
  }
  searchChange = (e) => {
    const targetValue = e.target.value;
    this.setState({
      searchMessages: targetValue
    })
    console.log(targetValue);
  }
  render() {
    const HeaderLayout = withRouter(({history,location,match,}) => {
      return(
        <Layout>
          <div className="headerTop"></div>
          <Header style={{ height: '65px' }}>
            <div className="logo">
              <img src={logo} className="App-logo" alt="logo" />
              <span style={{ color: 'red', lineHeight: '64px', marginLeft: '10px', marginRight: '10px' }}>CWR</span>
            </div>
            <Menu
              onClick={this.handleClick}
              // selectedKeys={[this.state.current]}
              // selectedKeys={[window.location.pathname]}
              selectedKeys={[history.location.pathname]}
              mode="horizontal"
              theme="dark"
              className="navMenu"
              style={{ lineHeight: '64px', width: '60%', float: 'left' }}
            >
              <Menu.Item key="/">
                <Link to="/"><Icon type="home" />Project</Link>
              </Menu.Item>
              <Menu.Item key="/Braft">
                <Link to="/Braft"><Icon type="file-text" />Task</Link>
              </Menu.Item>
              <Menu.Item key="/AppStore">
                <Link to="/AppStore"><Icon type="appstore" />Actions</Link>
              </Menu.Item>
              <SubMenu  title={<span><Icon type="setting" />Bookmark</span>}>
                <MenuItemGroup title="Item 1">
                  <Menu.Item key="/Navigation/Navigation3"><Link to="/Navigation/Navigation3">Option1</Link></Menu.Item>
                  <Menu.Item key="/Navigation/Navigation4"><Link to="/Navigation/Navigation4">Option2</Link></Menu.Item>
                </MenuItemGroup>
              </SubMenu>
            </Menu>
            <Search
              placeholder="Search"
              style={{ width: '30%', float: 'right', lineHeight: '64px' }}
              onChange={this.searchChange}
              ></Search>
          </Header>
          {/*<Content title={this.state.current} />*/}
          {/* <p>{this.state.searchMessages}</p> */}
          <Switch>
            {
              routes.map((route, i) => (
                <Route key={i} path={route.path} exact={route.exact} component={route.component}/>
              ))
            }
          </Switch>
          <Footer
            style={{ height: '10%', position: 'absolute', bottom: '0', width: '100%' }}
            >
            <h4>Copyright © 2011-2018 MasonKuo. 当前呈现版本 18.03.05</h4>
            <p>GitHub:<a href="//masonkuo.github.io/">MasonKuo</a></p>
          </Footer>
        </Layout>
      )
    })
    return (
      <Router>
        <HeaderLayout />
      </Router>
    );
  }
}

export default Header1;

--Game

---Game_index

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

Game_Square

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

---Game_Board

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

--Game_css_Game

.square{
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-left: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.square:focus{
  outline: none;
}

--Game_css_Square

.game{
  display: flex;
  flex-direction: row;
  margin: 20px;
}

