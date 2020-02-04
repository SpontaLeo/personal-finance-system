import { ChildRoute, HomeMenu } from '../constants/Route';

import { RouterStore } from 'mobx-react-router';

export default class SiderMenuStore {
  routingStore: RouterStore;

  constructor(routingStore: RouterStore) {
    this.routingStore = routingStore;
  }

  get currentRoute(): string {
    const path = this.routingStore.location.pathname;
    const matchedRoute = HomeMenu.concat(ChildRoute).filter(
      route => route.to === path,
    )[0];
    return matchedRoute.parentKey ? matchedRoute.parentKey : matchedRoute.key;
  }
}
