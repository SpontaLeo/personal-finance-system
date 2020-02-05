import { routingStore } from '../../stores/index';

export function goBack() {
  routingStore.goBack();
}
