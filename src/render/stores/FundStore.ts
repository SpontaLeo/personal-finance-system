import FundModel from '../models/FundModel';
import moment from 'moment';
import { observable } from 'mobx';

export default class FundStore {
  @observable
  investmentRecordList: any[] = [];

  constructor() {
    this.investmentRecordList = [
      new FundModel({
        id: 'dddfsf-dfdfdf-sadfasf',
        time: moment().format('YYYY-MM-DD'),
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD'),
        target: '华夏300',
        amount: 1000,
        actionType: 'buy',
        price: 2.41,
        pe: 20,
        pb: 1.2,
        dividendYieldRatio: 10,
      }),
    ];
    // this.investmentRecordList = [FundModel.mock()];
  }
}
