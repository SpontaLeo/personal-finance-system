import './Liabilities.scss';

import { inject, observer } from 'mobx-react';

import { Calendar } from 'antd';
import LiabilitiesStore from '../../../stores/LiabilitiesStore';
import React from 'react';
import moment from 'moment';

interface LiabilitiesProps {
  liabilitiesStore?: LiabilitiesStore;
}

@inject('liabilitiesStore')
@observer
export default class Liabilities extends React.Component<LiabilitiesProps> {
  render() {
    const liabilitiesStore = this.props.liabilitiesStore!;
    const { selectedValue, onDateChange } = liabilitiesStore;

    return (
      <Calendar
        mode="year"
        value={selectedValue}
        validRange={[moment('2020-01-01'), moment('2099-12-31')]}
        disabledDate={(currentDate: moment.Moment) => {
          return currentDate.isAfter(moment());
        }}
        onSelect={onDateChange}
      />
    );
  }
}
