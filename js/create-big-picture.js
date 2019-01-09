'use strict';

(function () {

  // количество прибавляемых и выидимых изначально комментариев
  var COMMENTS_AMOUNT = 5;

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

    if (post.comments.length < COMMENTS_AMOUNT) {
      bigPictureNode.querySelector('.social__comment-count').textContent = post.comments.length + ' из ' + post.comments.length + ' комментариев';
    }

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
    var comments = window.createComments(post);

    var commentsList = document.querySelector('.social__comments');
    commentsList.appendChild(comments);

    // Массив комментариев из NodeList
    var commentsElements = Array.from(commentsList.querySelectorAll('.social__comment'));
    var commentsLoaderButton = bigPictureNode.querySelector('.social__comments-loader');
    //  спрятать кнопку, если меньше пяти комментариев
    if (commentsElements.length <= COMMENTS_AMOUNT) {
      commentsLoaderButton.classList.add('visually-hidden');
    }

    // прибавить к элементам массива visually-hidden но не к пяти показываемым
    commentsElements.forEach(function (element, i) {
      if (i >= COMMENTS_AMOUNT) {
        element.classList.add('visually-hidden');
      }
    });

    // массив спрятанных комментарие
    var visHidCommentsElements = Array.from(commentsList.querySelectorAll('.visually-hidden'));

    // обработчик кнопки
    commentsLoaderButton.addEventListener('click', function (evt) {
      evt.preventDefault();

      // убирать viseally-hidden у пяти элементов
      for (var i = 0; i < COMMENTS_AMOUNT; i++) {

        //
        // проверить меньше ли элементов, чем 5. И тогда у них всех удалить visually-hidden
        // по-другому я не понял, как сделать.
        // Здесь я что-то долго мучился
        //
        //  .comment - выдуманный класс. Я его добавил, чтобы отображать количество элементов в social__comment-counter
        //

        if (visHidCommentsElements.length < COMMENTS_AMOUNT) {

          visHidCommentsElements.forEach(function (element) {
            element.classList.remove('visually-hidden');
            element.classList.add('comment');
          });

          commentsLoaderButton.classList.add('visually-hidden');

          // выход из цикла при выполнении условия
          break;
        }

        visHidCommentsElements[i].classList.remove('visually-hidden');
        visHidCommentsElements[i].classList.add('comment');
      }

      // убирать элементы, у которых уже нет класса
      for (var j = 0; j < COMMENTS_AMOUNT; j++) {
        visHidCommentsElements.shift();
      }

      // Содержание поля количества комментариев

      // приплюсовал COMMENTS_AMOUNT, чтобы количество элементов было правильным
      var notVisHid = commentsList.querySelectorAll('.comment').length + COMMENTS_AMOUNT;
      bigPictureNode.querySelector('.social__comment-count').textContent = notVisHid + ' из ' + post.comments.length + ' комментариев';

    });

  };

  window.createBigPicture = createBigPicture;

})();
