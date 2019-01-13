'use strict';

(function () {

  var createComment = function () {
    var commentary = {
      avatar: 'img/avatar-' + window.utils.getRandomNumber(window.utils.MIN_AVATAR, window.utils.MAX_AVATAR) + '.svg',
      message: window.utils.getRandomFromArray(window.utils.COMMENTS),
      name: window.utils.getRandomFromArray(window.utils.NAMES)
    };
    return commentary;
  };

  var createCommentsArray = function () {
    var commentaries = [];
    commentaries.length = window.utils.getRandomNumber(window.utils.MIN_COMMENTS_LENGTH, window.utils.MAX_COMMENTS_LENGTH);

    commentaries.forEach(function (element) {
      element = createComment();
    });

    return commentaries;
  };

  var createPost = function () {
    var post = {
      url: window.utils.getKindOfRandomFromArray(window.utils.IMAGE_URL),
      likes: window.utils.getRandomNumber(window.utils.MIN_LIKES, window.utils.MAX_LIKES),
      comments: createCommentsArray()
    };

    return post;
  };

  var createPostsArray = function () {
    var posts = [];
    posts.length = window.utils.TOTAL_OBJECTS;

    posts.forEach(function (element) {
      element = createPost();
    });

    return posts;
  };

  window.createPostsArray = createPostsArray;

})();
