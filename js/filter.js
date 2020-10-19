'use strict';

(function () {
  const filters = document.querySelector(`.map__filters`);
  const typeOption = document.querySelector(`#housing-type`);
  const priceOption = document.querySelector(`#housing-price`);
  const roomsOption = document.querySelector(`#housing-rooms`);
  const guestsOption = document.querySelector(`#housing-guests`);
  const prices = {
    low: {
      min: 0,
      max: 9999,
    },
    middle: {
      min: 10000,
      max: 50000,
    },
    high: {
      min: 50001,
      max: 10000000,
    },
  };
  let lastTimeout;
  const TIMEOUT = 500;


  const filterType = (element) => {
    return typeOption.value !== `any` ? element.offer.type === typeOption.value : true;
  };

  const filterPrice = (element) => {
    return priceOption.value !== `any`
      ? element.offer.price <= prices[priceOption.value].max &&
        element.offer.price >= prices[priceOption.value].min
      : true;
  };

  const filterRooms = (element) => {
    return roomsOption.value !== `any` ? element.offer.rooms.toString() === roomsOption.value : true;
  };

  const filterGuests = (element) => {
    return guestsOption.value !== `any` ? element.offer.guests.toString() === guestsOption.value : true;
  };

  const filterFeatures = (element) => {
    const chosenOptions = filters.querySelectorAll(`input:checked`);
    let fit = true;

    if (chosenOptions.length === 0) {
      return true;
    }
    for (let option of chosenOptions) {
      if (element.offer.features.indexOf(option.value) < 0) {
        fit = false;
      }
    }
    return fit;
  };


  const applyFilters = () => {
    window.map.closeAdvertCard();

    window.page.filteredAdverts = window.page.adverts.filter((advert) => {
      return filterType(advert) && filterPrice(advert) && filterRooms(advert) &&
        filterGuests(advert) && filterFeatures(advert);
    });
    window.pin.renderMapPins(window.page.filteredAdverts);
  };


  const onFilterChange = () => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(applyFilters, TIMEOUT);
  };


  filters.addEventListener(`change`, onFilterChange);
})();
