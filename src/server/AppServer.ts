import { app } from '../shared/common/modules';

// 本地应用只包含数据库读写操作
export default class AppServer {
  storePath: string;

  constructor() {
    this.storePath = app.getPath('userData');
  }
}
