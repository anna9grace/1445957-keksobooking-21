'use strict';

(function () {
  const formFields = document.querySelectorAll(`.map__features, .map__filter, .ad-form fieldset`);
  const MAIN_PIN_POINTER_SIZE = 22;
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const mapPinMain = document.querySelector(`.map__pin--main`);


  // set to default inactive state

  const disableFormFields = (fields) => {
    for (let field of fields) {
      field.setAttribute(`disabled`, `disabled`);
    }
  };

  const enableFormFields = (fields) => {
    for (let field of fields) {
      field.removeAttribute(`disabled`);
    }
  };

  disableFormFields(formFields);
  window.map.renderPinCoordinates();

  // activate page

  const setActivePageState = () => {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    enableFormFields(formFields);
    window.map.renderPinCoordinates(1, MAIN_PIN_POINTER_SIZE);
    window.pin.renderNearbyMapPins();
    window.form.checkRoomsValidity();

    mapPinMain.removeEventListener(`mousedown`, window.map.onMainPinClick);
    mapPinMain.removeEventListener(`keydown`, window.map.onMainPinKeydown);
    map.addEventListener(`click`, window.map.onMapPinClick);
  };

  window.page = {
    setActivePageState,
  };
})();
