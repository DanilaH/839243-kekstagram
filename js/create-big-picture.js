'use strict';

(function () {

  var bigPicture = document.querySelector('#big-picture')
        .content
        .querySelector('.big-picture');

  var createBigPicture = function (post) {

    document.body.classList.add('modal-open');

    var bigPictureNode = bigPicture.cloneNode(true);

    window.utils.MAIN.appendChild(bigPictureNode);

    bigPictureNode.querySelector('.big-picture__img img').setAttribute('src', post.url);
    bigPictureNode.querySelector('.likes-count').textContent = post.likes;
    bigPictureNode.querySelector('.social__caption').textContent = post.description;

    // Закрытие попапа
    bigPictureNode.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        document.body.removeAttribute('class');
        bigPictureNode.remove();
      }
    });

    bigPictureNode.querySelector('.cancel').addEventListener('click', function (evt) {
      evt.preventDefault();

      document.body.removeAttribute('class');

      bigPictureNode.remove();
    });

    // Вызов отрисовывающе-добавляющей функии
    var elements = window.createComments(post);

    var commentsList = document.querySelector('.social__comments');
    commentsList.appendChild(elements);

    var commentCount = bigPictureNode.querySelector('.social__comment-count');
    var commentLoader = bigPictureNode.querySelector('.comments-loader');

    commentCount.classList.add('visually-hidden');
    commentLoader.classList.add('visually-hidden');
  };

  window.createBigPicture = createBigPicture;

})();
