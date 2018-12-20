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
var ESC_KEYCODE = 27;

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
    if (evt.keyCode === ESC_KEYCODE) {
      bigPicture.remove();
    }
  });

  bigPicture.querySelector('.cancel').addEventListener('click', function (evt) {
    evt.stopPropagation();

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

//  Загружаемая картинка
var uploadPicture = function () {
  // Генерация шаблона
  var pictureTemplate = document.querySelector('#img-upload__overlay')
      .content
      .cloneNode(true)
      .querySelector('.img-upload__overlay');

  // вставляем элемент в дом
  var imageUploadForm = document.querySelector('.img-upload__form');
  imageUploadForm.appendChild(pictureTemplate);

  // Работа с эффектами
  var mainImage = imageUploadForm.querySelector('.img-upload__preview img');
  var effectsContainer = imageUploadForm.querySelector('.effects');
  imageUploadForm.querySelector('.effect-level').classList.add('hidden');

  var addOnlyOneClassToImage = function (classString) {
    var image = mainImage;
    var classes = image.classList;

    for (var i = 1; i <= classes.length; i++) {
      classes.remove(classes[0]);
    }

    classes.add(classString);
  };

  // оригинал
  var original = effectsContainer.querySelector('#effect-none');
  original.addEventListener('click', function () {
    addOnlyOneClassToImage();
    imageUploadForm.querySelector('.effect-level').classList.add('hidden');
  });

  // Функция для разных эффектов
  var addOtherEffect = function (effect) {
    var effectClass = 'effects__preview--' + effect;
    var effectId = '#effect-' + effect;
    var effectName = effectsContainer.querySelector(effectId);
    effectName.addEventListener('click', function () {
      addOnlyOneClassToImage(effectClass);
      imageUploadForm.querySelector('.effect-level').classList.remove('hidden');
    });
  };

  var formSubmitButton = imageUploadForm.querySelector('#upload-submit');

  formSubmitButton.addEventListener('click', function () {

    var hashtagInput = imageUploadForm.querySelector('.text__hashtags');
    var totalHashtags = hashtagInput.value.split(' ');

    if (totalHashtags.length > 5) {
      hashtagInput.setCustomValidity('Нужно уменьшить количество хэштэгов, хотя бы до пяти');
      return;
    }

    // Проверка на повторяющиеся хэштеги
    for (var j = 0; j < totalHashtags.length; j++) {

      for (var m = 0; m < totalHashtags.length; m++) {

        if (j === m) {
          continue;
        }

        if (totalHashtags[j] === totalHashtags[m]) {
          hashtagInput.setCustomValidity('Не должно быть повторяющихся хэштэгов');
          return;
        }

      }
    }

    // Проверка хэштэгов
    for (var i = 0; i < totalHashtags.length; i++) {
      if (totalHashtags[i] === '') {
        hashtagInput.setCustomValidity('');
      } else if (totalHashtags[i] === '#') {
        hashtagInput.setCustomValidity('Хэштэг не может состоять из одной решётки');
        return;
      } else if (totalHashtags[i].length > 20) {
        hashtagInput.setCustomValidity('Хэштэг не может состоять больше, чем из 20 символов');
        return;
      } else if (totalHashtags[i].charAt(0) !== '#') {
        hashtagInput.setCustomValidity('Хэштэг должен начинаться с решётки');
        return;
      }
    }

    hashtagInput.setCustomValidity('');

  });

  // Закрытие попапа
  var onEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      document.getElementById('upload-file').value = '';
      pictureTemplate.remove();
    }
  };

  pictureTemplate.addEventListener('keydown', onEscPress);

  pictureTemplate.querySelector('.cancel').addEventListener('click', function (evt) {
    evt.stopPropagation();

    document.getElementById('upload-file').value = '';

    pictureTemplate.remove();
  });


  // Проверка исключений нажатий на esc
  var exceptionTextAreaElement = pictureTemplate.querySelector('.text__description');
  var exceptionInputElement = pictureTemplate.querySelector('.text__hashtags');

  var checkException = function (exception) {
    exception.addEventListener('focus', function () {
      pictureTemplate.removeEventListener('keydown', onEscPress);
    });

    exception.addEventListener('focusout', function () {
      pictureTemplate.addEventListener('keydown', onEscPress);
    });
  };

  checkException(exceptionInputElement);
  checkException(exceptionTextAreaElement);

  // разные фильтры
  addOtherEffect('chrome');
  addOtherEffect('sepia');
  addOtherEffect('marvin');
  addOtherEffect('phobos');
  addOtherEffect('heat');

};


// Открытие изображения, как "БОЛЬШОЙ КАРТИНКИ" через делегирование
var pictureList = document.querySelector('.pictures');

pictureList.addEventListener('click', function (evt) {
  var pictureItems = pictureList.querySelectorAll('.picture');
  var picturesArray = Array.from(pictureItems);
  var target = evt.target;

  while (target !== pictureList) {
    if (target.tagName === 'A') {
      var index = picturesArray.indexOf(target);
      createBigPicture(posts[index]);
      return;
    }
    target = target.parentNode;
  }
});

var uploadFile = document.querySelector('#upload-file');
uploadFile.addEventListener('change', function (evt) {
  evt.preventDefault();
  uploadPicture();
});

// ВЫЗОВЫ
var posts = createPostsArray();
createPhotos(posts);
