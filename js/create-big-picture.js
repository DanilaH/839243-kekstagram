'use strict';

(function () {

  var bigPicture = document.querySelector('#big-picture')
        .content
        .querySelector('.big-picture');

  var main = document.querySelector('#main');

  var commentTemplate = document.querySelector('#social__comment')
        .content
        .querySelector('.social__comment');

  var createBigPicture = function (post) {

    var bigPictureNode = bigPicture.cloneNode(true);

    main.appendChild(bigPictureNode);

    bigPictureNode.querySelector('.big-picture__img img').setAttribute('src', 'photos/' + post.url + '.jpg');
    bigPictureNode.querySelector('.likes-count').textContent = post.likes;
    bigPictureNode.querySelector('.social__caption').textContent = 'Бла-бла-бла, описание фотографии';

    //  Рисование комментариев под "БОЛЬШОЙ КАРТИНКОЙ"
    var createCommentElement = function (samePost, template) {
      var commentElement = template.cloneNode(true);

      commentElement.querySelector('.social__picture').setAttribute('src', samePost.avatar);
      commentElement.querySelector('.social__text').textContent = samePost.message;

      return commentElement;
    };

    var createCommentElements = function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < post.comments.length; i++) {
        fragment.appendChild(createCommentElement(post.comments[i], commentTemplate));
      }
      return fragment;
    };

    // Закрытие попапа
    bigPictureNode.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        bigPictureNode.remove();
      }
    });

    bigPictureNode.querySelector('.cancel').addEventListener('click', function (evt) {
      evt.preventDefault();

      bigPictureNode.remove();
    });

    // Вызов отрисовывающе-добавляющей функии
    var elements = createCommentElements();

    var commentsList = document.querySelector('.social__comments');
    commentsList.appendChild(elements);

    var commentCount = bigPictureNode.querySelector('.social__comment-count');
    var commentLoader = bigPictureNode.querySelector('.comments-loader');

    commentCount.classList.add('visually-hidden');
    commentLoader.classList.add('visually-hidden');
  };

  window.createBigPicture = createBigPicture;

})();
