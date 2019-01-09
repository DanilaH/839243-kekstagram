'use strict';

(function () {

  var NEW_POSTS_AMOUNT = 10;

  //  Создание DOM элементов
  var similarPhotoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  var pictures = document.querySelector('.pictures');

  var createPostElement = function (post, template) {
    var postElement = template.cloneNode(true);

    postElement.querySelector('.picture__img').setAttribute('src', post.url);
    postElement.querySelector('.picture__likes').textContent = post.likes;
    postElement.querySelector('.picture__comments').textContent = post.comments.length;

    postElement.addEventListener('click', function () {
      window.createBigPicture(post);
    });

    return postElement;
  };

  window.createPostElement = createPostElement;

  // Функция одинаковых действий
  var deletePictureElements = function (whichButton) {

    // удаляю прошлые элементы
    pictures.querySelectorAll('.picture').forEach(function (element) {
      element.remove();
    });

    // удаляю активный класс у кнопки фильтра
    filters.querySelectorAll('.img-filters__button').forEach(function (element) {

      if (element.classList.contains('img-filters__button--active')) {
        element.classList.remove('img-filters__button--active');
      }

    });

    whichButton.classList.add('img-filters__button--active');
  };

  var filters = document.querySelector('.img-filters');
  var popularPosts = filters.querySelector('#filter-popular');
  var newPosts = filters.querySelector('#filter-new');
  var discussedPosts = filters.querySelector('#filter-discussed');
  // Функция для популярных постов
  var successHandlerPopular = function (postsArray) {
    var fragment = document.createDocumentFragment();

    filters.classList.remove('img-filters--inactive');

    for (var i = 0; i < postsArray.length; i++) {
      fragment.appendChild(createPostElement(postsArray[i], similarPhotoTemplate));
    }

    deletePictureElements(popularPosts);
    pictures.appendChild(fragment);

  };

  // для случайных постов
  var successHandlerNew = function (postsArray) {
    var fragment = document.createDocumentFragment();
    var array = [];

    for (var j = 0; j < NEW_POSTS_AMOUNT; j++) {
      array[j] = window.utils.getKindOfRandomFromArray(postsArray);
    }

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(createPostElement(array[i], similarPhotoTemplate));
    }

    deletePictureElements(newPosts);
    pictures.appendChild(fragment);

  };

  // для обсуждаемых постов
  var successHandlerDiscussed = function (postsArray) {

    var fragment = document.createDocumentFragment();

    postsArray.sort(function (first, second) {

      if (first.comments.length < second.comments.length) {
        return 1;
      } else if (first.comments.length > second.comments.length) {
        return -1;
      } else {
        return 0;
      }

    });

    for (var i = 0; i < postsArray.length; i++) {
      fragment.appendChild(createPostElement(postsArray[i], similarPhotoTemplate));
    }

    deletePictureElements(discussedPosts);
    pictures.appendChild(fragment);

  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #FF4D4D; line-height: 48px;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // навешивание обработчиков для показа постов
  // популярные
  popularPosts.addEventListener('click', function (evt) {
    evt.preventDefault();

    deletePictureElements(popularPosts);

    window.debounce(function () {
      window.backend.loadData(successHandlerPopular, errorHandler);
    });

  });

  // случайные
  newPosts.addEventListener('click', function (evt) {
    evt.preventDefault();

    deletePictureElements(newPosts);

    window.debounce(function () {
      window.backend.loadData(successHandlerNew, errorHandler);
    });
  });

  // обсуждаемые
  discussedPosts.addEventListener('click', function (evt) {
    evt.preventDefault();

    deletePictureElements(discussedPosts);

    window.debounce(function () {
      window.backend.loadData(successHandlerDiscussed, errorHandler);
    });
  });

  // вызов популярных постов, которые по умолчанию
  window.backend.loadData(successHandlerPopular, errorHandler);

})();
