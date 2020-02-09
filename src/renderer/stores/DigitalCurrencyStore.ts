import { action, computed, observable } from 'mobx';

import moment from 'moment';

export default class DigitalCurrencyStore {
  @observable
  selectedValue: moment.Moment = moment();

  @computed
  get selectedMonth(): number {
    return moment().month();
  }

  @action.bound
  onDateChange(date?: moment.Moment) {
    this.selectedValue = date!;
  }
}
