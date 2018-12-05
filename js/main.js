'use strict';

var IMAGE_URL = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Артём', 'Анастасия', 'Денис', 'Женя', 'Николай', 'Егор', 'Арчибальд', 'Виктор', 'Саша', 'Олег', 'Константин', 'Юрий', 'Пират', 'Гораций'];
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_AVATAR = 1;
var MAX_AVATAR = 6;
var MIN_COMMENTS_LENGTH = 2;
var MAX_COMMENTS_LENGTH = 10;
var TOTAL_OBJECTS = 25;

//  Случайное значение из массива
var getRandomFromArray = function (array) {
  var random = array[Math.floor(Math.random() * array.length)];

  return random;
};

// Неповторяющееся случайное значение
var getKindOfRandomFromArray = function (array) {
  var random = getRandomFromArray(array);
  //  Нахождение индекса выпавшего элемента
  var index = array.indexOf(random);
  //  Удаление этого индекса из массива, дабы он при следующем рандоме не выпал
  array.splice(index, 1);
  return random;
};

// Случайное число
var getRandomNumber = function (min, max) {
  var random = Math.floor(Math.random() * (max - min)) + min;
  return random;
};

// Массив объектов с комментариями
var createComment = function () {
  var commentary = {
    avatar: 'img/avatar-' + getRandomNumber(MIN_AVATAR, MAX_AVATAR) + '.svg',
    message: getRandomFromArray(COMMENTS),
    name: getRandomFromArray(NAMES)
  };
  return commentary;
};

var createCommentsArray = function () {
  var commentaries = [];
  commentaries.length = getRandomNumber(MIN_COMMENTS_LENGTH, MAX_COMMENTS_LENGTH);

  for (var i = 0; i < commentaries.length; i++) {
    commentaries[i] = createComment();
  }

  return commentaries;
};


//  "Полноценные" объекты
var createPost = function () {
  var post = {
    url: getKindOfRandomFromArray(IMAGE_URL),
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: createCommentsArray()
  };
  return post;
};

var createPostsArray = function () {
  var posts = [];
  posts.length = TOTAL_OBJECTS;

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

//  ВЫВОД "БОЛЬШОЙ КАРТИНКИ"
var createBigPicture = function (post) {
  // Информация из первого сгенерированного поста
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img img').setAttribute('src', 'photos/' + post.url + '.jpg');
  bigPicture.querySelector('.likes-count').textContent = post.likes;
  bigPicture.querySelector('.social__caption').textContent = 'Бла-бла-бла, описание фотографии';

  /*

    Я не стал делить следующие функции на отдельные кусочки вне вот этой.
    Мне думается, что раз оно всё в одном контексте, то можно и так (ИЛИ НЕ НАДО?)

  */

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

  // Вызов отрисовывающе-добавляющей функии
  var elements = createCommentElements();

  var commentsList = document.querySelector('.social__comments');
  commentsList.appendChild(elements);

  return bigPicture;
};

// ВЫЗОВЫ
var posts = createPostsArray();
createPhotos(posts);
createBigPicture(posts[0]);

// Работа с DOM
var commentCount = document.querySelector('.social__comment-count');
var commentLoader = document.querySelector('.comments-loader');

commentCount.classList.add('visually-hidden');
commentLoader.classList.add('visually-hidden');
