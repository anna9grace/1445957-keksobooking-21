'use strict';

(function () {
  const TIMEOUT = 10000;
  const statusCode = {
    OK: 200,
  };

  const load = (onSuccess, onError) => {
    const URL = `https://21.javascript.pages.academy/keksobooking/data`;

    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`GET`, URL);
    xhr.send();

    xhr.addEventListener(`load`, () => {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.timeout = TIMEOUT;
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс.`);
    });
  };

  window.backend = {
    load,
  };
})();
