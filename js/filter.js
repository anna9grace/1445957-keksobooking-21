'use strict';

(function () {
  const filters = document.querySelector(`.map__filters`);
  const typeOption = document.querySelector(`#housing-type`);


  let filterType = (advert) => {
    if (typeOption.value !== `any`) {
      return advert.offer.type === typeOption.value;
    }
    return advert.offer.type;
  };


  const onFilterChange = () => {
    window.map.closeAdvertCard();

    window.page.filteredAdverts = window.page.adverts.filter((advert) => {
      return filterType(advert);
    });

    window.pin.renderMapPins(window.page.filteredAdverts);
  };

  filters.addEventListener(`change`, onFilterChange);
})();
