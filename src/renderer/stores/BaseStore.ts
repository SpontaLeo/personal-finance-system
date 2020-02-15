import { action, computed, observable } from 'mobx';

import CommonApi from '../apis/CommonApi';
import { commonApi } from '../apis/index';
import { exchangeRateService } from '../../server/index';

export default class BaseStore {
  commonApi: CommonApi = commonApi;

  /**
   * originRate
   */
  @observable
  rate: number = 0;

  @computed
  get exchangeRate() {
    return this.rate.toFixed(2);
  }

  constructor() {
    this.queryExchangeRate();
  }

  updateExchangeRate() {
    exchangeRateService.updateExchangeRate(this.rate);
  }

  @action.bound
  async queryExchangeRate() {
    this.rate = await this.commonApi.queryExchangeRate();
    this.updateExchangeRate();
  }

  @action.bound
  saveExchangeRate(value?: number) {
    this.rate = value ? value : this.rate;
    this.updateExchangeRate();
  }
}
