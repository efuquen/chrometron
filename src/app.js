module.exports = App = function() {
  if (typeof chrome === 'undefined') {
    throw 'chrometron should only be in chrome';
  } else {
    process.platform = 'chromeapp';
  }
};

App.prototype.on = function(eventName, eventHandler) {
  //will-finish-launching is an os x specific, consolidating onLaunched
  if (eventName === 'ready' || eventName === 'will-finish-launching') {
    chrome.app.runtime.onLaunched.addListener(eventHandler);
  } else if (eventName == 'open-file' || eventName === 'open-url') {
    return; //TODO(efuquen): osx specific, check if needed.
  } else {
    console.error('chrometron unimplemented app.event: ' + eventName);
  }
};

App.prototype.removeListener = function(eventName, eventHandler) {
  if (eventName === 'open-file' || eventName === 'open-url') {
    return;
  }

  console.warn('Chrome Apps do not support removing listeners.');
};

App.prototype.getVersion = function() {
  return '0.36.5';
};

App.prototype.getHomeDir = function() {
  return this.getPath('home');
};

App.prototype.getPath = function(name) {
  if (name === 'home') {
    //TODO(efuquen): Decide how to handle home path properly.
    return '/home';
  } else {
    throw 'Path type not handled: ' + name;
  }
};

App.prototype.setAppUserModelId = function(appUserModelId) {
  //This is a windows specific id, saving just to have it.
  this._appUserModelId = appUserModelId;
};

App.prototype.quit = function() {
  chrome.app.window.getAll().forEach(function(chromeWindow) {
    chromeWindow.close();
  });
};
