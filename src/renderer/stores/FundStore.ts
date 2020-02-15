import { action, observable } from 'mobx';

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

  constructor(private fundService: FundService) {}

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
