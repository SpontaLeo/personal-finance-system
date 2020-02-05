import './Fund.scss';

import { inject, observer } from 'mobx-react';

import FundStore from '../../../stores/FundStore';
import FundTable from './fund-table/FundTable';
import React from 'react';

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
        <FundTable
          size="small"
          bordered={true}
          dataSource={investmentRecordList}
        />
        <div className="noun-description"></div>
      </div>
    );
  }
}
