import './FundTable.scss';

import { ColumnProps, TableProps } from 'antd/lib/table';

import FundModel from '../../../../models/FundModel';
import React from 'react';
import { Table } from 'antd';
import { observer } from 'mobx-react';

type TableColumns = ColumnProps<FundModel>[];
const defaultColumns: TableColumns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
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
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
  },
  {
    title: '市盈率(静)(PE)',
    dataIndex: 'pe',
    key: 'pe',
    align: 'center',
  },
  {
    title: '市净率(PB)',
    dataIndex: 'pb',
    key: 'pb',
    align: 'center',
  },
  {
    title: '股息率(%)',
    dataIndex: 'dividendYieldRatio',
    key: 'dividendYieldRatio',
    align: 'center',
  },
  {
    title: '盈利收益率(%)',
    dataIndex: 'ep',
    key: 'ep',
    align: 'center',
    render: (text, record: FundModel) => <span>{record.ep.toFixed(2)}</span>,
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
      dataSource={dataSource ? dataSource.slice() : []}
      rowKey={r => r.id}
      {...rest}
    />
  );
};

export default observer(FundTable);
