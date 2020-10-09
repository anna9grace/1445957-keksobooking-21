'use strict';

(function () {
  const MAX_CAPACITY = 100;
  const MAIN_PIN_POINTER_SIZE = 22;
  const MAIN_PIN_SIZE = 65;

  const accomodationType = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`,
  };

  window.constants = {
    MAX_CAPACITY,
    MAIN_PIN_POINTER_SIZE,
    accomodationType,
    MAIN_PIN_SIZE,
  };
})();
