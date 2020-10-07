'use strict';

(function () {
  const minPrice = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalow: 0,
  };
  const adForm = document.querySelector(`.ad-form`);
  const roomOption = adForm.querySelector(`#room_number`);
  const guestOption = adForm.querySelector(`#capacity`);
  const priceField = adForm.querySelector(`#price`);
  const typeOption = adForm.querySelector(`#type`);
  const timeInOption = adForm.querySelector(`#timein`);
  const timeOutOption = adForm.querySelector(`#timeout`);


  // validate rooms' capacity

  const checkRoomsValidity = () => {
    let rooms = +roomOption.value;
    let guests = +guestOption.value;

    if (rooms === window.constants.MAX_CAPACITY && guests !== 0) {
      guestOption.setCustomValidity(`Это жилье не для гостей. Выберите подходящий вариант`);
    } else if (rooms !== window.constants.MAX_CAPACITY && guests === 0) {
      guestOption.setCustomValidity(`Выберите количество гостей`);
    } else if (rooms === 2 && guests > 2) {
      guestOption.setCustomValidity(`Подходит максимум для двух гостей. Выберите другой вариант`);
    } else if (rooms === 1 && guests > 1) {
      guestOption.setCustomValidity(`Подходит только для одного гостя. Выберите подходящий вариант`);
    } else {
      guestOption.setCustomValidity(``);
    }
    guestOption.reportValidity();
  };

  // validate price per night

  const checkPriceValidity = () => {
    let type = typeOption.value;
    priceField.min = minPrice[type];
    priceField.placeholder = minPrice[type];
  };

  roomOption.addEventListener(`change`, checkRoomsValidity);
  guestOption.addEventListener(`change`, checkRoomsValidity);
  typeOption.addEventListener(`change`, checkPriceValidity);
  timeInOption.addEventListener(`change`, () => {
    timeOutOption.value = timeInOption.value;
  });
  timeOutOption.addEventListener(`change`, () => {
    timeInOption.value = timeOutOption.value;
  });

  window.form = {
    checkRoomsValidity,
  };
})();
