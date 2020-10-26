'use strict';

const TIMEOUT = 10000;
const StatusCode = {
  OK: 200,
};

const sendRequest = (url, method, onSuccess, onError, data = ``) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.open(method, url);
  xhr.send(data);

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
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
  sendRequest,
};
