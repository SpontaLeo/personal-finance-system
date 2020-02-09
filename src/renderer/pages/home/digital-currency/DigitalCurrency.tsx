import './DigitalCurrency.scss';

import { Calendar, Modal } from 'antd';
import { inject, observer } from 'mobx-react';

import { DigitalCurrencyFieldValues } from './digital-currency-form/DigitalCurrencyForm';
import DigitalCurrencyForm from './digital-currency-form/DigitalCurrencyForm';
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
  updateDigitalCurrency = async (values: DigitalCurrencyFieldValues) => {
    const digitalCurrencyStore = this.props.digitalCurrencyStore!;

    digitalCurrencyStore.updateData({
      binance: values.binance,
      okex: values.okex,
      huobi: values.huobi,
      hopex: values.hopex,
    });
  };

  render() {
    const digitalCurrencyStore = this.props.digitalCurrencyStore!;
    const {
      selectedDate,
      onSelectDate,
      modalVisible,
      closeModal,
      selectedData,
    } = digitalCurrencyStore;

    return (
      <div>
        <Calendar
          mode="year"
          value={selectedDate}
          validRange={[moment('2020-01-01'), moment('2099-12-31')]}
          disabledDate={(currentDate: moment.Moment) => {
            return currentDate.isAfter(moment());
          }}
          onSelect={onSelectDate}
        />
        <Modal
          title={selectedDate.format('YYYY-MM')}
          visible={modalVisible}
          destroyOnClose={true}
          maskClosable={false}
          onCancel={closeModal}
          footer={null}
        >
          <DigitalCurrencyForm
            onCancel={closeModal}
            onConfirm={this.updateDigitalCurrency}
            initialValues={selectedData}
          />
        </Modal>
      </div>
    );
  }
}
