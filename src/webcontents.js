var EventEmitter = require('events');
var util = require('util');

module.exports = WebContents = function() {};

util.inherits(WebContents, EventEmitter);

WebContents.prototype.openDevTools = function() {};
