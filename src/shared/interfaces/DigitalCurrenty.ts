import { CommmonField } from './common';

// 美元单位
export interface DigitalCurrencyItem extends CommmonField {
  binance: number;
  okex: number;
  huobi: number;
  hopex: number;
}
