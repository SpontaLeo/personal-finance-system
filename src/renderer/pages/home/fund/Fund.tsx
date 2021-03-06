import './Fund.scss';

import { Button, Icon, Modal, Statistic } from 'antd';
import FundForm, { FundItemFieldValues } from './fund-form/FundForm';
import { inject, observer } from 'mobx-react';

import FundModel from '../../../models/FundModel';
import FundStore from '../../../stores/FundStore';
import FundTable from './fund-table/FundTable';
import { ItemActionType } from '../../../common/constants/interface';
import React from 'react';
import moment from 'moment';

interface FundProps {
  fundStore?: FundStore;
}

@inject('fundStore')
@observer
export default class Fund extends React.Component<FundProps> {
  createFundItem = async (values: FundItemFieldValues) => {
    const fundStore = this.props.fundStore!;

    fundStore.createFundItem({
      date: moment(values.date).format('YYYY-MM-DD'),
      target: values.target,
      amount: values.amount,
      action: values.action,
      price: values.price,
      pe: values.pe ? values.pe : 0,
      pb: values.pb ? values.pb : 0,
      dividendYieldRatio: values.dividendYieldRatio
        ? values.dividendYieldRatio
        : 0,
      remark: values.remark ? values.remark : '',
    });
  };

  updateFundItem = async (values: FundItemFieldValues) => {
    const fundStore = this.props.fundStore!;

    fundStore.updateFundItem({
      date: moment(values.date).format('YYYY-MM-DD'),
      target: values.target,
      amount: values.amount,
      action: values.action,
      price: values.price,
      pe: values.pe ? values.pe : 0,
      pb: values.pb ? values.pb : 0,
      dividendYieldRatio: values.dividendYieldRatio
        ? values.dividendYieldRatio
        : 0,
      remark: values.remark ? values.remark : '',
    });
  };

  render() {
    const fundStore = this.props.fundStore!;
    const {
      investmentRecordList,
      openModal,
      modalVisible,
      fundModalMode,
      closeModal,
      deleteFundItem,
      editingInvestmentRecord,
      totalInvestmentAmount,
    } = fundStore;

    return (
      <div className="fund">
        <div className="fund-top-bar">
          <Button
            type="primary"
            style={{ marginBottom: 16 }}
            onClick={e => openModal()}
          >
            新增记录
          </Button>
          <Statistic
            title="实际已用投资"
            prefix="¥"
            value={totalInvestmentAmount}
            precision={2}
          />
        </div>
        <FundTable
          size="middle"
          bordered={true}
          dataSource={investmentRecordList}
          pagination={
            investmentRecordList.length >= 6
              ? {
                  pageSize: 6,
                }
              : false
          }
          action={[
            {
              title: '操作',
              dataIndex: 'action',
              key: 'action',
              align: 'center',
              render: (text, record: FundModel) => (
                <span>
                  <Button
                    className="update-btn"
                    type="link"
                    onClick={e => openModal(ItemActionType.UPDATE, record)}
                  >
                    <Icon type="edit" />
                  </Button>
                  <Button
                    className="delete-btn"
                    type="link"
                    onClick={e => deleteFundItem(record.id)}
                  >
                    <Icon type="delete" />
                  </Button>
                </span>
              ),
            },
          ]}
        />
        <Modal
          maskClosable={false}
          title={fundModalMode === 'create' ? '新增定投记录' : '编辑定投记录'}
          visible={modalVisible}
          onCancel={closeModal}
          footer={null}
          destroyOnClose={true}
        >
          <FundForm
            onCancel={closeModal}
            onConfirm={
              fundModalMode === 'create'
                ? this.createFundItem
                : this.updateFundItem
            }
            initialValues={editingInvestmentRecord}
          />
        </Modal>
      </div>
    );
  }
}
