import HomeStore from './HomeStore';
import LiabilitiesStore from './LiabilitiesStore';
import { RouterStore } from 'mobx-react-router';
import SiderMenuStore from './SiderMenuStore';

export const routingStore = new RouterStore();
export const homeStore = new HomeStore();
export const siderMenuStore = new SiderMenuStore(routingStore);
export const liabilitiesStore = new LiabilitiesStore(routingStore);
