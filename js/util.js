'use strict';

(function () {
  const getRandomInt = (max = 100, min = 0) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomArrayElement = (arr) => {
    const randomElement = Math.floor(Math.random() * arr.length);
    return arr[randomElement];
  };

  window.util = {
    getRandomInt,
    getRandomArrayElement,
  };
})();
