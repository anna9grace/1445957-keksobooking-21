'use strict';

(function () {
  const formFields = document.querySelectorAll(`.map__features, .map__filter, .ad-form fieldset`);
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


  // activate page

  const onDataLoad = (data) => {
    window.pin.renderNearbyMapPins(data);
    map.addEventListener(`click`, window.map.onMapPinClick.bind(null, data));
  };

  const setActivePageState = () => {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    enableFormFields(formFields);
    window.map.renderPinCoordinates(1, window.constants.MAIN_PIN_POINTER_SIZE);
    window.form.checkRoomsValidity();
    window.backend.load(onDataLoad, window.util.showErrorMessage);

    mapPinMain.removeEventListener(`mousedown`, window.map.onMainPinClick);
    mapPinMain.removeEventListener(`keydown`, window.map.onMainPinKeydown);
  };


  window.page = {
    setActivePageState,
    disableFormFields,
  };
})();
