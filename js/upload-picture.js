'use strict';

(function () {
  var uploadPicture = function () {
    // Генерация шаблона
    var pictureTemplate = document.querySelector('#img-upload__overlay')
        .content
        .cloneNode(true)
        .querySelector('.img-upload__overlay');

    // вставляем элемент в дом
    var imageUploadForm = document.querySelector('.img-upload__form');
    imageUploadForm.appendChild(pictureTemplate);

    // Работа с эффектами
    var mainImage = imageUploadForm.querySelector('.img-upload__preview img');
    var effectsContainer = imageUploadForm.querySelector('.effects');
    var sliderContainer = document.querySelector('.effect-level');
    sliderContainer.classList.add('hidden');

    var addOnlyOneClassToImage = function (classString) {
      var image = mainImage;
      var classes = image.classList;

      for (var i = 1; i <= classes.length; i++) {
        classes.remove(classes[0]);
      }

      classes.add(classString);
    };

    // Функция для разных эффектов
    var addOtherEffect = function (effect) {

      var effectClass = 'effects__preview--' + effect;

      addOnlyOneClassToImage(effectClass);
      sliderContainer.classList.remove('hidden');
      mainImage.classList.remove('effects__preview--none');

    };

    // Переменные для слайдера
    var sliderLine = sliderContainer.querySelector('.effect-level__line');
    var sliderPin = sliderContainer.querySelector('.effect-level__pin');
    var sliderDepthLine = sliderContainer.querySelector('.effect-level__depth');
    var filterInput = sliderContainer.querySelector('.effect-level__value');

    // СЛАЙДЕР
    // Значения по умолчанию
    sliderPin.style.left = 100 + '%';
    sliderDepthLine.style.width = 100 + '%';

    // Сброс на значение по умолчанию при клике на другой фильтр
    effectsContainer.addEventListener('click', function () {
      sliderPin.style.left = 100 + '%';
      sliderDepthLine.style.width = 100 + '%';
      filterInput.setAttribute('value', 100);
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
        var valueOfFilterInput = (sliderDepthLine.offsetWidth / sliderLine.offsetWidth) * 100;
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
          mainImage.style.filter = 'invert(' + (sliderDepthLine.offsetWidth / sliderLine.offsetWidth) * 100 + '%)';

        //  PHOBOS
        } else if (mainImage.classList.contains('effects__preview--phobos')) {
          mainImage.style.filter = 'blur(' + sliderDepthLine.offsetWidth / sliderLine.offsetWidth * 3 + 'px)';

        //  HEAT
        } else if (mainImage.classList.contains('effects__preview--heat')) {
          mainImage.style.filter = 'brightness(' + sliderDepthLine.offsetWidth / sliderLine.offsetWidth * 3 + ')';
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

    formSubmitButton.addEventListener('click', function () {

      var hashtagInput = imageUploadForm.querySelector('.text__hashtags');
      var totalHashtags = hashtagInput.value.split(' ');

      if (totalHashtags.length > 5) {
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
            return;
          }

        }
      }

      // Проверка хэштэгов
      for (var i = 0; i < totalHashtags.length; i++) {
        if (totalHashtags[i] === '') {
          hashtagInput.setCustomValidity('');
        } else if (totalHashtags[i] === '#') {
          hashtagInput.setCustomValidity('Хэштэг не может состоять из одной решётки');
          return;
        } else if (totalHashtags[i].length > 20) {
          hashtagInput.setCustomValidity('Хэштэг не может состоять больше, чем из 20 символов');
          return;
        } else if (totalHashtags[i].charAt(0) !== '#') {
          hashtagInput.setCustomValidity('Хэштэг должен начинаться с решётки');
          return;
        }
      }

      hashtagInput.setCustomValidity('');

    });

    // Закрытие попапа
    var onEscPress = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        document.querySelector('#upload-file').value = '';
        pictureTemplate.remove();
      }
    };

    pictureTemplate.addEventListener('keydown', onEscPress);

    pictureTemplate.querySelector('.cancel').addEventListener('click', function (evt) {
      evt.preventDefault();

      document.querySelector('#upload-file').value = '';

      pictureTemplate.remove();
    });


    // Проверка исключений нажатий на esc
    var exceptionTextAreaElement = pictureTemplate.querySelector('.text__description');
    var exceptionInputElement = pictureTemplate.querySelector('.text__hashtags');

    var checkException = function (exception) {
      exception.addEventListener('focus', function () {
        pictureTemplate.removeEventListener('keydown', onEscPress);
      });

      exception.addEventListener('focusout', function () {
        pictureTemplate.addEventListener('keydown', onEscPress);
      });
    };

    checkException(exceptionInputElement);
    checkException(exceptionTextAreaElement);


    // разные фильтры
    // оригинал
    effectsContainer.querySelector('#effect-none')
      .addEventListener('click', function () {
        mainImage.classList.add('effects__preview--none');
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

  };

  var uploadFile = document.querySelector('#upload-file');
  uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();
    uploadPicture();
  });

})();