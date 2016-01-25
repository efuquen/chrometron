var App = require('./app');
var BrowserWindow = require('./browserwindow');
var Dialog = require('./dialog');

module.exports = {
  app: new App(),
  BrowserWindow: BrowserWindow,
  dialog: new Dialog(),
};
