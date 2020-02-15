import './Liabilities.scss';

import { Button, Calendar, Modal } from 'antd';
import { inject, observer } from 'mobx-react';

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
    });
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
