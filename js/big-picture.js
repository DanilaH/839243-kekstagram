'use strict';

(function () {
  var createBigPicture = function (post) {
    var bigPicture = document.querySelector('#big-picture')
        .content
        .cloneNode(true)
        .querySelector('.big-picture');

    var main = document.querySelector('#main');
    main.appendChild(bigPicture);

    bigPicture.querySelector('.big-picture__img img').setAttribute('src', 'photos/' + post.url + '.jpg');
    bigPicture.querySelector('.likes-count').textContent = post.likes;
    bigPicture.querySelector('.social__caption').textContent = 'Бла-бла-бла, описание фотографии';

    //  Рисование комментариев под "БОЛЬШОЙ КАРТИНКОЙ"
    var commentTemplate = document.querySelector('#social__comment')
        .content
        .querySelector('.social__comment');

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
    bigPicture.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        bigPicture.remove();
      }
    });

    bigPicture.querySelector('.cancel').addEventListener('click', function (evt) {
      evt.preventDefault();

      bigPicture.remove();
    });

    // Вызов отрисовывающе-добавляющей функии
    var elements = createCommentElements();

    var commentsList = document.querySelector('.social__comments');
    commentsList.appendChild(elements);

    var commentCount = bigPicture.querySelector('.social__comment-count');
    var commentLoader = bigPicture.querySelector('.comments-loader');

    commentCount.classList.add('visually-hidden');
    commentLoader.classList.add('visually-hidden');
  };

  var pictureList = document.querySelector('.pictures');

  pictureList.addEventListener('click', function (evt) {
    var pictureItems = pictureList.querySelectorAll('.picture');
    var picturesArray = Array.from(pictureItems);
    var target = evt.target;

    while (target && target !== pictureList) {
      if (target.classList.contains('picture')) {
        var index = picturesArray.indexOf(target);
        createBigPicture(window.createPhotos.posts[index]);
        return;
      }
      target = target.parentNode;
    }
  });

})();
