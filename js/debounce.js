'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout;

  var debounce = function (callback) {

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      callback();
    }, DEBOUNCE_INTERVAL);

  };

  window.debounce = debounce;

})();
