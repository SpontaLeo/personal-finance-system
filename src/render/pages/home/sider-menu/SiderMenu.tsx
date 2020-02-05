import './SiderMenu.scss';

import { inject, observer } from 'mobx-react';

import { HomeMenu } from '../../../constants/Route';
import { IconFont } from '../../../components/icon-font/index';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import React from 'react';
import SiderMenuStore from '../../../stores/SiderMenuStore';

const MenuItem = Menu.Item;

interface SiderMenuProps {
  siderMenuStore?: SiderMenuStore;
}

@inject('siderMenuStore')
@observer
export default class SiderMenu extends React.Component<SiderMenuProps> {
  render() {
    const siderMenuStore = this.props.siderMenuStore!;

    return (
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[HomeMenu[0].key]}
        selectedKeys={[siderMenuStore.currentRoute]}
      >
        {HomeMenu.map(menu => {
          return (
            <MenuItem key={menu.key}>
              <Link to={menu.to}>
                <IconFont type={menu.iconType} />
                <span className="nav-text">{menu.title}</span>
              </Link>
            </MenuItem>
          );
        })}
      </Menu>
    );
  }
}
