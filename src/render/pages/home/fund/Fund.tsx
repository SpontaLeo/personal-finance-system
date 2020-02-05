import './Fund.scss';

import { inject, observer } from 'mobx-react';

import { FUNDTABLECOLUMNS } from './constant';
import FundStore from '../../../stores/FundStore';
import React from 'react';
import { Table } from 'antd';

interface FundProps {
  fundStore?: FundStore;
}

@inject('fundStore')
@observer
export default class Fund extends React.Component<FundProps> {
  render() {
    const fundStore = this.props.fundStore!;
    const { investmentRecordList } = fundStore;

    return (
      <div className="fund">
        <Table size="small" bordered={true} columns={FUNDTABLECOLUMNS} dataSource={investmentRecordList} />
        <div className="noun-description"></div>
      </div>
    );
  }
}
