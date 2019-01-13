'use strict';

(function () {

  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var SAVE_URL = 'https://js.dump.academy/kekstagram';
  var TIMEOUT_TIME = 10000;
  var SUCCESSS_STATUS = 200;

  var loadData = function (onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === SUCCESSS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }

    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_TIME;

    xhr.open('GET', LOAD_URL);
    xhr.send();

  };

  var saveData = function (data, onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };

  window.backend = {
    loadData: loadData,
    saveData: saveData
  };

})();
