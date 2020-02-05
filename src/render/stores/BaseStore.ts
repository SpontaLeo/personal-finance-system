import { action, computed, observable } from 'mobx';

import CommonApi from '../../shared/apis/CommonApi';
import { commonApi } from '../../shared/apis/index';

export default class BaseStore {
  commonApi: CommonApi = commonApi;

  /**
   * originRate
   */
  @observable
  rate: number = 7;

  @computed
  get exchangeRate() {
    return this.rate.toFixed(2);
  }

  constructor() {
    this.queryExchangeRate();
  }

  @action.bound
  async queryExchangeRate() {
    this.rate = await this.commonApi.getExchangeRate();
  }

  @action.bound
  saveExchangeRate(value?: number) {
    this.rate = value ? value : this.rate;
  }
}