import './SiderMenu.scss';

import { inject, observer } from 'mobx-react';

import { HomeMenu } from '../../../common/constants/Route';
import HomeStore from '../../../stores/HomeStore';
import { IconFont } from '../../../common/components';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import React from 'react';

const MenuItem = Menu.Item;

interface SiderMenuProps {
  homeStore?: HomeStore;
}

@inject('homeStore')
@observer
export default class SiderMenu extends React.Component<SiderMenuProps> {
  render() {
    const homeStore = this.props.homeStore!;

    return (
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[HomeMenu[0].key]}
        selectedKeys={[homeStore.menuKey]}
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
