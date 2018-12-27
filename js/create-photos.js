'use strict';

(function () {
  //  Создание DOM элементов
  var similarPhotoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  var createPostElement = function (post, template) {
    var postElement = template.cloneNode(true);

    postElement.querySelector('.picture__img').setAttribute('src', 'photos/' + post.url + '.jpg');
    postElement.querySelector('.picture__likes').textContent = post.likes;
    postElement.querySelector('.picture__comments').textContent = post.comments.length;

    postElement.addEventListener('click', function () {
      window.createBigPicture(post);
    });

    return postElement;
  };

  var createPostElements = function (postsArray) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < postsArray.length; i++) {
      fragment.appendChild(createPostElement(postsArray[i], similarPhotoTemplate));
    }

    return fragment;
  };

  var posts = window.createPostsArray();
  var elements = createPostElements(posts);

  var pictures = document.querySelector('.pictures');
  pictures.appendChild(elements);

})();
