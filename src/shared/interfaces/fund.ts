import { CommmonField } from './common';

export interface FundItem extends CommmonField {
  time: string;
  target: string;
  amount: number;
  actionType: 'buy' | 'sell';
  price: number;
  // 市盈率
  pe: number;
  // 市净率
  pb: number;
  // 股息率
  dividendYieldRatio: number;
}
