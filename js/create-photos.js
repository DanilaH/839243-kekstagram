'use strict';

(function () {
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

  var successHandler = function (postsArray) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < postsArray.length; i++) {
      fragment.appendChild(createPostElement(postsArray[i], similarPhotoTemplate));
    }

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

  window.backend.loadData(successHandler, errorHandler);

})();
