import './Home.scss';

import { ChildRoute, HomeMenu } from '../../common/constants/Route';
import { Redirect, Route, Switch } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import HomeHeader from './home-header/HomeHeader';
import HomeStore from '../../stores/HomeStore';
import { Layout } from 'antd';
import React from 'react';
import SiderMenu from './sider-menu/SiderMenu';

const { Sider, Header, Content, Footer } = Layout;

interface HomeProps {
  homeStore?: HomeStore;
}

interface HomeState {
  collapsed: boolean;
}

@inject('homeStore')
@observer
export default class Home extends React.Component<HomeProps, HomeState> {
  state = {
    collapsed: false,
  };

  onCollapseChange = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { collapsed } = this.state;

    return (
      <Layout className="home">
        <Sider
          theme="light"
          width="160"
          style={{
            height: '100vh',
            overflow: 'auto',
          }}
          collapsible
          breakpoint="md"
          collapsed={collapsed}
          onCollapse={this.onCollapseChange}
        >
          <SiderMenu />
        </Sider>
        <Layout>
          <Header>
            <HomeHeader />
          </Header>
          <Content>
            <Switch>
              <Route
                path="/"
                exact={true}
                render={() => <Redirect to="/digital-currency" />}
              />
              {HomeMenu.map(menu => {
                return (
                  <Route
                    key={menu.key}
                    path={menu.to}
                    exact
                    component={menu.component}
                  />
                );
              })}
              {ChildRoute.map(route => {
                return (
                  <Route
                    key={route.key}
                    path={route.to}
                    component={route.component}
                  />
                );
              })}
            </Switch>
          </Content>
          <Footer>
            复利是世界上第八大奇迹——爱因斯坦
            <br />
            Personal Finance System ©2020 Created by Nayuta
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
