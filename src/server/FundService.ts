import AppServer from './AppServer';

export default class FundService extends AppServer {
  dbItem = this.db.get('fund');
}
