import './FundTable.scss';

import { Button, Icon, Popover, Table } from 'antd';
import { ColumnProps, TableProps } from 'antd/lib/table';

import FundModel from '../../../../models/FundModel';
import React from 'react';
import { observer } from 'mobx-react';

type TableColumns = ColumnProps<FundModel>[];
const defaultColumns: TableColumns = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
  },
  {
    title: '标的',
    dataIndex: 'target',
    key: 'target',
    align: 'center',
  },
  {
    title: '金额(CNY)',
    dataIndex: 'amount',
    key: 'amount',
    align: 'center',
    render: (text, record: FundModel) => (
      <span>{record.amount.toFixed(2)}</span>
    ),
  },
  {
    title: '操作',
    dataIndex: 'actionType',
    key: 'actionType',
    align: 'center',
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
    render: (text, record: FundModel) => <span>{record.price.toFixed(2)}</span>,
  },
  {
    title: '市盈率(静)(PE)',
    dataIndex: 'pe',
    key: 'pe',
    align: 'center',
    render: (text, record: FundModel) => (
      <span>{record.pe !== 0 ? record.pe.toFixed(2) : '/'}</span>
    ),
  },
  {
    title: '市净率(PB)',
    dataIndex: 'pb',
    key: 'pb',
    align: 'center',
    render: (text, record: FundModel) => (
      <span>{record.pe !== 0 ? record.pb.toFixed(2) : '/'}</span>
    ),
  },
  {
    title: '股息率(%)',
    dataIndex: 'dividendYieldRatio',
    key: 'dividendYieldRatio',
    align: 'center',
    render: (text, record: FundModel) => (
      <span>
        {record.dividendYieldRatio ? record.dividendYieldRatio.toFixed(2) : '/'}
      </span>
    ),
  },
  {
    title: '盈利收益率(%)',
    dataIndex: 'ep',
    key: 'ep',
    align: 'center',
    render: (text, record: FundModel) => (
      <span>{record.ep ? record.ep.toFixed(2) : '/'}</span>
    ),
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    align: 'center',
    render: (text, record: FundModel) => (
      <span>
        {record.remark !== '' ? (
          <Popover
            content={record.remark}
            trigger="click"
            overlayStyle={{
              maxWidth: '70vw',
            }}
          >
            <Button type="link">
              <Icon type="eye" />
            </Button>
          </Popover>
        ) : (
          '/'
        )}
      </span>
    ),
  },
];

interface FundTableProps extends TableProps<FundModel> {
  action?: TableColumns;
}

const FundTable: React.StatelessComponent<FundTableProps> = ({
  dataSource,
  columns,
  action,
  ...rest
}) => {
  let finalColumns: TableColumns;
  if (!!columns && !action) {
    finalColumns = columns;
  } else {
    finalColumns = [...defaultColumns, ...(action || [])];
  }

  return (
    <Table
      columns={finalColumns}
      dataSource={dataSource ? dataSource : []}
      rowKey={r => r.id}
      {...rest}
    />
  );
};

export default observer(FundTable);
