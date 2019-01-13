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
    ESC_KEYCODE: 27,
    COMMENTS_AMOUNT: 5,
    getRandomFromArray: getRandomFromArray,
    getKindOfRandomFromArray: getKindOfRandomFromArray,
    getRandomNumber: getRandomNumber
  };
})();
