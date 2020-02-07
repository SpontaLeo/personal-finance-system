import BaseApi from './BaseApi';
import { ExchangeRateResponse } from './interface';
import { exchangeRateApi } from './constants';

export default class CommonApi extends BaseApi {
  async getExchangeRate(): Promise<number> {
    const res = await this.get<ExchangeRateResponse>({
      url: exchangeRateApi,
    });
    let rate: number;
    if (res.success === '1') {
      rate = Number(res.result!.rate);
    } else {
      // 从本地数据库抓取历史数据
      rate = 7;
    }
    return rate;
  }
}
