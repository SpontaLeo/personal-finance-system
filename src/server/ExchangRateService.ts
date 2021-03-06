import AppServer from './AppServer';

export default class ExchangeRateService extends AppServer {
  dbItem = this.db.get('exchange-rate');

  queryExchangeRate(): number {
    return this.dbItem.value();
  }

  updateExchangeRate(rate: number) {
    this.db.update('exchange-rate', (v: number) => (v = rate)).write();
  }
}
