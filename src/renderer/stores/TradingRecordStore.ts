import { action, observable } from 'mobx';

import { RouterStore } from 'mobx-react-router';
import TradingRecordModel from '../models/TradingRecordModel';
import { goBack } from '../common/methods/index';

export default class TradingRecordStore {
  routingStore: RouterStore;

  @observable
  tradingRecordData: TradingRecordModel[] = [];

  @observable
  editingRecord: TradingRecordModel | undefined = undefined;

  @observable
  readOnly: boolean = true;

  constructor(routingStore: RouterStore) {
    this.routingStore = routingStore;
  }

  @action.bound
  queryTradingRecordData() {}

  @action.bound
  addTradingRecord() {
    this.jumpToEditor();
  }

  @action.bound
  updateTradingRecord(record: TradingRecordModel) {
    this.editingRecord = record;
    this.jumpToEditor();
  }

  @action.bound
  deleteTradingRecord() {}

  @action.bound
  jumpToEditor() {
    this.routingStore.push('trading-record/editor');
  }

  @action.bound
  cancelEdit() {
    goBack();
    this.editingRecord = undefined;
  }
}
