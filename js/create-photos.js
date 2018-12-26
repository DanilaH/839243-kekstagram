'use strict';

(function () {
  //  Создание DOM элементов
  var similarPhotoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  var createPhotos = function (posts) {

    var createPostElement = function (samePosts, template) {
      var postElement = template.cloneNode(true);

      postElement.querySelector('.picture__img').setAttribute('src', 'photos/' + samePosts.url + '.jpg');
      postElement.querySelector('.picture__likes').textContent = samePosts.likes;
      postElement.querySelector('.picture__comments').textContent = samePosts.comments.length;

      postElement.addEventListener('click', function () {
        window.createBigPicture(samePosts);
      });

      return postElement;
    };

    var createPostElements = function (samePosts) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < samePosts.length; i++) {
        fragment.appendChild(createPostElement(samePosts[i], similarPhotoTemplate));
      }

      return fragment;
    };

    var elements = createPostElements(posts);

    var pictures = document.querySelector('.pictures');
    pictures.appendChild(elements);

  };

  var posts = window.dataset.createPostsArray();

  var photo = createPhotos(posts);

})();
