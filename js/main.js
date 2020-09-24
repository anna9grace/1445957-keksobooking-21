'use strict';


// поиск случайного числа
(function () {
  window.getRandomInt = (max = 100, min = 0) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
})();


// поиск случайного элемента массива
(function () {
  window.getRandomArrayElement = (arr) => {
    const randomElement = Math.floor(Math.random() * arr.length);
    return arr[randomElement];
  };
})();


// объявляет функцию создания массива объявлений
(function () {
  const CONTENT_TOP_Y = 130;
  const CONTENT_BOTTOM_Y = 630;

  window.getAdvertsList = (numberOfAdverts, mapWidth, maxPrice, checkInOutTime, type, titles, fullDescription, features, photos) => {
    const advertsList = [];

    for (let i = 0; i < numberOfAdverts; i++) {
      let j = (i < 10) ? (`0` + (i + 1)) : (i + 1);
      advertsList[i] = {
        author: `img/avatars/user${j}.png`,
        offer: {
          title: titles[i],
          price: window.getRandomInt(maxPrice),
          type: window.getRandomArrayElement(type),
          rooms: window.getRandomInt(),
          guests: window.getRandomInt(),
          checkin: window.getRandomArrayElement(checkInOutTime),
          checkout: window.getRandomArrayElement(checkInOutTime),
          features: features.slice(0, window.getRandomInt((features.length + 1), 1)),
          description: fullDescription,
          photos: photos.slice(0, window.getRandomInt((photos.length + 1), 1)),
        },
        location: {
          x: window.getRandomInt(mapWidth),
          y: window.getRandomInt(CONTENT_TOP_Y, CONTENT_BOTTOM_Y),
        },
      };
      advertsList[i].offer.address = advertsList[i].location.x + `, ` + advertsList[i].location.y;
    }
    return advertsList;
  };
})();


// создает массив объявлений
(function () {
  const ADVERTS_LIST_LENGTH = 8;
  const TITLES = [
    `Небольшая чистая квартира`,
    `Маленькое неуютное гнездышко`,
    `Роскошный дом в 5 часах от центра`,
    `Бунгало класса люкс`,
    `Уютное бунгало с видом трассу`,
    `Дворец, достойный Вашей мании величия`,
    `Дом в самом центре криминального района`,
    `Уютная квартира в недостроенном доме`,
  ];
  const PHOTOS = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];
  const MAX_PRICE = 1000000;
  const CHECK_IN_OUT_TIME = [`12:00`, `13:00`, `14:00`];
  const ACCOMODATION_TYPE = [`palace`, `flat`, `house`, `bungalow`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const DESCRIPTION = `Жилье расположено в историческом центре Города, всего в 100 метрах от Главной Достопримечательности. Поблизости проходят многочисленные маршруты общественного транспорта.`;

  const mapWidth = document.querySelector(`.map`).clientWidth;

  window.nearbyAdvertsList = window.getAdvertsList(ADVERTS_LIST_LENGTH, mapWidth, MAX_PRICE,
      CHECK_IN_OUT_TIME, ACCOMODATION_TYPE, TITLES, DESCRIPTION, FEATURES, PHOTOS);
  return window.nearbyAdvertsList;
})();


// создает элемент: метка объявления на карте
(function () {
  const templateMapPin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  window.renderMapPin = (advert) => {
    const mapPinElement = templateMapPin.cloneNode(true);
    const mapPinWidth = mapPinElement.clientWidth;
    const mapPinHeight = mapPinElement.clientHeight;

    mapPinElement.querySelector(`img`).src = advert.author;
    mapPinElement.querySelector(`img`).alt = advert.offer.title;
    mapPinElement.style.left = advert.location.x - mapPinWidth / 2 + `px`;
    mapPinElement.style.top = advert.location.y - mapPinHeight + `px`;
    return mapPinElement;
  };
})();


// создает метки для каждого объявления
(function () {
  const mapPins = document.querySelector(`.map__pins`);

  window.renderNearbyMapPins = () => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < window.nearbyAdvertsList.length; i++) {
      fragment.appendChild(window.renderMapPin(window.nearbyAdvertsList[i]));
    }
    return mapPins.appendChild(fragment);
  };
})();


// отображает метки на карте
(function () {
  const map = document.querySelector(`.map`);
  map.classList.remove(`map--faded`);
  window.renderNearbyMapPins();
})();
