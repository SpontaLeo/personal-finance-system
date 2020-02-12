import AppServer from './AppServer';
import { fs } from '../shared/common/modules';

// import fs from 'fs-extra';

export default class DigitalCurrencyService extends AppServer {
  saveData() {
    const data = new Uint8Array(Buffer.from('Node.js中文网'));
    fs.writeFile('test.txt', data, (err: any) => {
      if (err) throw err;
      console.log('文件已被保存');
    });
  }
}
