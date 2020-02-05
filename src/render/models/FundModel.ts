import BaseModel from './BaseModel';
import { FundItem } from '../../shared/interfaces/fund';
import moment from 'moment';

export default class FundModel extends BaseModel {
  time: string;
  target: string;
  amount: number;
  actionType: 'buy' | 'sell';
  price: number;
  pe: number;
  pb: number;
  dividendYieldRatio: number;

  get ep(): number {
    return (1 / this.pe) * 100;
  }

  get action(): string {
    switch (this.actionType) {
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
    this.time = data.time;
    this.target = data.target;
    this.amount = data.amount;
    this.actionType = data.actionType;
    this.price = data.price;
    this.pe = data.pe;
    this.pb = data.pb;
    this.dividendYieldRatio = data.dividendYieldRatio;
  }
}
