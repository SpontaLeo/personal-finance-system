import { action, observable } from 'mobx';

import { ItemActionType } from '../common/constants/interface';
import { RouterStore } from 'mobx-react-router';
import { TradingRecordItem } from '../../shared/interfaces/TradingRecord';
import TradingRecordModel from '../models/TradingRecordModel';
import TradingRecordService from '../../server/TradingRecordService';
import { goBack } from '../common/methods/index';
import moment from 'moment';

export default class TradingRecordStore {
  routingStore: RouterStore;

  @observable
  actionType: ItemActionType = ItemActionType.CREATE;

  @observable
  tradingRecordData: TradingRecordModel[] = [];

  @observable
  editingRecord: TradingRecordModel | undefined = undefined;

  @observable
  readOnly: boolean = true;

  constructor(
    routingStore: RouterStore,
    private tradingRecordService: TradingRecordService,
  ) {
    this.routingStore = routingStore;
    this.queryTradingRecordData();
  }

  @action.bound
  queryTradingRecordData() {
    this.tradingRecordData = this.tradingRecordService
      .queryTradingRecordData()
      .sort((prev: TradingRecordModel, cur: TradingRecordModel) => {
        // 按照更新时间由最新到最早排序
        if (moment(prev.updatedAt).isAfter(moment(cur.updatedAt))) {
          return -1;
        } else {
          return 1;
        }
      });
  }

  @action.bound
  createTradingRecord(data: Partial<TradingRecordItem>) {
    this.tradingRecordService.createTradingRecord(data);
    this.queryTradingRecordData();
    this.endEdit();
  }

  @action.bound
  updateTradingRecord(data: Partial<TradingRecordItem>) {
    this.tradingRecordService.updateTradingRecord(this.editingRecord!.id, data);
    this.queryTradingRecordData();
    this.endEdit();
  }

  @action.bound
  deleteTradingRecord(id: string) {
    this.tradingRecordService.deleteTradingRecord(id);
    this.queryTradingRecordData();
  }

  @action.bound
  jumpToEditor(
    type: ItemActionType = ItemActionType.CREATE,
    record?: TradingRecordModel,
  ) {
    this.actionType = type;
    this.editingRecord = record;
    this.routingStore.push('trading-record/editor');
  }

  @action.bound
  endEdit() {
    this.actionType = ItemActionType.CREATE;
    this.editingRecord = undefined;
    goBack();
  }
}
