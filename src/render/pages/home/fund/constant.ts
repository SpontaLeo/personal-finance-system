import { NounDescriptionItem } from './interface';

type Alignment = 'center' | 'left' | 'right' | undefined;

export const FUNDTABLECOLUMNS = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    align: 'center' as Alignment,
  },
  {
    title: '标的',
    dataIndex: 'target',
    key: 'target',
    align: 'center' as Alignment,
  },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
    align: 'center' as Alignment,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center' as Alignment,
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    align: 'center' as Alignment,
  },
  {
    title: '市盈率(静)(PE)',
    dataIndex: 'PE',
    key: 'PE',
    align: 'center' as Alignment,
  },
  {
    title: '市净率(PB)',
    dataIndex: 'PB',
    key: 'PB',
    align: 'center' as Alignment,
  },
  {
    title: '股息率(%)',
    dataIndex: 'dividend-yield-ratio',
    key: 'dividend-yield-ratio',
    align: 'center' as Alignment,
  },
  {
    title: '盈利收益率(%)',
    dataIndex: 'EP',
    key: 'EP',
    align: 'center' as Alignment,
  },
];

export const NounDescription: NounDescriptionItem[] = [
  {
    title: '公司市值',
    abbr: 'P',
    description: '公司市值',
  },
  {
    title: '公司盈利',
    abbr: 'E',
    description: '公司盈利',
  },
  {
    title: '市盈率（PE）',
    abbr: 'PE',
    formula: 'PE = P/E',
    description: '分为静态市盈率、动态市盈率和滚动市盈率。',
  },
];
