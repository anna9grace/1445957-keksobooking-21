'use strict';

(function () {
  const MAIN_PIN_SIZE = 65;
  const map = document.querySelector(`.map`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const addressField = document.querySelector(`#address`);

  // calculate main pin's coordinates

  const renderPinCoordinates = (pinHeightScale = 0.5, pointerSize = 0) => {
    const mainPinX = mapPinMain.offsetLeft + MAIN_PIN_SIZE * 0.5;
    const mainPinY = mapPinMain.offsetTop + MAIN_PIN_SIZE * pinHeightScale + pointerSize;
    addressField.value = Math.round(mainPinX) + `, ` + Math.round(mainPinY);
  };

  // handle a click event on main map-pin

  const onMainPinClick = (evt) => {
    if (evt.button === 0) {
      window.page.setActivePageState();
    }
  };

  const onMainPinKeydown = (evt) => {
    if (evt.key === `Enter`) {
      window.page.setActivePageState();
    }
  };

  mapPinMain.addEventListener(`mousedown`, onMainPinClick);
  mapPinMain.addEventListener(`keydown`, onMainPinKeydown);

  // close advert card

  const closeAdvertCard = () => {
    let card = map.querySelector(`.map__card`);
    if (card) {
      card.remove();
      document.removeEventListener(`keydown`, onPopupEscPress);
    }
  };

  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      closeAdvertCard();
    }
  };

  // open advert card

  const openAdvertCard = (target) => {
    let mapPins = map.querySelectorAll(`.map__pin:not(:first-of-type)`);

    for (let i = 0; i < mapPins.length; i++) {
      if (mapPins[i] === target) {
        window.card.renderAdvertCard(window.data.nearbyAdvertsList[i]);
      }
    }

    document.addEventListener(`keydown`, onPopupEscPress);
    map.querySelector(`.popup__close`).addEventListener(`click`, () => {
      closeAdvertCard();
    });
  };

  // handle a click event on advert's map-pin

  const onMapPinClick = (evt) => {
    let pinTarget = evt.target.closest(`.map__pin`);

    if (!pinTarget || pinTarget.classList.contains(`map__pin--main`)) {
      return;
    }

    closeAdvertCard();
    openAdvertCard(pinTarget);
  };

  window.map = {
    renderPinCoordinates,
    onMapPinClick,
    onMainPinClick,
    onMainPinKeydown,
  };
})();
