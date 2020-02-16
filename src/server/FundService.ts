import AppServer from './AppServer';
import { FundItem } from '../shared/interfaces/Fund';
import FundModel from '../renderer/models/FundModel';

export default class FundService extends AppServer {
  dbItem = this.db.get('fund');

  queryFundList(): FundModel[] {
    return this.dbItem.value().map((m: FundItem) => new FundModel(m));
  }

  createFundRecord() {}

  updateFundRecord() {}

  deleteFundRecore() {}
}
