'use strict';

(function () {
  const CONTENT_TOP = 130;
  const CONTENT_BOTTOM = 630;
  const MAIN_PIN_HEIGHT = window.constants.MAIN_PIN_SIZE + window.constants.MAIN_PIN_POINTER_SIZE;
  const map = document.querySelector(`.map`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const mapTopY = CONTENT_TOP - MAIN_PIN_HEIGHT;
  const mapBottomY = CONTENT_BOTTOM - MAIN_PIN_HEIGHT;
  const mapLeftX = 0 - window.constants.MAIN_PIN_SIZE / 2;


  // calculate pin's position

  const calculatePinPositon = (coordinates, start, end, property) => {
    if (coordinates < start) {
      mapPinMain.style[property] = start + `px`;
    } else if (coordinates > end) {
      mapPinMain.style[property] = end + `px`;
    } else {
      mapPinMain.style[property] = coordinates + `px`;
    }
  };

  // handle main pin's moving event

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    const startCoordinates = {
      x: evt.clientX,
      y: evt.clientY,
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY,
      };

      startCoordinates.x = moveEvt.clientX;
      startCoordinates.y = moveEvt.clientY;


      const pinNewCoordinates = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y,
      };

      const mapRightX = map.offsetWidth - window.constants.MAIN_PIN_SIZE / 2;

      calculatePinPositon(pinNewCoordinates.x, mapLeftX, mapRightX, `left`);
      calculatePinPositon(pinNewCoordinates.y, mapTopY, mapBottomY, `top`);
      window.map.renderPinCoordinates(1, window.constants.MAIN_PIN_POINTER_SIZE);
    };

    map.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, (upEvt) => {
      upEvt.preventDefault();
      map.removeEventListener(`mousemove`, onMouseMove);
    });
  });
})();
