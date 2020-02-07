import { ChildRoute, HomeMenu } from '../constants/Route';

import BaseStore from './BaseStore';
import { RouterStore } from 'mobx-react-router';
import { computed } from 'mobx';

export default class HomeStore extends BaseStore {
  routingStore: RouterStore;

  constructor(routingStore: RouterStore) {
    super();
    this.routingStore = routingStore;
  }

  get currentRoute(): string {
    return this.routingStore.location.pathname;
  }

  get menuKey(): string {
    const matchedRoute = HomeMenu.concat(ChildRoute).filter(
      route => route.to === this.currentRoute,
    )[0];

    return matchedRoute
      ? matchedRoute.parentKey
        ? matchedRoute.parentKey
        : matchedRoute.key
      : HomeMenu[0].key;
  }

  /**
   * 是否展示返回按钮
   */
  @computed
  get showBack(): boolean {
    return !HomeMenu.some(menu => menu.to === this.currentRoute);
  }
}
