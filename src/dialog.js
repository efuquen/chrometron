module.exports = Dialog = function() {};

Dialog.prototype.showMessageBox = function(browserWindow, options, callback) {
  var window   = browserWindow._window.contentWindow;
  var document = window.document;

  var dialog = document.createElement('dialog');
  if (options.message) {
    var message = document.createElement('b');
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
      var button = document.createElement('button');
      button.innerHTML = buttonText;
      var chosen = i;
      button.onclick = function() {
        dialog.close();
        callback(chosen);
      };

      buttonDiv.appendChild(button);
    }

    dialog.appendChild(buttonDiv);
  }

  document.body.appendChild(dialog);
  dialog.show();
};
