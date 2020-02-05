import BaseModel from './BaseModel';
import { FundItem } from '../../shared/fund';
import { computed } from 'mobx';
import moment from 'moment';

export default class FundModel extends BaseModel {
  time: moment.Moment;
  target: string;
  amount: number;
  actionType: 'buy' | 'sell';
  price: number;
  pe: number;
  pb: number;
  dividendYieldRatio: number;
  ep: number;

  @computed
  get action(): string {
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
    this.time = data.time;
    this.target = data.target;
    this.amount = data.amount;
    this.actionType = data.actionType;
    this.price = data.price;
    this.pe = data.pe;
    this.pb = data.pb;
    this.dividendYieldRatio = data.dividendYieldRatio;
    this.ep = data.ep;
  }
}
