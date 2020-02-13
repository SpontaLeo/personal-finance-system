import { app, fs, path } from '../shared/common/modules';

// 本地应用只包含数据库读写操作
export default class AppServer {
  storePath: string;
  dbPath: string;

  constructor() {
    const storePath = app.getPath('userData');
    this.storePath = storePath;
    this.dbPath = path.join(this.storePath, 'lowdb/db.json');
    fs.ensureDirSync(storePath);
    // 创建lowdb数据库文件
    fs.ensureFileSync(this.dbPath);
  }
}
