import { action, computed, observable } from 'mobx';

import BaseStore from './BaseStore';
import { LiabilitiesItem } from '../../shared/interfaces/Liabilities';
import LiabilitiesModel from '../models/LiabilitiesModal';
import LiabilitiesService from '../../server/LiabilitiesService';
import { RouterStore } from 'mobx-react-router';
import { message } from 'antd';
import moment from 'moment';

export default class LiabilitiesStore extends BaseStore {
  routingStore: RouterStore;

  @observable
  liabilitiesData: {
    [key: string]: { [key: string]: LiabilitiesModel };
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
  get selectedData(): LiabilitiesModel | undefined {
    const matchedData =
      this.liabilitiesData[this.selectedYear] &&
      this.liabilitiesData[this.selectedYear][this.selectedMonth];
    return matchedData ? matchedData : undefined;
  }

  constructor(
    routingStore: RouterStore,
    private liabilitiesService: LiabilitiesService,
  ) {
    super();
    this.routingStore = routingStore;
    this.queryLiabilitiesData();
  }

  @action.bound
  onSelectDate(date?: moment.Moment) {
    this.selectedDate = date!;
    const copiedDate = JSON.parse(JSON.stringify(date!));

    const lastMonthMoment = moment(copiedDate).subtract(1, 'months');
    const lastYear = lastMonthMoment.format('YYYY');
    const lastMonth = lastMonthMoment.format('MM');

    // 首先检查它的上一个月是否有数据，若没有则提示先填写上个月数据。从2020年1月开始
    if (!(this.selectedYear === '2020' && this.selectedMonth === '01')) {
      let hasDataLastMonth;
      if (this.selectedMonth !== '01') {
        hasDataLastMonth =
          this.liabilitiesData[this.selectedYear] &&
          this.liabilitiesData[this.selectedYear][lastMonth];
      } else {
        hasDataLastMonth =
          this.liabilitiesData[lastYear] &&
          this.liabilitiesData[lastYear][lastMonth];
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
  closeModal() {
    this.modalVisible = false;
  }

  @action.bound
  queryLiabilitiesData() {
    this.liabilitiesData = this.liabilitiesService.queryDigitalCurrencyData();
  }

  @action.bound
  updateData(liabitiesItem: Partial<LiabilitiesItem>) {
    this.liabilitiesService.updateData(
      this.selectedYear,
      this.selectedMonth,
      liabitiesItem,
    );
    this.queryLiabilitiesData();
    this.closeModal();
  }

  @action.bound
  startBalanceSheetCurve() {
    this.routingStore.push('liabilities/balance-sheet-curve');
  }
}
