'use strict';

const URL_GET = `https://21.javascript.pages.academy/keksobooking/data`;
const formFields = document.querySelectorAll(`.map__filters, .ad-form`);
const map = document.querySelector(`.map`);
const adForm = document.querySelector(`.ad-form`);
const filters = document.querySelector(`.map__filters`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const defaultPreview = adForm.querySelector(`.ad-form__photo`).innerHTML;
const defaultAvatar = adForm.querySelector(`.ad-form-header__preview img`).src;
let adverts = [];
let filteredAdverts = [];


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

const onMapPinClick = (evt) => {
  window.map.showCurrentCard(window.page.filteredAdverts, evt);
};


const onDataLoad = (data) => {
  window.page.adverts = data;
  window.page.filteredAdverts = data;

  map.addEventListener(`click`, onMapPinClick);

  window.pin.renderMapPins(data);
  enableFormFields(filters);
};


const setActivePageState = () => {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);

  enableFormFields(adForm);
  window.map.renderPinCoordinates(1, window.constants.MAIN_PIN_POINTER_SIZE);
  window.form.checkRoomsValidity();
  window.backend.sendRequest(URL_GET, `GET`, onDataLoad, window.util.onDataLoadError);

  mapPinMain.removeEventListener(`mousedown`, window.map.onMainPinClick);
  mapPinMain.removeEventListener(`keydown`, window.map.onMainPinKeydown);
};


// reset page

const resetPage = () => {
  for (let pin of document.querySelectorAll(`.map__pin:not(:first-of-type)`)) {
    pin.remove();
  }

  filters.reset();
  adForm.reset();
  adForm.querySelector(`.ad-form__photo`).innerHTML = defaultPreview;
  adForm.querySelector(`.ad-form-header__preview img`).src = defaultAvatar;
  mapPinMain.style.left = window.main.mainPinDefaultPosition.x + `px`;
  mapPinMain.style.top = window.main.mainPinDefaultPosition.y + `px`;
  window.form.checkPriceValidity();
  window.map.closeAdvertCard();
  window.map.renderPinCoordinates(0.5, 0);
  disableFormFields(formFields);


  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);

  map.removeEventListener(`click`, onMapPinClick);

  mapPinMain.addEventListener(`mousedown`, window.map.onMainPinClick);
  mapPinMain.addEventListener(`keydown`, window.map.onMainPinKeydown);
};


window.page = {
  setActivePageState,
  disableFormFields,
  resetPage,
  adverts,
  filteredAdverts,
};
