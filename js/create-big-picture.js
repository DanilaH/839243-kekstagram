'use strict';

(function () {

  var bigPicture = document.querySelector('#big-picture')
        .content
        .querySelector('.big-picture');

  var main = document.querySelector('#main');

  var createBigPicture = function (post) {

    document.body.classList.add('modal-open');

    var bigPictureNode = bigPicture.cloneNode(true);

    main.appendChild(bigPictureNode);

    bigPictureNode.querySelector('.big-picture__img img').setAttribute('src', post.url);
    bigPictureNode.querySelector('.likes-count').textContent = post.likes;
    bigPictureNode.querySelector('.social__caption').textContent = post.description;
    bigPictureNode.querySelector('.comments-count').textContent = post.comments.length;

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


    var commentsList = bigPictureNode.querySelector('.social__comments');
    var commentsLoaderButton = bigPictureNode.querySelector('.social__comments-loader');
    // спрятать кнопку, если меньше или пять комментариев
    if (post.comments.length <= window.utils.COMMENTS_AMOUNT) {
      commentsLoaderButton.classList.add('visually-hidden');
      bigPictureNode.querySelector('.social__comment-count').textContent = post.comments.length + ' из ' + post.comments.length + ' комментариев';
    }

    // функция отрисовки комментариев
    var minValue = 0;
    var maxvalue = 5;

    var addComments = function () {

      var comments = post.comments.slice(minValue, maxvalue);

      commentsList.appendChild(window.createCommentsElements(comments, comments.length));

      if (maxvalue >= post.comments.length) {
        commentsLoaderButton.classList.add('visually-hidden');
      }

      minValue += window.utils.COMMENTS_AMOUNT;
      maxvalue += window.utils.COMMENTS_AMOUNT;

    };

    // первые 5 комментариев
    addComments();

    commentsLoaderButton.addEventListener('click', function (evt) {
      evt.preventDefault();

      addComments();

      var visibleComments = commentsList.querySelectorAll('.social__comment');

      bigPictureNode.querySelector('.social__comment-count').textContent = visibleComments.length + ' из ' + post.comments.length + ' комментариев';

    });

  };

  window.createBigPicture = createBigPicture;

})();
