var WebContents = require('./webcontents');
var uuid = require('uuid');
var EventEmitter = require('events');
var util = require('util');

module.exports = BrowserWindow = function(options) {
  for (var key in options) {
    this[key] = options[key];
  }
};

util.inherits(BrowserWindow, EventEmitter);

BrowserWindow.prototype.loadURL = function(url, options) {
  if (options && options.id) {
    this._id = id;
  } else {
    this._id = uuid.v4();
  }

  chrome.app.window.create(url, {
    id: this._id,
    bounds: { width: this.width, height: this.height },
  }, function(createdWindow) {
    createdWindow.onClosed.addListener(function() {
      this.emit('closed');
    });

    createdWindow.contentWindow.onload = function() {
      this.webContents.emit('did-finish-load');
    }.bind(this);

    this._window = createdWindow;
  }.bind(this));
};

BrowserWindow.prototype.webContents = new WebContents();
