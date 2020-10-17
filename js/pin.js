'use strict';

(function () {
  const MAP_PIN_WIDTH = 50;
  const MAP_PIN_HEIGHT = 70;
  const MAX_PINS_NUMBER = 5;
  const mapPinsList = document.querySelector(`.map__pins`);
  const templateMapPin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);


  // create an element: advert's map-pin

  const renderMapPin = (advert) => {
    const mapPinElement = templateMapPin.cloneNode(true);

    mapPinElement.querySelector(`img`).src = advert.author.avatar;
    mapPinElement.querySelector(`img`).alt = advert.offer.title;
    mapPinElement.style.left = advert.location.x - MAP_PIN_WIDTH / 2 + `px`;
    mapPinElement.style.top = advert.location.y - MAP_PIN_HEIGHT + `px`;
    return mapPinElement;
  };

  // create map-pins for existing adverts

  const renderMapPins = (adverts) => {
    let numberOfPins = (MAX_PINS_NUMBER < adverts.length) ? MAX_PINS_NUMBER : adverts.length;
    for (let pin of document.querySelectorAll(`.map__pin:not(:first-of-type)`)) {
      pin.remove();
    }
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numberOfPins; i++) {
      fragment.appendChild(renderMapPin(adverts[i]));
    }
    return mapPinsList.appendChild(fragment);
  };

  window.pin = {
    renderMapPins,
  };
})();
