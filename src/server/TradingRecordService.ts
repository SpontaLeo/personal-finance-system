import AppServer from './AppServer';
import { TradingRecordItem } from '../shared/interfaces/TradingRecord';
import TradingRecordModel from '../renderer/models/TradingRecordModel';
import moment from 'moment';

export default class TradingRecordService extends AppServer {
  dbItem = this.db.get('trading-record');

  queryTradingRecordData(): TradingRecordModel[] {
    return this.dbItem
      .value()
      .map((record: TradingRecordItem) => new TradingRecordModel(record));
  }

  queryTradingRecordByCategory(category: string): TradingRecordModel[] {
    // 根据类型筛选
    return [];
  }

  fuzzyQueryTradingRecordByTitle(
    fuzzyQueryTitle: string,
  ): TradingRecordModel[] {
    // 根据标题模糊查询
    return [];
  }

  createTradingRecord(data: Partial<TradingRecordItem>) {
    this.dbItem
      .push(
        Object.assign(data, {
          id: this.generateUUID(),
          createdAt: moment().toString(),
          updatedAt: moment().toString(),
        }) as TradingRecordItem,
      )
      .write();
  }

  updateTradingRecord(id: string, data: Partial<TradingRecordItem>) {
    this.dbItem
      .find({ id })
      .assign(Object.assign(data, { updatedAt: moment().toString() }))
      .write();
  }

  deleteTradingRecord(id: string) {
    this.dbItem.remove({ id }).write();
  }
}
