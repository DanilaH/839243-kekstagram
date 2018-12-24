'use strict';

(function () {
  var createComment = function () {
    var commentary = {
      avatar: 'img/avatar-' + window.getRandom.getRandomNumber(window.utils.MIN_AVATAR, window.utils.MAX_AVATAR) + '.svg',
      message: window.getRandom.getRandomFromArray(window.utils.COMMENTS),
      name: window.getRandom.getRandomFromArray(window.utils.NAMES)
    };
    return commentary;
  };

  var createCommentsArray = function () {
    var commentaries = [];
    commentaries.length = window.getRandom.getRandomNumber(window.utils.MIN_COMMENTS_LENGTH, window.utils.MAX_COMMENTS_LENGTH);

    for (var i = 0; i < commentaries.length; i++) {
      commentaries[i] = createComment();
    }

    return commentaries;
  };

  var createPost = function () {
    var post = {
      url: window.getRandom.getKindOfRandomFromArray(window.utils.IMAGE_URL),
      likes: window.getRandom.getRandomNumber(window.utils.MIN_LIKES, window.utils.MAX_LIKES),
      comments: createCommentsArray()
    };
    return post;
  };

  var createPostsArray = function () {
    var posts = [];
    posts.length = window.utils.TOTAL_OBJECTS;

    for (var i = 0; i < posts.length; i++) {
      posts[i] = createPost();
    }

    return posts;
  };

  //  Создание DOM элементов
  var createPhotos = function (posts) {
    var similarPhotoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

    var createPostElement = function (samePosts, template) {
      var postElement = template.cloneNode(true);

      postElement.querySelector('.picture__img').setAttribute('src', 'photos/' + samePosts.url + '.jpg');
      postElement.querySelector('.picture__likes').textContent = samePosts.likes;
      postElement.querySelector('.picture__comments').textContent = samePosts.comments.length;

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

  window.createPhotos = {
    posts: createPostsArray()
  };

  createPhotos(window.createPhotos.posts);

})();
