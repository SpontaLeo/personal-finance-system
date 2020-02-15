import { FileSync, app, fs, path } from '../shared/common/modules';

import lowdb from 'lowdb';
import { v4 as uuid } from 'uuid';

// 本地应用只包含数据库读写操作
export default class AppServer {
  db: any;

  generateUUID() {
    return uuid();
  }

  constructor() {
    const storePath = app.getPath('userData');
    const dbPath = path.join(storePath, 'lowdb/db.json');
    fs.ensureDirSync(storePath);
    // 创建lowdb数据库文件
    fs.ensureFileSync(dbPath);
    const adapter = new FileSync(dbPath);
    this.db = lowdb(adapter);
    this.db
      .defaults({
        'digital-currency': {},
        fund: {},
        'personal-bill': {},
        liabilities: {},
        'trading-record': {},
        'exchange-rate': 7,
      })
      .write();
  }
}
