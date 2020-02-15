import AppServer from './AppServer';

export default class TradingRecordService extends AppServer {
  dbItem = this.db.get('trading-record');
}
