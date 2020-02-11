import './DigitalCurrency.scss';

import { Button, Calendar, Col, Modal, Row, Statistic } from 'antd';
import { inject, observer } from 'mobx-react';

import { DigitalCurrencyFieldValues } from './digital-currency-form/DigitalCurrencyForm';
import DigitalCurrencyForm from './digital-currency-form/DigitalCurrencyForm';
import DigitalCurrencyModel from '../../../models/DigitalCurrencyModel';
import DigitalCurrencyStore from '../../../stores/DigitalCurrencyStore';
import { IconFont } from '../../../common/components/icon-font/index';
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

  monthCellRender = (date: moment.Moment) => {
    const digitalCurrencyStore = this.props.digitalCurrencyStore!;

    const matchedData: DigitalCurrencyModel | null =
      digitalCurrencyStore.digitalCurrencyData[date.format('YYYY')] &&
      digitalCurrencyStore.digitalCurrencyData[date.format('YYYY')][
        date.format('MM')
      ];

    return matchedData ? (
      <Row>
        <Col span={12}>
          <Statistic title="总计（USD）" value={matchedData.total.toFixed(2)} />
        </Col>
        <Col span={12}>
          <ul className="account-overview">
            <li className="account">
              <IconFont type="icon-binance" />
              <span className="amount">{matchedData.binance.toFixed(2)}</span>
            </li>
            <li className="account">
              <IconFont type="icon-okex" />
              <span className="amount">{matchedData.okex.toFixed(2)}</span>
            </li>
            <li className="account">
              <IconFont type="icon-huobi" />
              <span className="amount">{matchedData.huobi.toFixed(2)}</span>
            </li>
            <li className="account">
              <IconFont type="icon-hopex" />
              <span className="amount">{matchedData.hopex.toFixed(2)}</span>
            </li>
          </ul>
        </Col>
      </Row>
    ) : null;
  };

  render() {
    const digitalCurrencyStore = this.props.digitalCurrencyStore!;
    const {
      selectedDate,
      onSelectDate,
      modalVisible,
      closeModal,
      selectedData,
      startAssetsCurve,
      onPanelChange,
    } = digitalCurrencyStore;

    return (
      <div className="digital-currency">
        <Calendar
          mode="year"
          value={selectedDate}
          validRange={[moment('2020-01-01'), moment('2099-12-31')]}
          // disabledDate={(currentDate: moment.Moment) => {
          //   return currentDate.isAfter(moment());
          // }}
          onPanelChange={onPanelChange}
          monthCellRender={this.monthCellRender}
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
        <Button
          className="assets-curve-btn"
          type="primary"
          onClick={startAssetsCurve}
        >
          资金曲线分析
        </Button>
      </div>
    );
  }
}
