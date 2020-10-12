'use strict';

(function () {
  const map = document.querySelector(`.map`);

  const onDataLoad = (data) => {
    window.pin.renderNearbyMapPins(data);
    map.addEventListener(`click`, window.map.onMapPinClick.bind(null, data));
  };

  window.data = {
    onDataLoad,
  };
})();
