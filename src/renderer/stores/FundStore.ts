import { action, observable } from 'mobx';

import { FundItem } from '../../shared/interfaces/fund';
import FundModel from '../models/FundModel';
import { ItemActionType } from '../constants/interface';
import { generateUUID } from '../../shared/methods/index';
import moment from 'moment';

export default class FundStore {
  @observable
  investmentRecordList: FundModel[] = [];

  @observable
  editingInvestmentRecord?: FundModel = undefined;

  @observable
  fundModalVisible: boolean = false;

  @observable
  fundModalMode: ItemActionType = ItemActionType.CREATE;

  constructor() {
    this.investmentRecordList = [
      new FundModel({
        id: generateUUID(),
        date: moment().format('YYYY-MM-DD'),
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD'),
        target: '华夏300',
        amount: 1000,
        action: 'buy',
        price: 2.41,
        pe: 20,
        pb: 1.2,
        dividendYieldRatio: 10,
        remark:
          '占位符 占位符 占位符 占位符 占位符 占位符 占位符 占位符 占位符 占位符 占位符 占位符 占位符 占位符 占位符 占位符 占位符 占位符 占位符 占位符 ',
      }),
    ];
  }

  @action.bound
  openModal(
    mode: ItemActionType = ItemActionType.CREATE,
    selectedRecord?: FundModel,
  ) {
    this.fundModalVisible = true;
    this.fundModalMode = mode;
    selectedRecord && (this.editingInvestmentRecord = selectedRecord);
    console.log(this.editingInvestmentRecord);
  }

  @action.bound
  closeModal() {
    this.fundModalVisible = false;
    // dataInit
    this.fundModalMode = ItemActionType.CREATE;
    this.editingInvestmentRecord = undefined;
  }

  @action.bound
  createFundItem(fundItem: Partial<FundItem>) {
    this.investmentRecordList.push(
      new FundModel(
        Object.assign(fundItem, {
          id: generateUUID(),
          createdAt: moment().toString(),
          updatedAt: moment().toString(),
        }) as FundItem,
      ),
    );
    this.closeModal();
  }

  @action.bound
  updateFundItem(fundItem: FundModel) {}

  @action.bound
  deleteFundItem(id: string) {
    // 占位
    const index = this.investmentRecordList.findIndex(e => e.id === id);
    this.investmentRecordList.splice(index);
  }
}
