import './Home.scss';

import { Layout, Menu } from 'antd';
import { inject, observer } from 'mobx-react';

import HomeStore from '../../stores/HomeStore';
import { IconFont } from '../../components/IconFont';
import React from 'react';

const { Sider, Header, Footer } = Layout;
const MenuItem = Menu.Item;

interface HomeProps {
  homeStore?: HomeStore;
}

@inject('homeStore')
@observer
export default class Home extends React.Component<HomeProps> {
  render() {
    return (
      <Layout>
        <Sider
          style={{
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
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
      </Layout>
    );
  }
}
