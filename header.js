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
