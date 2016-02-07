module.exports = Dialog = function() {};

function buildMessageBox(
  document, options, callback, dialogTag, buttonTag, dialogShow, dialogClose) {
  var dialog = document.createElement(dialogTag);
  if (options.message) {
    var message = document.createElement('h3');
    message.innerHTML = options.message;
    dialog.appendChild(message);
  }

  if (options.detail) {
    var detail = document.createElement('p');
    detail.innerHTML = options.detail;
    dialog.appendChild(detail);
  }

  if (options.buttons) {
    var buttonDiv = document.createElement('div');

    //TODO(efuquen): reverse modifies origina array, need deep copy.
    options.buttons.reverse();
    for (var i = 0; i < options.buttons.length; i++) {
      var buttonText = options.buttons[i];
      var button = document.createElement(buttonTag);
      button.innerHTML = buttonText;
      var chosen = i;
      button.onclick = function() {
        dialogClose(dialog);
        callback(chosen);
      };

      buttonDiv.appendChild(button);
    }

    dialog.appendChild(buttonDiv);
  }

  document.body.appendChild(dialog);
  dialogShow(dialog);
}

function showMessageBoxWhenWindowReady(window, options, callback) {
  var document = window.document;

  //Easy to switch out html5 and paper elements.
  buildMessageBox(document, options, callback, 'paper-dialog', 'paper-button',
    function(dialog){
      dialog.open();
    }, function(dialog) {
      dialog.close();
    });
}

Dialog.prototype.showMessageBox = function() {
  if (arguments.length === 3) {
    var browserWindow = arguments[0];
    var options = arguments[1];
    var callback = arguments[2];
    if (browserWindow._window) {
      if (browserWindow._window.contentWindow.document.body) {
        showMessageBoxWhenWindowReady(browserWindow._window.contentWindow,
          options, callback);
      } else {
        browserWindow.webContents.on('dom-ready', function() {
          showMessageBoxWhenWindowReady(browserWindow._window.contentWindow,
            options, callback);
        });
      }
    } else {
      browserWindow.on('_window-created', function() {
        browserWindow.webContents.on('dom-ready', function() {
          showMessageBoxWhenWindowReady(browserWindow._window.contentWindow,
            options, callback);
        });
      }.bind(this));
    }
  } else if (arguments.length === 2) {
    var window = chrome.window.current().contentWindow;
    var options = arguments[0];
    var callback = arguments[1];
    showMessageBoxWhenWindowReady(window, options, callback);
  } else if (arguments.length < 1) {
    throw 'showMessageBox requires options and callback to be set';
  }
};
