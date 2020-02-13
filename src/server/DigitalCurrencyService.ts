import AppServer from './AppServer';
import { DigitalCurrencyItem } from '../shared/interfaces/DigitalCurrenty';
import moment from 'moment';

export default class DigitalCurrencyService extends AppServer {
  // 对应的db字段实例
  dbItem = this.db.get('digital-currency');

  queryDigitalCurrencyList() {
    return {
      '2020': {
        '01': {
          id: this.generateUUID(),
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          binance: 1600,
          okex: 750,
          huobi: 1400,
          hopex: 180,
          total: 3930,
        },
      },
    };
  }

  updateData(
    year: string,
    month: string,
    data: Partial<DigitalCurrencyItem>,
    id?: string,
  ) {
    if (id) {
    } else {
      const hasYearData = this.dbItem.has(year).value();
      if (hasYearData) {
        const hasMonthData = this.dbItem
          .has(year)
          .has(month)
          .value();

        if (hasMonthData) {
          this.dbItem
            .get(year)
            .update(month, data)
            .write();
        } else {
          this.dbItem
            .get(year)
            .set(`${month}`, data)
            .write();
        }
      } else {
        this.dbItem
          .set(year, {
            month: data,
          })
          .write();
      }
    }
    console.log(year, month, data);
  }
}
