'use strict';

(function () {
  const filters = document.querySelectorAll(`.map__filter, .map__checkbox`);
  const typeOption = document.querySelector(`#housing-type`);


  const onFilterChange = () => {
    window.map.closeAdvertCard();

    window.page.filteredAdverts = (typeOption.value === `any`)
      ? window.page.adverts
      : window.page.adverts.filter((element) => {
        return element.offer.type === typeOption.value;
      });

    window.page.renderNearbyPins();
  };


  for (let filter of filters) {
    filter.addEventListener(`change`, onFilterChange);
  }

})();
