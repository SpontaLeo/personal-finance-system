import AppServer from './AppServer';
import { fs } from '../shared/common/modules';

export default class DigitalCurrencyService extends AppServer {
  saveData() {
    const data = new Uint8Array(Buffer.from('Node.js中文网'));
    fs.writeFile('test.txt', data, (err: any) => {
      if (err) throw err;
      console.log('文件已被保存');
    });
  }

  getPath() {
    // 注意this指向
    console.log(this);
    console.log(this.storePath);
  }
}
