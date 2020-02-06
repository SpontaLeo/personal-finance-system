import './Fund.scss';

import { Button, Icon, Modal } from 'antd';
import FundForm, { FundItemFieldValues } from './fund-form/FundForm';
import { inject, observer } from 'mobx-react';

import FundModel from '../../../models/FundModel';
import FundStore from '../../../stores/FundStore';
import FundTable from './fund-table/FundTable';
import { ItemActionType } from '../../../constants/interface';
import React from 'react';

interface FundProps {
  fundStore?: FundStore;
}

@inject('fundStore')
@observer
export default class Fund extends React.Component<FundProps> {
  createFundItem = async (values: FundItemFieldValues) => {
    const fundStore = this.props.fundStore!;

    fundStore.createFundItem({
      date: values.date.format('YYYY-MM-DD'),
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
      fundModalVisible,
      fundModalMode,
      closeModal,
      deleteFundItem,
    } = fundStore;

    return (
      <div className="fund">
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={e => openModal()}
        >
          新增记录
        </Button>
        <FundTable
          size="small"
          bordered={true}
          dataSource={investmentRecordList}
          pagination={
            investmentRecordList.length >= 10
              ? {
                  pageSize: 10,
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
                    type="link"
                    onClick={e => openModal(ItemActionType.MODIFY, record)}
                  >
                    <Icon type="edit" />
                  </Button>
                  <Button type="link" onClick={e => deleteFundItem(record.id)}>
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
          visible={fundModalVisible}
          onCancel={closeModal}
          footer={null}
          destroyOnClose={true}
        >
          <FundForm
            onCancel={closeModal}
            onConfirm={
              fundModalMode === 'create'
                ? this.createFundItem
                : this.createFundItem
            }
          />
        </Modal>
      </div>
    );
  }
}
