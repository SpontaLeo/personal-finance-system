import AppServer from './AppServer';

export default class PersonalBillService extends AppServer {
  dbItem = this.db.get('personal-bill');
}
