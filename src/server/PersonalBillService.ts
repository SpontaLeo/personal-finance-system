import AppServer from './AppServer';
import { BillItem } from '../shared/interfaces/Bill';
import BillModel from '../renderer/models/BillModel';

export const originBillData: Partial<BillItem> = {
  salary: 0,
  redPacket: 0,
  incomeFromInvestment: 0,
  otherIncome: 0,

  traffic: 0,
  food: 0,
  dwell: 0,
  entertainment: 0,
  shopping: 0,
  medical: 0,
  education: 0,
  favour: 0,
  otherExpense: 0,
};

export default class PersonalBillService extends AppServer {
  dbItem = this.db.get('personal-bill');

  queryPersonalBillData(): {
    [key: string]: { [key: string]: BillModel };
  } {
    return {};
  }

  /**
   * 更新时若无该月数据则合并后新增
   */
  updatePersonalBillData() {}
}
