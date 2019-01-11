'use strict';

(function () {
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

  window.utils = {
    IMAGE_URL: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'],
    COMMENTS: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
    NAMES: ['Артём', 'Анастасия', 'Денис', 'Женя', 'Николай', 'Егор', 'Арчибальд', 'Виктор', 'Саша', 'Олег', 'Константин', 'Юрий', 'Пират', 'Гораций'],
    MIN_LIKES: 15,
    MAX_LIKES: 200,
    MIN_AVATAR: 1,
    MAX_AVATAR: 6,
    MIN_COMMENTS_LENGTH: 2,
    MAX_COMMENTS_LENGTH: 10,
    TOTAL_OBJECTS: 25,
    ESC_KEYCODE: 27,
    COMMENTS_AMOUNT: 5,
    getRandomFromArray: getRandomFromArray,
    getKindOfRandomFromArray: getKindOfRandomFromArray,
    getRandomNumber: getRandomNumber
  };
})();
