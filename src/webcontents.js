var EventEmitter = require('events');
var util = require('util');

module.exports = WebContents = function() {
  this._loading = true;
  this.on('did-finish-load', function() {
    this._loading = false;
  }.bind(this));
};

util.inherits(WebContents, EventEmitter);

WebContents.prototype.openDevTools = function() {};

WebContents.prototype.isLoading = function() {
  return this._loading;
};
