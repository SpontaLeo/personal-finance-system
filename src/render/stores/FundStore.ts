import moment from 'moment';
import { observable } from 'mobx';

export default class FundStore {
  @observable
  investmentRecordList: any[] = [];

  constructor() {
    this.investmentRecordList = [
      {
        key: '1',
        time: moment('2020-01-01').format('YYYY-MM-DD'),
        target: '华夏300ETF',
        amount: 1000,
        action: '买入',
        price: 2,
        PE: 10,
        PB: 5,
        'dividend-yield-ratio': 3,
        EP: 10,
      },
    ];
  }
}
