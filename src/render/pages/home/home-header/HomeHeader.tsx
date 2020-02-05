import './HomeHeader.scss';

import { Button, Col, Icon, InputNumber, Row } from 'antd';
import { inject, observer } from 'mobx-react';

import HomeStore from '../../../stores/HomeStore';
import { IconFont } from '../../../common/components/icon-font';
import React from 'react';
import { goBack } from '../../../common/methods/index';

interface HomeHeaderProps {
  homeStore?: HomeStore;
}

interface HomeHeaderState {
  rateSyncing: boolean;
  editing: boolean;
  editingValue?: number;
}

@inject('homeStore')
@observer
export default class HomeHeader extends React.Component<
  HomeHeaderProps,
  HomeHeaderState
> {
  state = {
    rateSyncing: false,
    editing: false,
    editingValue: undefined,
  };

  syncRate = async () => {
    const { queryExchangeRate } = this.props.homeStore!;
    this.setState({
      rateSyncing: true,
    });
    await queryExchangeRate();
    this.setState({
      rateSyncing: false,
    });
  };

  editRate = () => {
    this.setState({
      editing: true,
    });
  };

  onRateChange = (value: number | undefined) => {
    this.setState({
      editingValue: value,
    });
  };

  saveEditedRate = (e: any) => {
    const { saveExchangeRate } = this.props.homeStore!;
    const editingValue = this.state.editingValue;
    saveExchangeRate(editingValue);
    this.setState({
      editing: false,
    });
  };

  render() {
    const homeStore = this.props.homeStore!;
    const { showBack, rate, exchangeRate } = homeStore;
    const { rateSyncing, editing } = this.state;

    return (
      <div>
        <Row>
          <Col span={4}>
            {showBack ? (
              <Button onClick={goBack} type="link">
                <Icon type="rollback" />
                返回
              </Button>
            ) : null}
          </Col>
          <Col className="exchange-rate" offset={14} span={6}>
            <IconFont type="icon-exchange-rate" />
            {editing ? (
              <InputNumber
                size="small"
                min={0}
                step={0.01}
                precision={2}
                defaultValue={rate}
                onChange={this.onRateChange}
                onPressEnter={this.saveEditedRate}
              />
            ) : (
              <span> USD/CNY: {exchangeRate} </span>
            )}
            {rateSyncing ? (
              <Icon type="loading" />
            ) : (
              <Icon onClick={this.syncRate} type="sync" />
            )}
            <Icon onClick={this.editRate} type="edit" />
          </Col>
        </Row>
      </div>
    );
  }
}
