import './HomeHeader.scss';

import { Button, Icon } from 'antd';
import { inject, observer } from 'mobx-react';

import HomeStore from '../../stores/HomeStore';
import React from 'react';
import { goBack } from '../../common/methods/index';

interface HomeHeaderProps {
  homeStore?: HomeStore;
}

@inject('homeStore')
@observer
export default class HomeHeader extends React.Component<HomeHeaderProps> {
  render() {
    const homeStore = this.props.homeStore!;
    const { showBack } = homeStore;

    return (
      <div>
        {showBack ? (
          <Button onClick={goBack} type="link">
            <Icon type="rollback" />
            返回
          </Button>
        ) : null}
      </div>
    );
  }
}
