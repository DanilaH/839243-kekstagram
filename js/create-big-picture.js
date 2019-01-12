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
    var closeTemplate = function () {

      document.body.removeAttribute('class');
      bigPictureNode.remove();

      document.removeEventListener('keydown', onEscPress);
    };

    var onEscPress = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        closeTemplate();
      }
    };

    document.addEventListener('keydown', onEscPress);

    var cancel = bigPictureNode.querySelector('.cancel');
    cancel.addEventListener('click', closeTemplate);
    cancel.focus();

    // про комментарии
    var commentsList = bigPictureNode.querySelector('.social__comments');
    var commentsLoaderButton = bigPictureNode.querySelector('.social__comments-loader');
    // спрятать кнопку, если меньше или пять комментариев
    if (post.comments.length <= window.utils.COMMENTS_AMOUNT) {
      commentsLoaderButton.classList.add('visually-hidden');
      bigPictureNode.querySelector('.social__comment-count').textContent = post.comments.length + ' из ' + post.comments.length + ' комментариев';
    }

    //  копирование изначального массива
    var comments = post.comments.slice();
    // первые 5 комментариев
    commentsList.appendChild(window.createCommentsElements(comments, window.utils.COMMENTS_AMOUNT));

    // функция отрисовки комментариев
    var addNextComments = function () {

      comments.splice(0, window.utils.COMMENTS_AMOUNT);

      if (comments.length <= window.utils.COMMENTS_AMOUNT) {
        commentsList.appendChild(window.createCommentsElements(comments, comments.length));
        commentsLoaderButton.classList.add('visually-hidden');
        return;
      }

      commentsList.appendChild(window.createCommentsElements(comments, window.utils.COMMENTS_AMOUNT));
    };

    commentsLoaderButton.addEventListener('click', function (evt) {
      evt.preventDefault();

      addNextComments();

      var visibleComments = commentsList.querySelectorAll('.social__comment');
      bigPictureNode.querySelector('.social__comment-count').textContent = visibleComments.length + ' из ' + post.comments.length + ' комментариев';

    });

  };

  window.createBigPicture = createBigPicture;

})();
