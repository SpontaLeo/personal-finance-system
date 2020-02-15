import BaseModel from './BaseModel';
import { LiabilitiesItem } from '../../shared/interfaces/Liabilities';

export default class LiabilitiesModel extends BaseModel {
  /** 资产，其中digitalCurrency为USD资产，其它为CNY资产 */
  cash: number;
  debitCard: number;
  fund: number;
  lend: number;
  alipay: number;
  wechatPay: number;
  digitalCurrency: number;
  housingFund: number;
  otherAsset: number;

  /** 负债 */
  creditCard: number;
  borrow: number;
  antCheckLater: number;
  otherLiability: number;

  /** 汇率 */
  exchangeRate: number;

  /** 总计人民币资产 */
  get totalAssets() {
    return (
      this.cash +
      this.debitCard +
      this.fund +
      this.lend +
      this.alipay +
      this.wechatPay +
      this.otherAsset +
      this.housingFund +
      this.digitalCurrency * this.exchangeRate
    );
  }

  /** 总计负债 */
  get totalLiabilities() {
    return (
      this.creditCard + this.borrow + this.antCheckLater + this.otherLiability
    );
  }

  constructor(data: LiabilitiesItem) {
    super(data);
    this.cash = data.cash;
    this.debitCard = data.debitCard;
    this.fund = data.fund;
    this.lend = data.fund;
    this.alipay = data.alipay;
    this.wechatPay = data.wechatPay;
    this.housingFund = data.housingFund;
    this.digitalCurrency = data.digitalCurrency;
    this.otherAsset = data.otherAsset;
    this.creditCard = data.creditCard;
    this.borrow = data.borrow;
    this.antCheckLater = data.antCheckLater;
    this.otherLiability = data.otherLiability;
    this.exchangeRate = data.exchangeRate;
  }
}
