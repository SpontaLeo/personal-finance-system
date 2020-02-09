import { action, computed, observable } from 'mobx';

import { RouterStore } from 'mobx-react-router';
import moment from 'moment';

export default class LiabilitiesStore {
  routingStore: RouterStore;

  constructor(routingStore: RouterStore) {
    this.routingStore = routingStore;
  }

  @observable
  selectedDate: moment.Moment = moment();

  @computed
  get selectedMonth(): number {
    return this.selectedDate.month();
  }

  @action.bound
  onSelectDate(date?: moment.Moment) {
    this.routingStore.push('/liabilities/detail');
    this.selectedDate = date!;
  }
}
