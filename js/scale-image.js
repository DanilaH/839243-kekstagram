'use strict';

(function () {

  var SCALE_VALUE = 1;
  var SCALE_STEP = 0.25;
  var SCALE_PERCENT_FOR_VALUE = 100;

  var scaleImage = function (template, image) {

    var scale = template.querySelector('.img-upload__scale');
    var scaleInput = scale.querySelector('.scale__control--value');
    var scaleSmaller = scale.querySelector('.scale__control--smaller');
    var scaleBigger = scale.querySelector('.scale__control--bigger');

    scaleSmaller.addEventListener('click', function (evt) {
      evt.preventDefault();

      SCALE_VALUE = SCALE_VALUE - SCALE_STEP;

      if (SCALE_VALUE <= SCALE_STEP) {
        SCALE_VALUE = SCALE_STEP;
      }

      image.style.transform = 'scale(' + SCALE_VALUE + ')';
      scaleInput.setAttribute('value', SCALE_VALUE * SCALE_PERCENT_FOR_VALUE + '%');

    });

    scaleBigger.addEventListener('click', function (evt) {
      evt.preventDefault();

      SCALE_VALUE = SCALE_VALUE + SCALE_STEP;

      if (SCALE_VALUE >= 1) {
        SCALE_VALUE = 1;
      }

      image.style.transform = 'scale(' + SCALE_VALUE + ')';
      scaleInput.setAttribute('value', SCALE_VALUE * SCALE_PERCENT_FOR_VALUE + '%');

    });

  };

  window.scale = {
    defaultValue: SCALE_VALUE,
    percentValue: SCALE_PERCENT_FOR_VALUE
  };

  window.scaleImage = scaleImage;

})();
