const electron = window.require('electron');
const fs = window.require('fs-extra');
const path = window.require('path');
const FileSync = window.require('lowdb/adapters/FileSync');

// renderer直接引入有bug，将使用到的模块导出供renderer使用
const { app } = electron.remote;

export { app, fs, path, FileSync };
