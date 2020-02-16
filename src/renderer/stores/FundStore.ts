import { action, computed, observable } from 'mobx';

import { FundItem } from '../../shared/interfaces/Fund';
import FundModel from '../models/FundModel';
import FundService from '../../server/FundService';
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

  @computed
  get totalInvestmentAmount(): number {
    return this.investmentRecordList
      .map(record => (record.action === 'buy' ? record.amount : -record.amount))
      .reduce((prev, cur) => prev + cur, 0);
  }

  constructor(private fundService: FundService) {
    this.queryInvestmentRecordList();
  }

  @action.bound
  queryInvestmentRecordList() {
    this.investmentRecordList = this.fundService
      .queryInvestmentRecordList()
      .sort((prev: FundModel, cur: FundModel) => {
        if (moment(prev.date).isBefore(moment(cur.date))) {
          return -1;
        } else {
          return 1;
        }
      });
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
    this.fundService.createFundRecord(fundItem);
    this.queryInvestmentRecordList();
    this.closeModal();
  }

  @action.bound
  updateFundItem(fundItem: Partial<FundItem>) {
    this.fundService.updateFundRecord(
      this.editingInvestmentRecord!.id,
      fundItem,
    );
    this.queryInvestmentRecordList();
    this.closeModal();
  }

  @action.bound
  deleteFundItem(id: string) {
    this.fundService.deleteFundRecore(id);
    this.queryInvestmentRecordList();
  }
}
