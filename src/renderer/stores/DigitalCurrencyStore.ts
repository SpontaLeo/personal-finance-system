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
  get selectedData(): DigitalCurrencyModel | undefined {
    const matchedData =
      this.digitalCurrencyData[this.selectedDate.format('YYYY')] &&
      this.digitalCurrencyData[this.selectedDate.format('YYYY')][
        this.selectedDate.format('MM')
      ];
    return matchedData ? matchedData : undefined;
  }

  constructor(
    routingStore: RouterStore,
    private digitalCurrencyService: DigitalCurrencyService,
  ) {
    super();
    this.routingStore = routingStore;
    this.digitalCurrencyData = this.digitalCurrencyService.queryDigitalCurrencyList();
  }

  @action.bound
  closeModal() {
    this.modalVisible = false;
  }

  @action.bound
  onSelectDate(date?: moment.Moment) {
    this.selectedDate = date!;

    const year = date!.format('YYYY');
    const month = date!.format('MM');
    const lastYear = (date!.year() - 1).toString();
    const lastMonth = moment(
      date!.get('month') === 0 ? 11 : date!.get('month') - 1,
    ).format('MM');
    // 首先检查它的上一个月是否有数据，若没有则提示先填写上个月数据。从2020年1月开始
    if (!(year === '2020' && month === '01')) {
      let hasDataLastMonth;
      if (month !== '01') {
        hasDataLastMonth =
          this.digitalCurrencyData[year] &&
          this.digitalCurrencyData[year][lastMonth];
      } else {
        hasDataLastMonth =
          this.digitalCurrencyData[lastYear] &&
          this.digitalCurrencyData[year][lastMonth];
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
  updateData(digitalCurrencyItem: Partial<DigitalCurrencyItem>) {
    const year = this.selectedDate.format('YYYY');
    const month = this.selectedDate.format('MM');
    this.digitalCurrencyService.updateData(year, month, digitalCurrencyItem);

    // if (this.digitalCurrencyData[this.selectedDate.format('YYYY')]) {
    //   this.digitalCurrencyData[this.selectedDate.format('YYYY')][
    //     this.selectedDate.format('MM')
    //   ] = new DigitalCurrencyModel(
    //     Object.assign(digitalCurrencyItem, {
    //       id: 'xxxcdfdsfdsfdf',
    //       createdAt: moment().toString(),
    //       updatedAt: moment().toString(),
    //     }) as DigitalCurrencyItem,
    //   );
    // } else {
    //   this.digitalCurrencyData[this.selectedDate.format('YYYY')] = {};
    //   this.digitalCurrencyData[this.selectedDate.format('YYYY')][
    //     this.selectedDate.format('MM')
    //   ] = new DigitalCurrencyModel(
    //     Object.assign(digitalCurrencyItem, {
    //       id: 'dsdsfdsfdsfsgg',
    //       createdAt: moment().toString(),
    //       updatedAt: moment().toString(),
    //     }) as DigitalCurrencyItem,
    //   );
    // }

    this.closeModal();
  }

  @action.bound
  startAssetsCurve() {
    this.routingStore.push('digital-currency/assets-curve');
  }
}
