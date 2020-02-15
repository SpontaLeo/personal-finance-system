import { CommmonField } from './common';

export interface LiabilitiesItem extends CommmonField {
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
}
