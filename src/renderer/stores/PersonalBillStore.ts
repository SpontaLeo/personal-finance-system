import { action, observable } from 'mobx';

import BillModel from '../models/BillModel';
import { RouterStore } from 'mobx-react-router';
import moment from 'moment';

export default class PersonalBillStore {
  routingStore: RouterStore;

  @observable
  personalBillData: {
    [key: string]: { [key: string]: BillModel };
  } = {};

  @observable
  selectedDate: moment.Moment = moment();

  constructor(routingStore: RouterStore) {
    this.routingStore = routingStore;
  }

  @action.bound
  queryPersonalBillData() {}

  @action.bound
  onPanelChange(date?: moment.Moment) {
    this.selectedDate = date!;
  }

  @action.bound
  onSelectDate(date?: moment.Moment) {
    this.selectedDate = date!;
  }
}
