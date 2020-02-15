import { action, computed, observable } from 'mobx';

import BaseStore from './BaseStore';
import { DigitalCurrencyItem } from '../../shared/interfaces/DigitalCurrenty';
import DigitalCurrencyModel from '../models/DigitalCurrencyModel';
import DigitalCurrencyService from '../../server/DigitalCurrencyService';
import { RouterStore } from 'mobx-react-router';
import { message } from 'antd';
import moment from 'moment';

export default class DigitalCurrencyStore extends BaseStore {
  routingStore: RouterStore;

  @observable
  digitalCurrencyData: {
    [key: string]: { [key: string]: DigitalCurrencyModel };
  } = {};

  @observable
  selectedDate: moment.Moment = moment();

  @observable
  modalVisible: boolean = false;

  @computed
  get selectedYear(): string {
    return this.selectedDate.format('YYYY');
  }

  @computed
  get selectedMonth(): string {
    return this.selectedDate.format('MM');
  }

  @computed
  get selectedData(): DigitalCurrencyModel | undefined {
    const matchedData =
      this.digitalCurrencyData[this.selectedYear] &&
      this.digitalCurrencyData[this.selectedYear][this.selectedMonth];
    return matchedData ? matchedData : undefined;
  }

  constructor(
    routingStore: RouterStore,
    private digitalCurrencyService: DigitalCurrencyService,
  ) {
    super();
    this.routingStore = routingStore;
    this.queryDigitalCurrencyData();
  }

  @action.bound
  closeModal() {
    this.modalVisible = false;
  }

  @action.bound
  onSelectDate(date?: moment.Moment) {
    this.selectedDate = date!;

    const lastYear = (date!.year() - 1).toString();
    const lastMonth = moment(
      date!.get('month') === 0 ? 11 : date!.get('month') - 1,
    ).format('MM');

    // 首先检查它的上一个月是否有数据，若没有则提示先填写上个月数据。从2020年1月开始
    if (!(this.selectedYear === '2020' && this.selectedMonth === '01')) {
      let hasDataLastMonth;
      if (this.selectedMonth !== '01') {
        hasDataLastMonth =
          this.digitalCurrencyData[this.selectedYear] &&
          this.digitalCurrencyData[this.selectedYear][lastMonth];
      } else {
        hasDataLastMonth =
          this.digitalCurrencyData[lastYear] &&
          this.digitalCurrencyData[this.selectedYear][lastMonth];
      }

      if (hasDataLastMonth) {
        this.modalVisible = true;
      } else {
        message.warn('请先填写上个月数据');
      }
    } else {
      this.modalVisible = true;
    }
  }

  @action.bound
  onPanelChange(date?: moment.Moment) {
    this.selectedDate = date!;
  }

  @action.bound
  queryDigitalCurrencyData() {
    this.digitalCurrencyData = this.digitalCurrencyService.queryDigitalCurrencyData();
  }

  @action.bound
  updateData(digitalCurrencyItem: Partial<DigitalCurrencyItem>) {
    this.digitalCurrencyService.updateData(
      this.selectedYear,
      this.selectedMonth,
      digitalCurrencyItem,
    );
    this.queryDigitalCurrencyData();
    this.closeModal();
  }

  @action.bound
  startAssetsCurve() {
    this.routingStore.push('digital-currency/assets-curve');
  }
}
