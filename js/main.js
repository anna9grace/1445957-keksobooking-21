'use strict';

const CONTENT_TOP_Y = 130;
const CONTENT_BOTTOM_Y = 630;
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

const map = document.querySelector(`.map`);
const templateMapPin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = document.querySelector(`.map__pins`);


// поиск случайного числа
const getRandomInt = (max = 100, min = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// поиск случайного элемента массив
const getRandomArrayElement = (arr) => {
  const randomElement = Math.floor(Math.random() * arr.length);
  return arr[randomElement];
};


// объявляет функцию создания массива объявлений
const getAdvertsList = (numberOfAdverts, maxPrice, checkInOutTime, type, titles, fullDescription, features, photos) => {
  const advertsList = [];

  for (let i = 0; i < numberOfAdverts; i++) {
    let j = (i < 9) ? (`0` + (i + 1)) : (i + 1);
    let xLocation = getRandomInt(map.clientWidth);
    let yLocation = getRandomInt(CONTENT_TOP_Y, CONTENT_BOTTOM_Y);

    advertsList[i] = {
      author: `img/avatars/user${j}.png`,
      offer: {
        title: titles[i],
        address: xLocation + `, ` + yLocation,
        price: getRandomInt(maxPrice),
        type: getRandomArrayElement(type),
        rooms: getRandomInt(),
        guests: getRandomInt(),
        checkin: getRandomArrayElement(checkInOutTime),
        checkout: getRandomArrayElement(checkInOutTime),
        features: features.slice(0, getRandomInt((features.length + 1), 1)),
        description: fullDescription,
        photos: photos.slice(0, getRandomInt((photos.length + 1), 1)),
      },
      location: {
        x: xLocation,
        y: yLocation,
      },
    };
  }
  return advertsList;
};


// создает массив объявлений
const nearbyAdvertsList = getAdvertsList(ADVERTS_LIST_LENGTH, MAX_PRICE, CHECK_IN_OUT_TIME,
    ACCOMODATION_TYPE, TITLES, DESCRIPTION, FEATURES, PHOTOS);


// создает элемент: метка объявления на карте
const renderMapPin = (advert) => {
  const mapPinElement = templateMapPin.cloneNode(true);
  const pin = document.querySelector(`.map__pin`);

  mapPinElement.querySelector(`img`).src = advert.author;
  mapPinElement.querySelector(`img`).alt = advert.offer.title;
  mapPinElement.style.left = advert.location.x - pin.offsetWidth / 2 + `px`;
  mapPinElement.style.top = advert.location.y - pin.offsetHeight + `px`;
  return mapPinElement;
};


// создает метки для каждого объявления
const renderNearbyMapPins = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < nearbyAdvertsList.length; i++) {
    fragment.appendChild(renderMapPin(nearbyAdvertsList[i]));
  }
  return mapPins.appendChild(fragment);
};


// отображает метки на карте
map.classList.remove(`map--faded`);
renderNearbyMapPins();
