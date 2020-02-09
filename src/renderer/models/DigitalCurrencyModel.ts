import BaseModel from './BaseModel';
import { DigitalCurrencyItem } from '../../shared/interfaces/DigitalCurrenty';

export default class DigitalCurrencyModel extends BaseModel {
  binance: number;
  okex: number;
  huobi: number;
  hopex: number;

  get total() {
    return this.binance + this.okex + this.huobi + this.hopex;
  }

  constructor(data: DigitalCurrencyItem) {
    super(data);
    this.binance = data.binance;
    this.okex = data.okex;
    this.huobi = data.huobi;
    this.hopex = data.hopex;
  }
}
