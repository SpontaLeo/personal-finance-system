import './TradingRecord.scss';
import 'braft-editor/dist/index.css';

import { Button, List } from 'antd';
import { inject, observer } from 'mobx-react';

import React from 'react';
import TradingRecordStore from '../../../stores/TradingRecordStore';

interface TradingRecordProps {
  tradingRecordStore?: TradingRecordStore;
}

@inject('tradingRecordStore')
@observer
export default class TradingRecord extends React.Component<TradingRecordProps> {
  render() {
    const { addTradingRecord } = this.props.tradingRecordStore!;

    return (
      <div className="trading-record">
        <Button type="primary" onClick={addTradingRecord}>
          新增交易记录
        </Button>
        <List />
      </div>
    );
  }
}
