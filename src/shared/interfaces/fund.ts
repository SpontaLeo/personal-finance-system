import { CommmonField } from './common';

export interface FundItem extends CommmonField {
  date: string;
  target: string;
  amount: number;
  action: 'buy' | 'sell';
  price: number;
  // 市盈率
  pe: number;
  // 市净率
  pb: number;
  // 股息率
  dividendYieldRatio: number;
  remark: string;
}
