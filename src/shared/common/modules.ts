const electron = (window as any).electron;
const fs = (window as any).fs;
const path = (window as any).path;
const FileSync = (window as any).FileSync;

// renderer直接引入有bug，将使用到的模块导出供renderer使用
const { app } = electron.remote;

export { app, fs, path, FileSync };
