import './Liabilities.scss';

import { Button, Calendar, Col, Modal, Row, Statistic } from 'antd';
import { inject, observer } from 'mobx-react';

import { IconFont } from '../../../common/components/icon-font/index';
import LiabilitiesModel from '../../../models/LiabilitiesModal';
import LiabilitiesStore from '../../../stores/LiabilitiesStore';
import { LiabilityFieldValues } from './liability-form/LiabilityForm';
import LiabilityForm from './liability-form/LiabilityForm';
import React from 'react';
import moment from 'moment';

interface LiabilitiesProps {
  liabilitiesStore?: LiabilitiesStore;
}

@inject('liabilitiesStore')
@observer
export default class Liabilities extends React.Component<LiabilitiesProps> {
  updateLiability = (values: LiabilityFieldValues) => {
    const liabilitiesStore = this.props.liabilitiesStore!;

    liabilitiesStore.updateData({
      cash: values.cash,
      debitCard: values.debitCard,
      fund: values.fund,
      lend: values.lend,
      alipay: values.alipay,
      wechatPay: values.wechatPay,
      housingFund: values.housingFund,
      digitalCurrency: values.digitalCurrency,
      otherAsset: values.otherAsset ? values.otherAsset : 0,
      creditCard: values.creditCard,
      borrow: values.borrow,
      antCheckLater: values.antCheckLater,
      otherLiability: values.otherLiability ? values.otherLiability : 0,
      exchangeRate: Number(liabilitiesStore.exchangeRate),
    });
  };

  monthCellRender = (date: moment.Moment) => {
    const { liabilitiesData } = this.props.liabilitiesStore!;
    const year = date.format('YYYY');
    const month = date.format('MM');

    const matchedData: LiabilitiesModel | null =
      liabilitiesData[year] && liabilitiesData[year][month];

    return matchedData ? (
      <Row className="month-cell-container">
        <Col span={12}>
          <Statistic
            title="总计（CNY）"
            value={matchedData.totalAssets.toFixed(2)}
          />
        </Col>
        <Col className="total-overview" span={12}>
          <ul className="assets-overview">
            <li className="asset">
              <IconFont type="icon-cash" />
              <span className="amount">¥ {matchedData.cash.toFixed(2)}</span>
            </li>
            <li className="asset">
              <IconFont type="icon-debit-card" />
              <span className="amount">
                ¥ {matchedData.debitCard.toFixed(2)}
              </span>
            </li>
            <li className="asset">
              <IconFont type="icon-fund-account" />
              <span className="amount">¥ {matchedData.fund.toFixed(2)}</span>
            </li>
            <li className="asset">
              <IconFont type="icon-lend" />
              <span className="amount">¥ {matchedData.lend.toFixed(2)}</span>
            </li>
            <li className="asset">
              <IconFont type="icon-alipay" />
              <span className="amount">¥ {matchedData.alipay.toFixed(2)}</span>
            </li>
            <li className="asset">
              <IconFont type="icon-wechat-pay" />
              <span className="amount">
                ¥ {matchedData.wechatPay.toFixed(2)}
              </span>
            </li>
            <li className="asset">
              <IconFont type="icon-digital-currency-account" />
              <span className="amount">
                $ {matchedData.digitalCurrency.toFixed(2)}
              </span>
            </li>
            <li className="asset">
              <IconFont type="icon-housing-fund" />
              <span className="amount">
                ¥ {matchedData.housingFund.toFixed(2)}
              </span>
            </li>
            <li className="asset">
              <IconFont type="icon-other" />
              <span className="amount">
                ¥ {matchedData.otherAsset.toFixed(2)}
              </span>
            </li>
          </ul>
          <ul className="liabilities-overview">
            <li className="liability">
              <IconFont type="icon-credit-card" />
              <span className="amount">
                ¥ -{matchedData.creditCard.toFixed(2)}
              </span>
            </li>
            <li className="liability">
              <IconFont type="icon-borrow" />
              <span className="amount">¥ -{matchedData.borrow.toFixed(2)}</span>
            </li>
            <li className="liability">
              <IconFont type="icon-ant-check-later" />
              <span className="amount">
                ¥ -{matchedData.antCheckLater.toFixed(2)}
              </span>
            </li>
            <li className="liability">
              <IconFont type="icon-other" />
              <span className="amount">
                ¥ -{matchedData.otherLiability.toFixed(2)}
              </span>
            </li>
          </ul>
        </Col>
      </Row>
    ) : null;
  };

  render() {
    const liabilitiesStore = this.props.liabilitiesStore!;
    const {
      selectedDate,
      selectedData,
      onSelectDate,
      onPanelChange,
      modalVisible,
      closeModal,
      startBalanceSheetCurve,
    } = liabilitiesStore;

    return (
      <div className="liabilities">
        <Calendar
          mode="year"
          value={selectedDate}
          validRange={[moment('2020-01-01'), moment()]}
          disabledDate={(currentDate: moment.Moment) => {
            return currentDate.isAfter(moment());
          }}
          onPanelChange={onPanelChange}
          onSelect={onSelectDate}
          monthCellRender={this.monthCellRender}
        />
        <Modal
          title={selectedDate.format('YYYY-MM')}
          visible={modalVisible}
          destroyOnClose={true}
          maskClosable={false}
          onCancel={closeModal}
          footer={null}
          centered={true}
          bodyStyle={{
            paddingTop: 0,
          }}
        >
          <LiabilityForm
            onCancel={closeModal}
            onConfirm={this.updateLiability}
            initialValues={selectedData}
          />
        </Modal>
        <Button
          className="balance-sheet-curve-btn"
          type="primary"
          onClick={startBalanceSheetCurve}
        >
          资产负债曲线分析
        </Button>
      </div>
    );
  }
}
