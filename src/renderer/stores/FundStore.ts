import { action, observable } from 'mobx';

import { FundItem } from '../../shared/interfaces/Fund';
import FundModel from '../models/FundModel';
import { ItemActionType } from '../common/constants/interface';
import moment from 'moment';

export default class FundStore {
  @observable
  investmentRecordList: FundModel[] = [];

  @observable
  editingInvestmentRecord?: FundModel = undefined;

  @observable
  modalVisible: boolean = false;

  @observable
  fundModalMode: ItemActionType = ItemActionType.CREATE;

  constructor() {
    this.investmentRecordList = [
      new FundModel({
        id: 'dfufadsfdsjfklsjfdljfa',
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
    this.modalVisible = true;
    this.fundModalMode = mode;
    selectedRecord && (this.editingInvestmentRecord = selectedRecord);
  }

  @action.bound
  closeModal() {
    this.modalVisible = false;
    // dataInit
    this.fundModalMode = ItemActionType.CREATE;
    this.editingInvestmentRecord = undefined;
  }

  @action.bound
  createFundItem(fundItem: Partial<FundItem>) {
    this.investmentRecordList.push(
      new FundModel(
        Object.assign(fundItem, {
          id: 'sfdsaflgjdlkghlahglaksvldskgndslgno',
          createdAt: moment().toString(),
          updatedAt: moment().toString(),
        }) as FundItem,
      ),
    );

    this.closeModal();
  }

  @action.bound
  updateFundItem(fundItem: Partial<FundItem>) {
    const index = this.investmentRecordList.findIndex(
      record => record.id === this.editingInvestmentRecord!.id,
    );
    const updatedRecord = Object.assign(
      this.editingInvestmentRecord!,
      fundItem,
    ) as FundModel;

    this.investmentRecordList.splice(index, 1, updatedRecord);

    this.closeModal();
  }

  @action.bound
  deleteFundItem(id: string) {
    const index = this.investmentRecordList.findIndex(e => e.id === id);
    this.investmentRecordList.splice(index);
  }
}
