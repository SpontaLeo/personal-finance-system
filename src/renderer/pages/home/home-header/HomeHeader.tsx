import './HomeHeader.scss';

import { Button, Col, Icon, InputNumber, Row } from 'antd';
import { inject, observer } from 'mobx-react';

import HomeStore from '../../../stores/HomeStore';
import { IconFont } from '../../../common/components';
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

  componentDidMount() {
    const tradingViewContainer = document.getElementById(
      'trading-view-container',
    )!;
    const tradingViewScript = document.getElementById('trading-view-script')!;

    tradingViewContainer.appendChild(tradingViewScript);
  }

  componentWillUnmount() {
    const tradingViewContainer = document.getElementById(
      'trading-view-container',
    )!;
    const tradingViewScript = document.getElementById('trading-view-script')!;
    tradingViewContainer.removeChild(tradingViewScript);
  }

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

  cancelEdit = () => {
    this.setState({
      editing: false,
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
          <Col span={14}>
            <div id="trading-view-container"></div>
          </Col>
          <Col className="exchange-rate" span={6}>
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
            <Icon type="sync" onClick={this.syncRate} spin={rateSyncing} />
            {editing ? (
              <Icon onClick={this.cancelEdit} type="close" />
            ) : (
              <Icon onClick={this.editRate} type="edit" />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
