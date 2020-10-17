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

  const onDataLoadError = (message) => {
    const node = document.createElement(`div`);
    node.style.zIndex = `100`;
    node.style.textAlign = `center`;
    node.style.color = `red`;
    node.style.backgroundColor = `white`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `20px`;

    node.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.util = {
    getRandomInt,
    getRandomArrayElement,
    onDataLoadError,
  };
})();
