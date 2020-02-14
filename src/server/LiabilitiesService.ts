import AppServer from './AppServer';

export default class LiabilitiesService extends AppServer {
  dbItem = this.db.get('liabilities');
}
