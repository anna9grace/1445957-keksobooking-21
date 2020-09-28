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
const MAX_COPACITY = 20;
const CHECK_IN_OUT_TIME = [`12:00`, `13:00`, `14:00`];
const ACCOMODATION_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTION = `Жилье расположено в историческом центре Города, всего в 100 метрах от Главной Достопримечательности. Поблизости проходят многочисленные маршруты общественного транспорта.`;

const map = document.querySelector(`.map`);
const templateMapPin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const templateAdvert = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapFilters = document.querySelector(`.map__filters-container`);
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
        rooms: getRandomInt(MAX_COPACITY, 1),
        guests: getRandomInt(MAX_COPACITY, 1),
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


// определяет тип жилья в объявлении
const getAccomodationType = (advert) => {
  let accomodationType;
  if (advert.offer.type === `palace`) {
    accomodationType = `Дворец`;
  } else if (advert.offer.type === `flat`) {
    accomodationType = `Квартира`;
  } else if (advert.offer.type === `house`) {
    accomodationType = `Дом`;
  } else if (advert.offer.type === `bungalow`) {
    accomodationType = `Бунгало`;
  }
  return accomodationType;
};


// определяет перечень услуг в объявлении
const getFeaturesList = (element, advert) => {
  const features = element.querySelectorAll(`.popup__feature`);

  for (let feature of features) {
    feature.style.display = `none`;
  }

  advert.offer.features.forEach((item) => {
    for (let j = 0; j < features.length; j++) {
      if (features[j].classList.contains(`popup__feature--${item}`)) {
        features[j].style.display = ``;
      }
    }
  });
};


// определяет вместимость жилья из объявления
const getAccomodationCapacity = (advert) => {
  let rooms = ` комната`;
  if (advert.offer.rooms < 5 && advert.offer.rooms !== 1) {
    rooms = ` комнаты`;
  } else if (advert.offer.rooms >= 5) {
    rooms = ` комнат`;
  }

  let guests = (advert.offer.guests === 1) ? ` гостя` : ` гостей`;

  return advert.offer.rooms + rooms + ` для ` + advert.offer.guests + guests;
};


// формирует список фотография в объявлении
const getPhotosList = (element, advert) => {
  const photoList = element.querySelector(`.popup__photos`);
  const photo = element.querySelector(`.popup__photo`);
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < advert.offer.photos.length; i++) {
    let photoElement = photo.cloneNode(true);
    photoElement.src = advert.offer.photos[i];
    fragment.appendChild(photoElement);
  }
  photo.remove();
  return photoList.appendChild(fragment);
};


// создает элемент: карточка объявления
const renderAdvertCard = (advert) => {
  const advertElement = templateAdvert.cloneNode(true);

  advertElement.querySelector(`.popup__title`).textContent = advert.offer.title;
  advertElement.querySelector(`.popup__text--address`).textContent = advert.offer.address;
  advertElement.querySelector(`.popup__text--price`).textContent = `${advert.offer.price}₽/ночь`;
  advertElement.querySelector(`.popup__type`).textContent = getAccomodationType(advert);
  advertElement.querySelector(`.popup__text--capacity`).textContent = getAccomodationCapacity(advert);
  advertElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  advertElement.querySelector(`.popup__description`).textContent = advert.offer.description;
  advertElement.querySelector(`.popup__avatar`).src = advert.author;

  getFeaturesList(advertElement, advert);
  getPhotosList(advertElement, advert);

  return advertElement;
};


// создает карточку для каждого объявления
const renderAdvertCardsList = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < nearbyAdvertsList.length; i++) {
    fragment.appendChild(renderAdvertCard(nearbyAdvertsList[i]));
  }
  return mapFilters.before(fragment);
};


// отображает метки и карточки объявлений
map.classList.remove(`map--faded`);
renderNearbyMapPins();
renderAdvertCardsList();
