import AppServer from './AppServer';
import { DigitalCurrencyItem } from '../shared/interfaces/DigitalCurrenty';
import DigitalCurrencyModel from '../renderer/models/DigitalCurrencyModel';
import moment from 'moment';

export default class DigitalCurrencyService extends AppServer {
  // 对应的db字段实例
  dbItem = this.db.get('digital-currency');

  queryDigitalCurrencyData(): {
    [key: string]: { [key: string]: DigitalCurrencyModel };
  } {
    const originData = this.dbItem.value();

    Object.keys(originData).forEach(od => {
      Object.keys(originData[od]).forEach(d => {
        const data: DigitalCurrencyItem = originData[od][d];
        originData[od][d] = new DigitalCurrencyModel(data);
      });
    });

    return originData;
  }

  updateData(year: string, month: string, data: Partial<DigitalCurrencyItem>) {
    const hasYearData = this.dbItem.has(year).value();
    if (hasYearData) {
      const hasMonthData = this.dbItem
        .get(year)
        .has(month)
        .value();
      if (hasMonthData) {
        const prevData = this.dbItem
          .get(year)
          .get(month)
          .value();

        this.dbItem
          .get(year)
          .update(
            month,
            Object.assign(prevData, data, {
              updatedAt: moment().toString(),
            }) as DigitalCurrencyItem,
          )
          .write();
      } else {
        this.dbItem
          .get(year)
          .set(
            month,
            Object.assign(data, {
              id: this.generateUUID(),
              createdAt: moment().toString(),
              updatedAt: moment().toString(),
            }) as DigitalCurrencyItem,
          )
          .write();
      }
    } else {
      this.dbItem.set(year, {}).write();
      this.dbItem
        .get(year)
        .set(
          month,
          Object.assign(data, {
            id: this.generateUUID(),
            createdAt: moment().toString(),
            updatedAt: moment().toString(),
          }) as DigitalCurrencyItem,
        )
        .write();
    }
  }
}
