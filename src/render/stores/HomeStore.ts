import BaseStore from './BaseStore';
import { HomeMenu } from '../constants/Route';
import { RouterStore } from 'mobx-react-router';
import { computed } from 'mobx';

export default class HomeStore extends BaseStore {
  routingStore: RouterStore;

  constructor(routingStore: RouterStore) {
    super();
    this.routingStore = routingStore;
  }

  /**
   * 是否展示返回按钮
   */
  @computed
  get showBack(): boolean {
    const currentRoute = this.routingStore.location.pathname;
    return !HomeMenu.some(menu => menu.to === currentRoute);
  }
}
