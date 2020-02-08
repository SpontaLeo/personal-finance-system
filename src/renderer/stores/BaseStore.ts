import { action, computed, observable } from 'mobx';

import CommonApi from '../apis/CommonApi';
import { commonApi } from '../apis/index';
import { ipcRenderer } from '../common/electron';
import uuid from 'uuid';

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
    console.log('baseStore constructor');
    this.queryExchangeRate();
  }

  sendMessage() {
    ipcRenderer.send('test', uuid());
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
