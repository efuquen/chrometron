'use strict';

const electron = require('electron');
const app      = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog   = electron.dialog;

var mainWindow = null;

/*app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});*/

app.on('ready', function() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  if (process.platform === 'chromeapp') {
    mainWindow.loadURL('../index.html');
  } else {
    mainWindow.loadURL('file://' + __dirname + '/../index.html');
  }

  dialog.showMessageBox(mainWindow, {
    type: 'warning',
    buttons: ['Close', 'Keep Waiting'],
    message: 'Editor is not responding',
    detail: 'The editor is not responding. Would you like to force close it or just keep waiting?',
  }, function(chosen) {
    console.log('warning chosen: ' + chosen);
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
