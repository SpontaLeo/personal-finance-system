import { CommonField } from './common';

export interface BillItem extends CommonField {
  /**
   * 收入项
   */
  salary: number;
  redPacket: number;
  // 投资收益
  incomeFromInvestment: number;
  otherIncome: number;

  /**
   * 支出项
   */
  traffic: number;
  food: number;
  // 居住
  dwell: number;
  entertainment: number;
  shopping: number;
  // 医疗
  medical: number;
  education: number;
  // 人情
  favour: number;
  otherExpense: number;
}
