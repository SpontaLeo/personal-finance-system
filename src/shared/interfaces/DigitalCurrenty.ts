import { CommonField } from './common';

// 美元单位
export interface DigitalCurrencyItem extends CommonField {
  binance: number;
  okex: number;
  huobi: number;
  hopex: number;
}
