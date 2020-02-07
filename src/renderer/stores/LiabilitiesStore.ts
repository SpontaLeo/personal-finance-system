import { action, computed, observable } from 'mobx';

import { RouterStore } from 'mobx-react-router';
import moment from 'moment';

export default class LiabilitiesStore {
  routingStore: RouterStore;

  constructor(routingStore: RouterStore) {
    this.routingStore = routingStore;
  }

  @observable
  selectedValue: moment.Moment = moment();

  @computed
  get selectedMonth(): number {
    return moment().month();
  }

  @action.bound
  onDateChange(date: any) {
    this.routingStore.push('/liabilities/detail');
    this.selectedValue = date;
  }
}
