'use strict';

(function () {

  var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  var main = document.querySelector('#main');

  var onLoad = function () {
    main.appendChild(successTemplate);

    successTemplate.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        successTemplate.remove();
      }
    });


    var button = successTemplate.querySelector('.success__button');
    button.setAttribute('autofocus', 'autofocus');
    button.addEventListener('click', function (evt) {
      evt.preventDefault();

      successTemplate.remove();
    });

    successTemplate.addEventListener('click', function () {
      successTemplate.remove();
    });

  };

  var onError = function () {
    main.appendChild(errorTemplate);

    errorTemplate.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        errorTemplate.remove();
      }
    });

    errorTemplate.querySelector('.error__button').addEventListener('click', function (evt) {
      evt.preventDefault();

      errorTemplate.remove();
    });

    errorTemplate.addEventListener('click', function () {
      errorTemplate.remove();
    });
  };

  window.messages = {
    onLoad: onLoad,
    onError: onError
  };

})();
