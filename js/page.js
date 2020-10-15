'use strict';

(function () {
  const formFields = document.querySelectorAll(`.map__features, .map__filter, .ad-form fieldset`);
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const filters = document.querySelector(`.map__filters`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const resetButton = document.querySelector(`.ad-form__reset`);
  const URL_GET = `https://21.javascript.pages.academy/keksobooking/data`;


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
    window.backend.sendRequest(URL_GET, `GET`, onDataLoad, window.util.onErrorMessage);

    resetButton.addEventListener(`click`, () => {
      resetPage();
    });
    mapPinMain.removeEventListener(`mousedown`, window.map.onMainPinClick);
    mapPinMain.removeEventListener(`keydown`, window.map.onMainPinKeydown);
  };

  // reset page

  const resetPage = () => {
    for (let pin of document.querySelectorAll(`.map__pin:not(:first-of-type)`)) {
      pin.remove();
    }

    mapPinMain.style.left = window.main.mainPinDefaultPosition.x + `px`;
    mapPinMain.style.top = window.main.mainPinDefaultPosition.y + `px`;
    adForm.reset();
    filters.reset();
    window.form.checkPriceValidity();
    window.map.closeAdvertCard();
    window.map.renderPinCoordinates(0.5, 0);
    disableFormFields(formFields);


    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);

    resetButton.removeEventListener(`click`, () => {
      resetPage();
    });
    mapPinMain.addEventListener(`mousedown`, window.map.onMainPinClick);
    mapPinMain.addEventListener(`keydown`, window.map.onMainPinKeydown);
  };


  window.page = {
    setActivePageState,
    disableFormFields,
    resetPage,
  };
})();
