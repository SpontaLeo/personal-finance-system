import { action, computed, observable } from 'mobx';

import { DigitalCurrencyItem } from '../../shared/interfaces/DigitalCurrenty';
import DigitalCurrencyModel from '../models/DigitalCurrencyModel';
import { generateUUID } from '../../shared/common/methods/index';
import moment from 'moment';

export default class DigitalCurrencyStore {
  @observable
  digitalCurrencyData: { [key: string]: DigitalCurrencyModel } = {
    '2020-01': {
      id: generateUUID(),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      binance: 0,
      okex: 0,
      huobi: 0,
      hopex: 0,
      total: 0,
    },
    '2020-02': {
      id: generateUUID(),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      binance: 2000,
      okex: 800,
      huobi: 1700,
      hopex: 200,
      total: 4700,
    },
  };

  @observable
  selectedDate: moment.Moment = moment();

  @observable
  modalVisible: boolean = false;

  @computed
  get selectedData(): DigitalCurrencyModel | undefined {
    const matchedData = this.digitalCurrencyData[
      this.selectedDate.format('YYYY-MM')
    ];
    return matchedData ? matchedData : undefined;
  }

  @action.bound
  closeModal() {
    this.modalVisible = false;
  }

  @action.bound
  onSelectDate(date?: moment.Moment) {
    this.selectedDate = date!;
    this.modalVisible = true;
  }

  @action.bound
  updateData(digitalCurrencyItem: Partial<DigitalCurrencyItem>) {
    this.digitalCurrencyData[
      this.selectedDate.format('YYYY-MM')
    ] = new DigitalCurrencyModel(
      Object.assign(digitalCurrencyItem, {
        id: generateUUID(),
        createdAt: moment().toString(),
        updatedAt: moment().toString(),
      }) as DigitalCurrencyItem,
    );

    this.closeModal();
  }
}
