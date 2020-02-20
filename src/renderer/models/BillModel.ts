import BaseModel from './BaseModel';
import { BillItem } from '../../shared/interfaces/Bill';

export default class BillModel extends BaseModel {
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

  constructor(data: BillItem) {
    super(data);
    this.salary = data.salary;
    this.redPacket = data.redPacket;
    this.incomeFromInvestment = data.incomeFromInvestment;
    this.otherIncome = data.otherIncome;
    this.traffic = data.traffic;
    this.food = data.food;
    this.dwell = data.dwell;
    this.entertainment = data.entertainment;
    this.shopping = data.shopping;
    this.medical = data.medical;
    this.education = data.education;
    this.favour = data.favour;
    this.otherExpense = data.otherExpense;
  }
}
