import DigitalCurrencyStore from './DigitalCurrencyStore';
import FundStore from './FundStore';
import HomeStore from './HomeStore';
import LiabilitiesStore from './LiabilitiesStore';
import PersonalBillStore from './PersonalBillStore';
import { RouterStore } from 'mobx-react-router';

export const routingStore = new RouterStore();
export const homeStore = new HomeStore(routingStore);
export const digitalCurrencyStore = new DigitalCurrencyStore();
export const fundStore = new FundStore();
export const liabilitiesStore = new LiabilitiesStore(routingStore);
export const personalBillStore = new PersonalBillStore(routingStore);
