import AppServer from './AppServer';
import { FundItem } from '../shared/interfaces/Fund';
import FundModel from '../renderer/models/FundModel';
import moment from 'moment';

export default class FundService extends AppServer {
  dbItem = this.db.get('fund');

  queryInvestmentRecordList(): FundModel[] {
    return this.dbItem.value().map((record: FundItem) => new FundModel(record));
  }

  createFundRecord(data: Partial<FundItem>) {
    this.dbItem
      .push(
        Object.assign(data, {
          id: this.generateUUID(),
          createdAt: moment().toString(),
          updatedAt: moment().toString(),
        }) as FundItem,
      )
      .write();
  }

  updateFundRecord(id: string, data: Partial<FundItem>) {
    this.dbItem
      .find({ id })
      .assign(Object.assign(data, { updatedAt: moment().toString() }))
      .write();
  }

  deleteFundRecore(id: string) {
    this.dbItem.remove({ id }).write();
  }
}
