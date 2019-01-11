'use strict';

(function () {

  var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  var main = document.querySelector('#main');

  var closeMessage = function (template, button) {
    main.appendChild(template);

    var onEscPress = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        template.remove();
        document.removeEventListener('keydown', onEscPress);
      }
    };

    document.addEventListener('keydown', onEscPress);

    template.addEventListener('click', function () {
      template.remove();
    });

    button.focus();
    button.addEventListener('click', function () {
      template.remove();
    });
  };

  var onLoad = function () {

    var button = successTemplate.querySelector('.success__button');

    closeMessage(successTemplate, button);

  };

  var onError = function () {

    var button = errorTemplate.querySelector('.error__button');

    closeMessage(errorTemplate, button);

  };

  window.messages = {
    onLoad: onLoad,
    onError: onError
  };

})();
