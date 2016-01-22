var App = function App() {
  if (typeof chrome === "undefined") {
    throw "chrometron should only be in chrome"
  }
};

App.prototype.on = function(eventName, eventHandler) {
  if (eventName === 'ready') {
    chrome.app.runtime.onLaunched.addListener(eventHandler);
  } else {
    console.log('chrometron unimplemented app.event: ' + eventName);
  }
};

App.prototype.quit = function() {
  chrome.app.window.getAll().forEach(function(chromeWindow) {
    chromeWindow.close();
  });
};

var BrowserWindow = function BrowserWindow(options) {
  for (var key in options) {
    this[key] = options[key];
  }
};

BrowserWindow.prototype.loadURL = function(url) {
  chrome.app.window.create(url, {
    id: 'main', //TODO(efuquen): How to handle this id?
    bounds: { width: this.width, height: this.height },
  });
};

var WebContents = function WebContents() {};

WebContents.prototype.openDevTools = function() {};

BrowserWindow.prototype.webContents = new WebContents();

BrowserWindow.prototype.on = function(eventName, eventHandler) {
  if (eventName === 'closed') {
    chrome.app.window.onClosed.addListener(eventHandler);
  } else {
    console.log('chrometron unimplemented BrowserWindow.event: ' + eventName);
  }
};

module.exports = {
  app: new App(),
  BrowserWindow: BrowserWindow,
};
