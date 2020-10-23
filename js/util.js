'use strict';

const onDataLoadError = (message) => {
  const element = document.createElement(`div`);
  element.style.zIndex = `100`;
  element.style.textAlign = `center`;
  element.style.color = `red`;
  element.style.backgroundColor = `white`;
  element.style.position = `absolute`;
  element.style.left = 0;
  element.style.right = 0;
  element.style.fontSize = `20px`;

  element.textContent = message;
  document.body.insertAdjacentElement(`afterbegin`, element);
};


const debounce = (cb, timeout = 500) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, timeout);
  };
};

window.util = {
  onDataLoadError,
  debounce,
};
