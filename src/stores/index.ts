import HomeStore from '../stores/HomeStore';
import { RouterStore } from "mobx-react-router";

export const routingStore = new RouterStore();
export const homeStore = new HomeStore();