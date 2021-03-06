import './PersonalBill.scss';

import { inject, observer } from 'mobx-react';

import { Calendar } from 'antd';
import PersonalBillStore from '../../../stores/PersonalBillStore';
import React from 'react';
import moment from 'moment';

interface PersonalBillProps {
  personalBillStore?: PersonalBillStore;
}

@inject('personalBillStore')
@observer
export default class PersonalBill extends React.Component<PersonalBillProps> {
  render() {
    const personalBillStore = this.props.personalBillStore!;
    const { onSelectDate } = personalBillStore;

    return (
      <Calendar
        mode="year"
        validRange={[moment('2020-01-01'), moment()]}
        disabledDate={(currentDate: moment.Moment) => {
          return currentDate.isAfter(moment());
        }}
        onSelect={onSelectDate}
      />
    );
  }
}
