'use strict';

(function () {

  var commentTemplate = document.querySelector('#social__comment')
         .content
         .querySelector('.social__comment');

  var createCommentElement = function (post, template) {
    var commentElement = template.cloneNode(true);

    commentElement.querySelector('.social__picture').setAttribute('src', post.avatar);
    commentElement.querySelector('.social__text').textContent = post.message;

    return commentElement;
  };

  var createCommentsElements = function (post, number) {

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < number; i++) {
      fragment.appendChild(createCommentElement(post.comments[i], commentTemplate));
    }

    return fragment;
  };

  window.createCommentsElements = createCommentsElements;

})();
