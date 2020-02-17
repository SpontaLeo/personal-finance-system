import { KtItem } from './interface';

export interface TradingRecordKtItem extends KtItem {
  color: string;
}

export const TradingCategory: TradingRecordKtItem[] = [
  {
    key: 'stock',
    title: '股票',
    color: '#F00',
  },
  {
    key: 'digital-currenty',
    title: '数字货币',
    color: '#ED9023',
  },
  {
    key: 'stock-fund',
    title: '股票型基金',
    color: '#2DB7F5',
  },
  {
    key: 'bound-fund',
    title: '债券型基金',
    color: '#87D068',
  },
  {
    key: 'index-fund',
    title: '指数型基金',
    color: '#108EE9',
  },
  {
    key: 'futures',
    title: '期货',
    color: '#F78AE0',
  },
];
