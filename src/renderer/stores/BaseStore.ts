import { action, computed, observable } from 'mobx';

import CommonApi from '../apis/CommonApi';
import { commonApi } from '../apis/index';
import { ipcRenderer } from '../common/electron';

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
  sendMessage() {
    ipcRenderer.send('test');
    ipcRenderer.on('test-reply', (event: any, arg: any) => {
      console.log(arg);
    });
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
