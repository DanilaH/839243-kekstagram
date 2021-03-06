'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var HASHTAG_LENGTH = 20;
  var MAX_HASHTAGS = 5;
  var PERCENTAGE = 100;
  var MAX_FILTER_VALUE = 3;

  var pictureTemplate = document.querySelector('#img-upload__overlay')
        .content
        .cloneNode(true)
        .querySelector('.img-upload__overlay');

  var imageUploadForm = document.querySelector('.img-upload__form');

  var mainImage = pictureTemplate.querySelector('.img-upload__preview img');


  var uploadPicture = function () {

    document.body.classList.add('modal-open');

    // вставляем элемент в дом
    imageUploadForm.appendChild(pictureTemplate);

    // Работа с эффектами
    var effectsContainer = imageUploadForm.querySelector('.effects');
    var sliderContainer = document.querySelector('.effect-level');
    sliderContainer.classList.add('hidden');

    // Функция для разных эффектов
    var addOtherEffect = function (effect) {
      var classes = mainImage.classList;

      classes.remove(classes[0]);

      var effectClass = 'effects__preview--' + effect;

      classes.add(effectClass);

      sliderContainer.classList.remove('hidden');

    };

    // Переменные для слайдера
    var sliderLine = sliderContainer.querySelector('.effect-level__line');
    var sliderPin = sliderContainer.querySelector('.effect-level__pin');
    var sliderDepthLine = sliderContainer.querySelector('.effect-level__depth');
    var filterInput = sliderContainer.querySelector('.effect-level__value');

    // СЛАЙДЕР
    // Значения по умолчанию
    sliderPin.style.left = PERCENTAGE + '%';
    sliderDepthLine.style.width = PERCENTAGE + '%';

    // Сброс на значение по умолчанию при клике на другой фильтр
    effectsContainer.addEventListener('click', function () {
      sliderPin.style.left = PERCENTAGE + '%';
      sliderDepthLine.style.width = PERCENTAGE + '%';
      filterInput.setAttribute('value', PERCENTAGE);
    });

    sliderPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      //  Получить уоординаты элемента
      var getCoords = function (element) {

        var box = element.getBoundingClientRect();

        return {
          top: box.top + pageYOffset,
          left: box.left + pageXOffset
        };

      };

      var sliderPinCoords = getCoords(sliderPin);
      var xCoord = evt.pageX - sliderPinCoords.left;

      var sliderLineCoords = getCoords(sliderLine);

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var leftSide = moveEvt.pageX - xCoord - sliderLineCoords.left;

        if (leftSide < 0) {
          leftSide = 0;
        }

        var rightSide = sliderLine.offsetWidth;
        if (leftSide > rightSide) {
          leftSide = rightSide;
        }

        sliderPin.style.left = leftSide + 'px';
        sliderDepthLine.style.width = (leftSide + xCoord / sliderLine.offsetWidth) + 'px';

        //  Запись значения в инпут
        var valueOfFilterInput = (sliderDepthLine.offsetWidth / sliderLine.offsetWidth) * PERCENTAGE;
        filterInput.setAttribute('value', valueOfFilterInput);

        //  Запись в фильтры
        //  CHROME
        if (mainImage.classList.contains('effects__preview--chrome')) {
          mainImage.style.filter = 'grayscale(' + (sliderDepthLine.offsetWidth / sliderLine.offsetWidth) + ')';

        //  SEPIA
        } else if (mainImage.classList.contains('effects__preview--sepia')) {
          mainImage.style.filter = 'sepia(' + sliderDepthLine.offsetWidth / sliderLine.offsetWidth + ')';

        //  MARVIN
        } else if (mainImage.classList.contains('effects__preview--marvin')) {
          mainImage.style.filter = 'invert(' + (sliderDepthLine.offsetWidth / sliderLine.offsetWidth) * PERCENTAGE + '%)';

        //  PHOBOS
        } else if (mainImage.classList.contains('effects__preview--phobos')) {
          mainImage.style.filter = 'blur(' + sliderDepthLine.offsetWidth / sliderLine.offsetWidth * MAX_FILTER_VALUE + 'px)';

        //  HEAT
        } else if (mainImage.classList.contains('effects__preview--heat')) {
          mainImage.style.filter = 'brightness(' + sliderDepthLine.offsetWidth / sliderLine.offsetWidth * MAX_FILTER_VALUE + ')';
        }

      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    // О поле с хэштэгами
    var formSubmitButton = imageUploadForm.querySelector('#upload-submit');
    var hashtagInput = imageUploadForm.querySelector('.text__hashtags');

    formSubmitButton.addEventListener('click', function () {
      var totalHashtags = hashtagInput.value.split(' ');

      if (totalHashtags.length > MAX_HASHTAGS) {
        hashtagInput.setCustomValidity('Нужно уменьшить количество хэштэгов, хотя бы до пяти');
        return;
      }

      // Проверка на повторяющиеся хэштеги
      for (var j = 0; j < totalHashtags.length; j++) {

        for (var m = 0; m < totalHashtags.length; m++) {

          if (j === m) {
            continue;
          }

          if (totalHashtags[j] === totalHashtags[m]) {
            hashtagInput.setCustomValidity('Не должно быть повторяющихся хэштэгов');
            hashtagInput.style = 'border: 2px solid #FF4D4D';
            return;
          }

        }
      }

      // Проверка хэштэгов
      for (var i = 0; i < totalHashtags.length; i++) {
        if (totalHashtags[i] === '') {
          hashtagInput.setCustomValidity('');
          hashtagInput.style = 'border: none';
        } else if (totalHashtags[i] === '#') {
          hashtagInput.setCustomValidity('Хэштэг не может состоять из одной решётки');
          hashtagInput.style = 'border: 2px solid #FF4D4D';
          return;
        } else if (totalHashtags[i].length >= HASHTAG_LENGTH) {
          hashtagInput.setCustomValidity('Хэштэг не может состоять больше, чем из 20 символов');
          hashtagInput.style = 'border: 2px solid #FF4D4D';
          return;
        } else if (totalHashtags[i].charAt(0) !== '#') {
          hashtagInput.setCustomValidity('Хэштэг должен начинаться с решётки');
          hashtagInput.style = 'border: 2px solid #FF4D4D';
          return;
        }
      }

      hashtagInput.setCustomValidity('');
      hashtagInput.style = 'border: none';
    });


    // возвращение значений в форме
    var scaleInput = pictureTemplate.querySelector('.scale__control--value');
    var resetForm = function () {

      imageUploadForm.reset();

      addOtherEffect('none');
      mainImage.style.filter = 'none';

      mainImage.style.transform = 'scale(' + window.scale.defaultValue + ')';
      scaleInput.setAttribute('value', window.scale.defaultValue * PERCENTAGE + '%');

      pictureTemplate.remove();

      document.body.removeAttribute('class');

      document.removeEventListener('keydown', onEscPress);

    };

    var onEscPress = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        resetForm();
      }
    };

    // Закрытие попапа
    pictureTemplate.querySelector('.cancel').addEventListener('click', resetForm);
    document.addEventListener('keydown', onEscPress);

    // Проверка исключений нажатий на esc
    var textArea = pictureTemplate.querySelector('.text__description');
    textArea.focus();

    var checkException = function (exception) {
      exception.addEventListener('focus', function () {
        document.removeEventListener('keydown', onEscPress);
      });

      exception.addEventListener('focusout', function () {
        document.addEventListener('keydown', onEscPress);
      });
    };

    checkException(textArea);
    checkException(hashtagInput);


    // разные фильтры
    // оригинал
    effectsContainer.querySelector('#effect-none')
      .addEventListener('click', function () {
        addOtherEffect('none');
        mainImage.style.filter = 'none';
        sliderContainer.classList.add('hidden');
      });


    // CHROME
    effectsContainer.querySelector('#effect-chrome')
      .addEventListener('click', function () {
        addOtherEffect('chrome');
        mainImage.style.filter = 'grayscale(1)';
      });


    // SEPIA
    effectsContainer.querySelector('#effect-sepia')
      .addEventListener('click', function () {
        addOtherEffect('sepia');
        mainImage.style.filter = 'sepia(1)';
      });


    // MARVIN
    effectsContainer.querySelector('#effect-marvin')
      .addEventListener('click', function () {
        addOtherEffect('marvin');
        mainImage.style.filter = 'invert(100%)';
      });


    // PHOBOS
    effectsContainer.querySelector('#effect-phobos')
      .addEventListener('click', function () {
        addOtherEffect('phobos');
        mainImage.style.filter = 'blur(3px)';
      });


    // HEAT
    effectsContainer.querySelector('#effect-heat')
      .addEventListener('click', function () {
        addOtherEffect('heat');
        mainImage.style.filter = 'brightness(3)';
      });

    // Отправка данных формы на сервер
    var send = function (evt) {

      window.backend.saveData(new FormData(imageUploadForm), window.messages.onLoad, window.messages.onError);

      resetForm();

      evt.preventDefault();

      imageUploadForm.removeEventListener('submit', send);

    };

    imageUploadForm.addEventListener('submit', send);

    window.scaleImage(pictureTemplate, mainImage);

  };

  var filtersLabels = Array.from(pictureTemplate.querySelectorAll('.effects__preview'));
  var uploadFile = document.querySelector('#upload-file');
  uploadFile.addEventListener('change', function (evt) {

    evt.preventDefault();

    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {

        mainImage.src = reader.result;

        filtersLabels.forEach(function (element) {
          element.style = 'background-image: url(' + reader.result + ')';
        });

      });

      reader.readAsDataURL(file);
    }

    uploadPicture();

  });

})();
