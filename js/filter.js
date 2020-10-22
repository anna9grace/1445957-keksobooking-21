'use strict';

const filters = document.querySelector(`.map__filters`);
const typeOption = document.querySelector(`#housing-type`);
const priceOption = document.querySelector(`#housing-price`);
const roomsOption = document.querySelector(`#housing-rooms`);
const guestsOption = document.querySelector(`#housing-guests`);
const Prices = {
  LOW: {
    MIN: 0,
    MAX: 9999,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50001,
    MAX: 10000000,
  },
};


const filterType = (element) => {
  return typeOption.value !== `any` ? element.offer.type === typeOption.value : true;
};

const filterPrice = (element) => {
  return priceOption.value !== `any`
    ? element.offer.price <= Prices[priceOption.value.toUpperCase()].MAX &&
      element.offer.price >= Prices[priceOption.value.toUpperCase()].MIN
    : true;
};

const filterRooms = (element) => {
  return roomsOption.value !== `any` ? element.offer.rooms.toString() === roomsOption.value : true;
};

const filterGuests = (element) => {
  return guestsOption.value !== `any` ? element.offer.guests.toString() === guestsOption.value : true;
};

const filterFeatures = (element) => {
  const chosenOptions = Array.from(filters.querySelectorAll(`input:checked`));
  return chosenOptions.every((option)=> {
    return element.offer.features.indexOf(option.value) !== -1;
  });
};


const applyFilters = () => {
  window.map.closeAdvertCard();

  window.page.filteredAdverts = window.page.adverts.filter((advert) => {
    return filterType(advert) && filterPrice(advert) && filterRooms(advert) &&
      filterGuests(advert) && filterFeatures(advert);
  });
  window.pin.renderMapPins(window.page.filteredAdverts);
};

const onFilterChange = window.util.debounce(applyFilters);


filters.addEventListener(`change`, onFilterChange);
