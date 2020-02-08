const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
// const log = require('electron-log');

let win;

const devUrl = 'http://localhost:3000';
const localUrl = `file://${path.resolve(
  __dirname,
  '../../app.asar/build',
)}/index.html`;
const appUrl = isDev ? devUrl : localUrl;

// 利用electron-debug，添加和Chrome类似的快捷键
isDev && require('electron-debug')({ enabled: true, showDevTools: false });
// 用于添加Chromium插件
function createDevTools() {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
  } = require('electron-devtools-installer');
  // 安装devtron
  const devtronExtension = require('devtron');
  devtronExtension.install();
  // 安装React开发者工具
  installExtension(REACT_DEVELOPER_TOOLS);
}

function createWindow() {
  // 创建浏览器窗口。
  win = new BrowserWindow({
    icon: './src/assets/images/logo.ico',
    minWidth: 640,
    minHeight: 480,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../preload.js'),
    },
  });

  // 然后加载应用的 index.html。
  win.loadURL(appUrl);

  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', () => {
  createWindow();
  isDev && createDevTools();
});

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on('test', (event, arg) => {
  console.log(`received ${arg}`);
  // log.info(`received ${arg}`);
});
