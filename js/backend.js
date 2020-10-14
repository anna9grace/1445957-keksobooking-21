'use strict';

(function () {
  const TIMEOUT = 10000;
  const URL_POST = `https://21.javascript.pages.academy/keksobooking`;
  const URL_GET = `https://21.javascript.pages.academy/keksobooking/data`;
  const statusCode = {
    OK: 200,
  };

  const connectServer = (onSuccess, onError, type, url, data = ``) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(type, url);
    xhr.send(data);

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


  const load = (onSuccess, onError) => {
    connectServer(onSuccess, onError, `GET`, URL_GET);
  };


  const publish = (data, onSuccess, onError) => {
    connectServer(onSuccess, onError, `POST`, URL_POST, data);
  };


  window.backend = {
    load,
    publish,
  };
})();
