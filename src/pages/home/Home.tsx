import './Home.scss';

import { Layout, Menu } from 'antd';
import { inject, observer } from 'mobx-react';

import HomeStore from '../../stores/HomeStore';
import { IconFont } from '../../components/icon-font';
import React from 'react';

const { Sider, Content, Footer } = Layout;
const MenuItem = Menu.Item;

interface HomeProps {
  homeStore?: HomeStore;
}

interface HomeState {
  collapsed: boolean;
}

@inject('homeStore')
@observer
export default class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  onCollapseChange = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { collapsed } = this.state;

    return (
      <Layout>
        <Sider
          theme="light"
          style={{
            height: '100vh',
            overflow: 'auto'
          }}
          collapsible
          breakpoint="sm"
          collapsed={collapsed}
          onCollapse={this.onCollapseChange}
        >
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <MenuItem key="1">
              <IconFont type="icon-digital-currency" />
              <span className="nav-text">数字货币</span>
            </MenuItem>
            <MenuItem key="2">
              <IconFont type="icon-fund" />
              <span className="nav-text">基金定投</span>
            </MenuItem>
            <MenuItem key="3">
              <IconFont type="icon-bill" />
              <span className="nav-text">个人账单</span>
            </MenuItem>
            <MenuItem key="4">
              <IconFont type="icon-liabilities" />
              <span className="nav-text">资产负债</span>
            </MenuItem>
          </Menu>
        </Sider>
        <Layout>
          <Content>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Personal Finance System ©2020 Created by Nayuta
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
