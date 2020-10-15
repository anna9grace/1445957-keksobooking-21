'use strict';

(function () {
  const formFields = document.querySelectorAll(`.map__features, .map__filter, .ad-form fieldset`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const mainPinDefaultPosition = {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop,
  };

  window.page.disableFormFields(formFields);
  window.map.renderPinCoordinates();

  window.main = {
    mainPinDefaultPosition,
  };
})();
