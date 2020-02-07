import { action, observable } from 'mobx';

import { RouterStore } from 'mobx-react-router';
import moment from 'moment';

export default class PersonalBillStore {
  routingStore: RouterStore;

  constructor(routingStore: RouterStore) {
    this.routingStore = routingStore;
  }

  @observable
  selectedValue: moment.Moment = moment();

  @action.bound
  onDateChange(date: any) {
    this.routingStore.push('/personal-bill/detail');
    this.selectedValue = date;
  }
}
