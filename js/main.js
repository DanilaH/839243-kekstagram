'use strict';

// var window.utils.IMAGE_URL = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
// var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
// var NAMES = ['Артём', 'Анастасия', 'Денис', 'Женя', 'Николай', 'Егор', 'Арчибальд', 'Виктор', 'Саша', 'Олег', 'Константин', 'Юрий', 'Пират', 'Гораций'];
// var MIN_LIKES = 15;
// var MAX_LIKES = 200;
// var MIN_AVATAR = 1;
// var MAX_AVATAR = 6;
// var MIN_COMMENTS_LENGTH = 2;
// var MAX_COMMENTS_LENGTH = 10;
// var TOTAL_OBJECTS = 25;
// var window.utils.ESC_KEYCODE = 27;

//  Случайное значение из массива
// var getRandomFromArray = function (array) {
//   var random = array[Math.floor(Math.random() * array.length)];

//   return random;
// };

// // Неповторяющееся случайное значение
// var getKindOfRandomFromArray = function (array) {
//   var random = getRandomFromArray(array);
//   //  Нахождение индекса выпавшего элемента
//   var index = array.indexOf(random);
//   //  Удаление этого индекса из массива, дабы он при следующем рандоме не выпал
//   array.splice(index, 1);
//   return random;
// };

// // Случайное число
// var getRandomNumber = function (min, max) {
//   var random = Math.floor(Math.random() * (max - min)) + min;
//   return random;
// };

// Массив объектов с комментариями
// var createComment = function () {
//   var commentary = {
//     avatar: 'img/avatar-' + window.getRandom.getRandomNumber(window.utils.MIN_AVATAR, window.utils.MAX_AVATAR) + '.svg',
//     message: window.getRandom.getRandomFromArray(window.utils.COMMENTS),
//     name: window.getRandom.getRandomFromArray(window.utils.NAMES)
//   };
//   return commentary;
// };

// var createCommentsArray = function () {
//   var commentaries = [];
//   commentaries.length = window.getRandom.getRandomNumber(window.utils.MIN_COMMENTS_LENGTH, window.utils.MAX_COMMENTS_LENGTH);

//   for (var i = 0; i < commentaries.length; i++) {
//     commentaries[i] = createComment();
//   }

//   return commentaries;
// };


//  "Полноценные" объекты
// var createPost = function () {
//   var post = {
//     url: window.getRandom.getKindOfRandomFromArray(window.utils.IMAGE_URL),
//     likes: window.getRandom.getRandomNumber(window.utils.MIN_LIKES, window.utils.MAX_LIKES),
//     comments: createCommentsArray()
//   };
//   return post;
// };

// var createPostsArray = function () {
//   var posts = [];
//   posts.length = window.utils.TOTAL_OBJECTS;

//   for (var i = 0; i < posts.length; i++) {
//     posts[i] = createPost();
//   }

//   return posts;
// };

// //  Создание DOM элементов
// var createPhotos = function (posts) {
//   var similarPhotoTemplate = document.querySelector('#picture')
//     .content
//     .querySelector('.picture');

//   var createPostElement = function (samePosts, template) {
//     var postElement = template.cloneNode(true);

//     postElement.querySelector('.picture__img').setAttribute('src', 'photos/' + samePosts.url + '.jpg');
//     postElement.querySelector('.picture__likes').textContent = samePosts.likes;
//     postElement.querySelector('.picture__comments').textContent = samePosts.comments.length;

//     return postElement;
//   };

//   var createPostElements = function (samePosts) {
//     var fragment = document.createDocumentFragment();
//     for (var i = 0; i < samePosts.length; i++) {
//       fragment.appendChild(createPostElement(samePosts[i], similarPhotoTemplate));
//     }
//     return fragment;
//   };

//   var elements = createPostElements(posts);

//   var pictures = document.querySelector('.pictures');
//   pictures.appendChild(elements);
// };

//  ВЫВОД "БОЛЬШОЙ КАРТИНКИ"
// var createBigPicture = function (post) {
//   // Информация из первого сгенерированного поста
//   var bigPicture = document.querySelector('#big-picture')
//       .content
//       .cloneNode(true)
//       .querySelector('.big-picture');

//   var main = document.querySelector('#main');
//   main.appendChild(bigPicture);

//   bigPicture.querySelector('.big-picture__img img').setAttribute('src', 'photos/' + post.url + '.jpg');
//   bigPicture.querySelector('.likes-count').textContent = post.likes;
//   bigPicture.querySelector('.social__caption').textContent = 'Бла-бла-бла, описание фотографии';

//   //  Рисование комментариев под "БОЛЬШОЙ КАРТИНКОЙ"
//   var commentTemplate = document.querySelector('#social__comment')
//       .content
//       .querySelector('.social__comment');

//   var createCommentElement = function (samePost, template) {
//     var commentElement = template.cloneNode(true);

//     commentElement.querySelector('.social__picture').setAttribute('src', samePost.avatar);
//     commentElement.querySelector('.social__text').textContent = samePost.message;

//     return commentElement;
//   };

//   var createCommentElements = function () {
//     var fragment = document.createDocumentFragment();
//     for (var i = 0; i < post.comments.length; i++) {
//       fragment.appendChild(createCommentElement(post.comments[i], commentTemplate));
//     }
//     return fragment;
//   };

//   // Закрытие попапа
//   bigPicture.addEventListener('keydown', function (evt) {
//     if (evt.keyCode === window.utils.ESC_KEYCODE) {
//       bigPicture.remove();
//     }
//   });

//   bigPicture.querySelector('.cancel').addEventListener('click', function (evt) {
//     evt.preventDefault();

//     bigPicture.remove();
//   });

//   // Вызов отрисовывающе-добавляющей функии
//   var elements = createCommentElements();

//   var commentsList = document.querySelector('.social__comments');
//   commentsList.appendChild(elements);

//   var commentCount = bigPicture.querySelector('.social__comment-count');
//   var commentLoader = bigPicture.querySelector('.comments-loader');

//   commentCount.classList.add('visually-hidden');
//   commentLoader.classList.add('visually-hidden');
// };

//  Загружаемая картинка
// var uploadPicture = function () {
//   // Генерация шаблона
//   var pictureTemplate = document.querySelector('#img-upload__overlay')
//       .content
//       .cloneNode(true)
//       .querySelector('.img-upload__overlay');

//   // вставляем элемент в дом
//   var imageUploadForm = document.querySelector('.img-upload__form');
//   imageUploadForm.appendChild(pictureTemplate);

//   // Работа с эффектами
//   var mainImage = imageUploadForm.querySelector('.img-upload__preview img');
//   var effectsContainer = imageUploadForm.querySelector('.effects');
//   var sliderContainer = document.querySelector('.effect-level');
//   sliderContainer.classList.add('hidden');

//   var addOnlyOneClassToImage = function (classString) {
//     var image = mainImage;
//     var classes = image.classList;

//     for (var i = 1; i <= classes.length; i++) {
//       classes.remove(classes[0]);
//     }

//     classes.add(classString);
//   };

//   // Функция для разных эффектов
//   var addOtherEffect = function (effect) {

//     var effectClass = 'effects__preview--' + effect;

//     addOnlyOneClassToImage(effectClass);
//     sliderContainer.classList.remove('hidden');
//     mainImage.classList.remove('effects__preview--none');

//   };

//   // Переменные для слайдера
//   var sliderLine = sliderContainer.querySelector('.effect-level__line');
//   var sliderPin = sliderContainer.querySelector('.effect-level__pin');
//   var sliderDepthLine = sliderContainer.querySelector('.effect-level__depth');
//   var filterInput = sliderContainer.querySelector('.effect-level__value');

//   // СЛАЙДЕР
//   // Значения по умолчанию
//   sliderPin.style.left = 100 + '%';
//   sliderDepthLine.style.width = 100 + '%';

//   // Сброс на значение по умолчанию при клике на другой фильтр
//   effectsContainer.addEventListener('click', function () {
//     sliderPin.style.left = 100 + '%';
//     sliderDepthLine.style.width = 100 + '%';
//     filterInput.setAttribute('value', 100);
//   });

//   sliderPin.addEventListener('mousedown', function (evt) {
//     evt.preventDefault();

//     //  Получить уоординаты элемента
//     var getCoords = function (element) {

//       var box = element.getBoundingClientRect();

//       return {
//         top: box.top + pageYOffset,
//         left: box.left + pageXOffset
//       };

//     };

//     var sliderPinCoords = getCoords(sliderPin);
//     var xCoord = evt.pageX - sliderPinCoords.left;

//     var sliderLineCoords = getCoords(sliderLine);

//     var onMouseMove = function (moveEvt) {
//       moveEvt.preventDefault();

//       var leftSide = moveEvt.pageX - xCoord - sliderLineCoords.left;

//       if (leftSide < 0) {
//         leftSide = 0;
//       }

//       var rightSide = sliderLine.offsetWidth;
//       if (leftSide > rightSide) {
//         leftSide = rightSide;
//       }

//       sliderPin.style.left = leftSide + 'px';
//       sliderDepthLine.style.width = (leftSide + xCoord / sliderLine.offsetWidth) + 'px';

//       //  Запись значения в инпут
//       var valueOfFilterInput = (sliderDepthLine.offsetWidth / sliderLine.offsetWidth) * 100;
//       filterInput.setAttribute('value', valueOfFilterInput);

//       //  Запись в фильтры
//       //  CHROME
//       if (mainImage.classList.contains('effects__preview--chrome')) {
//         mainImage.style.filter = 'grayscale(' + (sliderDepthLine.offsetWidth / sliderLine.offsetWidth) + ')';

//       //  SEPIA
//       } else if (mainImage.classList.contains('effects__preview--sepia')) {
//         mainImage.style.filter = 'sepia(' + sliderDepthLine.offsetWidth / sliderLine.offsetWidth + ')';

//       //  MARVIN
//       } else if (mainImage.classList.contains('effects__preview--marvin')) {
//         mainImage.style.filter = 'invert(' + (sliderDepthLine.offsetWidth / sliderLine.offsetWidth) * 100 + '%)';

//       //  PHOBOS
//       } else if (mainImage.classList.contains('effects__preview--phobos')) {
//         mainImage.style.filter = 'blur(' + sliderDepthLine.offsetWidth / sliderLine.offsetWidth * 3 + 'px)';

//       //  HEAT
//       } else if (mainImage.classList.contains('effects__preview--heat')) {
//         mainImage.style.filter = 'brightness(' + sliderDepthLine.offsetWidth / sliderLine.offsetWidth * 3 + ')';
//       }

//     };

//     var onMouseUp = function (upEvt) {
//       upEvt.preventDefault();

//       document.removeEventListener('mousemove', onMouseMove);
//       document.removeEventListener('mouseup', onMouseUp);
//     };

//     document.addEventListener('mousemove', onMouseMove);
//     document.addEventListener('mouseup', onMouseUp);
//   });

//   // О поле с хэштэгами
//   var formSubmitButton = imageUploadForm.querySelector('#upload-submit');

//   formSubmitButton.addEventListener('click', function () {

//     var hashtagInput = imageUploadForm.querySelector('.text__hashtags');
//     var totalHashtags = hashtagInput.value.split(' ');

//     if (totalHashtags.length > 5) {
//       hashtagInput.setCustomValidity('Нужно уменьшить количество хэштэгов, хотя бы до пяти');
//       return;
//     }

//     // Проверка на повторяющиеся хэштеги
//     for (var j = 0; j < totalHashtags.length; j++) {

//       for (var m = 0; m < totalHashtags.length; m++) {

//         if (j === m) {
//           continue;
//         }

//         if (totalHashtags[j] === totalHashtags[m]) {
//           hashtagInput.setCustomValidity('Не должно быть повторяющихся хэштэгов');
//           return;
//         }

//       }
//     }

//     // Проверка хэштэгов
//     for (var i = 0; i < totalHashtags.length; i++) {
//       if (totalHashtags[i] === '') {
//         hashtagInput.setCustomValidity('');
//       } else if (totalHashtags[i] === '#') {
//         hashtagInput.setCustomValidity('Хэштэг не может состоять из одной решётки');
//         return;
//       } else if (totalHashtags[i].length > 20) {
//         hashtagInput.setCustomValidity('Хэштэг не может состоять больше, чем из 20 символов');
//         return;
//       } else if (totalHashtags[i].charAt(0) !== '#') {
//         hashtagInput.setCustomValidity('Хэштэг должен начинаться с решётки');
//         return;
//       }
//     }

//     hashtagInput.setCustomValidity('');

//   });

//   // Закрытие попапа
//   var onEscPress = function (evt) {
//     if (evt.keyCode === window.utils.ESC_KEYCODE) {
//       document.querySelector('#upload-file').value = '';
//       pictureTemplate.remove();
//     }
//   };

//   pictureTemplate.addEventListener('keydown', onEscPress);

//   pictureTemplate.querySelector('.cancel').addEventListener('click', function (evt) {
//     evt.preventDefault();

//     document.querySelector('#upload-file').value = '';

//     pictureTemplate.remove();
//   });


//   // Проверка исключений нажатий на esc
//   var exceptionTextAreaElement = pictureTemplate.querySelector('.text__description');
//   var exceptionInputElement = pictureTemplate.querySelector('.text__hashtags');

//   var checkException = function (exception) {
//     exception.addEventListener('focus', function () {
//       pictureTemplate.removeEventListener('keydown', onEscPress);
//     });

//     exception.addEventListener('focusout', function () {
//       pictureTemplate.addEventListener('keydown', onEscPress);
//     });
//   };

//   checkException(exceptionInputElement);
//   checkException(exceptionTextAreaElement);


//   // разные фильтры
//   // оригинал
//   effectsContainer.querySelector('#effect-none')
//     .addEventListener('click', function () {
//       mainImage.classList.add('effects__preview--none');
//       mainImage.style.filter = 'none';
//       sliderContainer.classList.add('hidden');
//     });


//   // CHROME
//   effectsContainer.querySelector('#effect-chrome')
//     .addEventListener('click', function () {
//       addOtherEffect('chrome');
//       mainImage.style.filter = 'grayscale(1)';
//     });


//   // SEPIA
//   effectsContainer.querySelector('#effect-sepia')
//     .addEventListener('click', function () {
//       addOtherEffect('sepia');
//       mainImage.style.filter = 'sepia(1)';
//     });


//   // MARVIN
//   effectsContainer.querySelector('#effect-marvin')
//     .addEventListener('click', function () {
//       addOtherEffect('marvin');
//       mainImage.style.filter = 'invert(100%)';
//     });


//   // PHOBOS
//   effectsContainer.querySelector('#effect-phobos')
//     .addEventListener('click', function () {
//       addOtherEffect('phobos');
//       mainImage.style.filter = 'blur(3px)';
//     });


//   // HEAT
//   effectsContainer.querySelector('#effect-heat')
//     .addEventListener('click', function () {
//       addOtherEffect('heat');
//       mainImage.style.filter = 'brightness(3)';
//     });


// };


// Открытие изображения, как "БОЛЬШОЙ КАРТИНКИ" через делегирование
// var pictureList = document.querySelector('.pictures');

// pictureList.addEventListener('click', function (evt) {
//   var pictureItems = pictureList.querySelectorAll('.picture');
//   var picturesArray = Array.from(pictureItems);
//   var target = evt.target;

//   while (target && target !== pictureList) {
//     if (target.classList.contains('picture')) {
//       var index = picturesArray.indexOf(target);
//       createBigPicture(posts[index]);
//       return;
//     }
//     target = target.parentNode;
//   }
// });

// var uploadFile = document.querySelector('#upload-file');
// uploadFile.addEventListener('change', function (evt) {
//   evt.preventDefault();
//   uploadPicture();
// });

// ВЫЗОВЫ
// var posts = createPostsArray();
// createPhotos(posts);
