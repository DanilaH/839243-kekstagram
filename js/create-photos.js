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

  var filters = document.querySelector('.img-filters');
  var popularPosts = filters.querySelector('#filter-popular');
  var newPosts = filters.querySelector('#filter-new');
  var discussedPosts = filters.querySelector('#filter-discussed');

  // Функция одинаковых действий
  var deletePictureElements = function (whichButton) {

    // удаляю прошлые элементы
    pictures.querySelectorAll('.picture').forEach(function (element) {
      element.remove();
    });

    // удаляю активный класс у кнопки фильтра
    filters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');

    whichButton.classList.add('img-filters__button--active');
  };

  // Функция для популярных постов
  var handlerPopular = function (postsArray) {
    var fragment = document.createDocumentFragment();

    filters.classList.remove('img-filters--inactive');

    for (var i = 0; i < postsArray.length; i++) {
      fragment.appendChild(createPostElement(postsArray[i], similarPhotoTemplate));
    }

    deletePictureElements(popularPosts);
    pictures.appendChild(fragment);

    return postsArray;
  };

  // для случайных постов
  var handlerNew = function (similarPostsArray) {
    var fragment = document.createDocumentFragment();
    var array = [];

    for (var j = 0; j < NEW_POSTS_AMOUNT; j++) {
      array[j] = window.utils.getKindOfRandomFromArray(similarPostsArray);
    }

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(createPostElement(array[i], similarPhotoTemplate));
    }

    deletePictureElements(newPosts);
    pictures.appendChild(fragment);
  };

  // для обсуждаемых постов
  var handlerDiscussed = function (similarPostsArray) {

    var fragment = document.createDocumentFragment();

    similarPostsArray.sort(function (first, second) {

      if (first.comments.length < second.comments.length) {
        return 1;
      } else if (first.comments.length > second.comments.length) {
        return -1;
      } else {
        return 0;
      }

    });

    similarPostsArray.forEach(function (element) {
      fragment.appendChild(createPostElement(element, similarPhotoTemplate));
    });


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


  var successHandler = function (data) {
    var postsArray = data;
    handlerPopular(data);

    // навешивание обработчиков для показа постов
    // популярные
    popularPosts.addEventListener('click', function (evt) {
      evt.preventDefault();

      window.debounce(function () {
        handlerPopular(postsArray);
      });

    });

    // случайные
    newPosts.addEventListener('click', function (evt) {
      evt.preventDefault();

      var similarPostsArray = postsArray.slice();

      window.debounce(function () {
        handlerNew(similarPostsArray);
      });
    });

    // обсуждаемые
    discussedPosts.addEventListener('click', function (evt) {
      evt.preventDefault();

      var similarPostsArray = postsArray.slice();

      window.debounce(function () {
        handlerDiscussed(similarPostsArray);
      });
    });

  };

  // вызов популярных постов, которые по умолчанию
  window.backend.loadData(successHandler, errorHandler);
  window.createPostElement = createPostElement;

})();
