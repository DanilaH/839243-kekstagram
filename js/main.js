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
  var random = array[Math.floor(Math.random() * array.length)];
  //  Нахождение индекса выпавшего элемента
  var index = array.indexOf(random);
  //  Удаление этого индекса из массива, дабы он при следующем рандоме не выпалы
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
var createPostElement = function (posts) {
  var postElement = similarPhotoTemplate.cloneNode(true);

  postElement.querySelector('.picture__img').setAttribute('src', 'photos/' + posts.url + '.jpg');
  postElement.querySelector('.picture__likes').textContent = posts.likes;
  postElement.querySelector('.picture__comments').textContent = posts.comments.length;

  return postElement;
};

var createElements = function (posts) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < posts.length; i++) {
    fragment.appendChild(createPostElement(posts[i]));
  }
  return fragment;
};

//  ВЫВОД "БОЛЬШОЙ КАРТИНКИ"
var createBigPicture = function (posts) {
  // Информация из первого сгенерированного поста
  var firstPost = posts[0];

  bigPicture.querySelector('.big-picture__img img').setAttribute('src', 'photos/' + firstPost.url + '.jpg');
  bigPicture.querySelector('.likes-count').textContent = firstPost.likes;
  bigPicture.querySelector('.social__caption').textContent = 'Бла-бла-бла, описание фотографии';

  /*

    Я не стал делить следующие функции на отдельные кусочки вне вот этой.
    Мне думается, что раз оно всё в одном контексте, то можно и так (ИЛИ НЕ НАДО?)

  */

  //  Рисование комментариев под "БОЛЬШОЙ КАРТИНКОЙ"

  // Функция для создания разметки комментариев
  var makeElement = function (tagName, className) {
    var bigPictureComments = document.createElement(tagName);
    bigPictureComments.classList.add(className);

    return bigPictureComments;
  };

  //  Функция, создающая эту самую разметку
  var makeElements = function (array) {
    var listItem = makeElement('li', 'social__comment');

    var commentAvatar = makeElement('img', 'social__picture');
    commentAvatar.alt = 'Аватар комментатора фотографии';
    commentAvatar.src = array.avatar;
    listItem.appendChild(commentAvatar);

    var commentText = makeElement('p', 'social__text');
    commentText.textContent = array.message;
    listItem.appendChild(commentText);

    return listItem;
  };

  //  Функция отрисовывающе-добавляющая
  var displayElements = function () {
    for (var i = 0; i < firstPost.comments.length; i++) {
      var item = makeElements(firstPost.comments[i]);
      commentsList.appendChild(item);
    }
  };

  // Вызов отрисовывающе-добавляющей функии
  displayElements();

  return bigPicture;
};

// ВЫЗОВЫ
var posts = createPostsArray();
var elements = createElements(posts);
createBigPicture(posts);

// Работа с DOM
var pictures = document.querySelector('.pictures');
var similarPhotoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var bigPicture = document.querySelector('.big-picture');
var commentsList = document.querySelector('.social__comments');
var commentCount = document.querySelector('.social__comment-count');
var commentLoader = document.querySelector('.comments-loader');

pictures.appendChild(elements);
bigPicture.classList.remove('hidden');
commentCount.classList.add('visually-hidden');
commentLoader.classList.add('visually-hidden');
