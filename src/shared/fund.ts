import { CommmonField } from './common';
import moment from 'moment';

export interface FundItem extends CommmonField {
  time: moment.Moment;
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
  // 盈利收益率——市盈率的倒数
  ep: number;
}
