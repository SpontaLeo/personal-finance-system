import { fs, path } from '../shared/common/modules';

import AppServer from './AppServer';

export default class DigitalCurrencyService extends AppServer {
  saveData() {
    const data = new Uint8Array(Buffer.from('Node.js中文网'));
    fs.writeFile(path.join(this.storePath, 'test.txt'), data, (err: any) => {
      if (err) throw err;
      console.log('文件已保存');
    });
  }
}
