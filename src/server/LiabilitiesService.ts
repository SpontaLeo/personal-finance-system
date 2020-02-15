import AppServer from './AppServer';
import { LiabilitiesItem } from '../shared/interfaces/Liabilities';
import LiabilitiesModel from '../renderer/models/LiabilitiesModal';
import moment from 'moment';

export default class LiabilitiesService extends AppServer {
  dbItem = this.db.get('liabilities');

  queryDigitalCurrencyData(): {
    [key: string]: { [key: string]: LiabilitiesModel };
  } {
    const originData = this.dbItem.value();

    Object.keys(originData).forEach(od => {
      Object.keys(originData[od]).forEach(d => {
        const data: LiabilitiesItem = originData[od][d];
        console.log(data);
        originData[od][d] = new LiabilitiesModel(data);
      });
    });

    return originData;
  }

  updateData(year: string, month: string, data: Partial<LiabilitiesItem>) {
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
            }) as LiabilitiesItem,
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
            }) as LiabilitiesItem,
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
          }) as LiabilitiesItem,
        )
        .write();
    }
  }
}
