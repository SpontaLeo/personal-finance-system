import BaseModel from './BaseModel';
import { FundItem } from '../../shared/interfaces/Fund';

export default class FundModel extends BaseModel {
  date: string;
  target: string;
  amount: number;
  action: 'buy' | 'sell';
  price: number;
  pe: number;
  pb: number;
  dividendYieldRatio: number;
  remark: string;

  get ep(): number {
    return this.pe !== 0 ? (1 / this.pe) * 100 : 0;
  }

  get actionType(): string {
    switch (this.action) {
      case 'buy':
        return '买入';
      case 'sell':
        return '卖出';
      default:
        return '买入';
    }
  }

  constructor(data: FundItem) {
    super(data);
    this.date = data.date;
    this.target = data.target;
    this.amount = data.amount;
    this.action = data.action;
    this.price = data.price;
    this.pe = data.pe;
    this.pb = data.pb;
    this.dividendYieldRatio = data.dividendYieldRatio;
    this.remark = data.remark;
  }
}
