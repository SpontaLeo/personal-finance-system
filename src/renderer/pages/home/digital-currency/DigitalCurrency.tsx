import './DigitalCurrency.scss';

import { inject, observer } from 'mobx-react';

import { Calendar } from 'antd';
import DigitalCurrencyStore from '../../../stores/DigitalCurrencyStore';
import React from 'react';
import moment from 'moment';

interface DigitalCurrencyProps {
  digitalCurrencyStore?: DigitalCurrencyStore;
}

@inject('digitalCurrencyStore')
@observer
export default class DigitalCurrency extends React.Component<
  DigitalCurrencyProps
> {
  render() {
    const digitalCurrencyStore = this.props.digitalCurrencyStore!;
    const { selectedValue, onDateChange } = digitalCurrencyStore;

    return (
      <div>
        <Calendar
          mode="year"
          value={selectedValue}
          validRange={[moment('2020-01-01'), moment('2099-12-31')]}
          disabledDate={(currentDate: moment.Moment) => {
            return currentDate.isAfter(moment());
          }}
          onSelect={onDateChange}
        />
      </div>
    );
  }
}
