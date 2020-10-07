'use strict';

(function () {
  const CONTENT_TOP_Y = 130;
  const CONTENT_BOTTOM_Y = 630;
  const ADVERTS_LIST_LENGTH = 8;
  const MAX_PRICE = 1000000;
  const CHECK_IN_OUT_TIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const DESCRIPTION = `Жилье расположено в историческом центре Города, всего в 100 метрах от Главной Достопримечательности. Поблизости проходят многочисленные маршруты общественного транспорта.`;
  const TITLES = [
    `Уютное бунгало с видом на трассу`,
    `Небольшая чистая квартира`,
    `Маленькое неуютное гнездышко`,
    `Роскошный дом в 5 часах от центра`,
    `Бунгало класса люкс`,
    `Дворец, достойный Вашей мании величия`,
    `Дом в самом центре криминального района`,
    `Уютная квартира в недостроенном доме`,
  ];
  const PHOTOS = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];
  const map = document.querySelector(`.map`);


  // function to create an array of mock adverts

  const getAdvertsList = (numberOfAdverts, maxPrice, checkInOutTime, type, titles, fullDescription, features, photos) => {
    const adverts = [];

    for (let i = 0; i < numberOfAdverts; i++) {
      let j = (i < 9) ? (`0` + (i + 1)) : (i + 1);
      let xLocation = window.util.getRandomInt(map.clientWidth);
      let yLocation = window.util.getRandomInt(CONTENT_TOP_Y, CONTENT_BOTTOM_Y);

      adverts[i] = {
        author: `img/avatars/user${j}.png`,
        offer: {
          title: titles[i],
          address: xLocation + `, ` + yLocation,
          price: window.util.getRandomInt(maxPrice),
          type: window.util.getRandomArrayElement(type),
          rooms: window.util.getRandomInt(+window.constants.MAX_CAPACITY, 1),
          guests: window.util.getRandomInt(+window.constants.MAX_CAPACITY, 1),
          checkin: window.util.getRandomArrayElement(checkInOutTime),
          checkout: window.util.getRandomArrayElement(checkInOutTime),
          features: features.slice(0, window.util.getRandomInt((features.length + 1), 1)),
          description: fullDescription,
          photos: photos.slice(0, window.util.getRandomInt((photos.length + 1), 1)),
        },
        location: {
          x: xLocation,
          y: yLocation,
        },
      };
    }
    return adverts;
  };

  // create an array of adverts

  const nearbyAdvertsList = getAdvertsList(ADVERTS_LIST_LENGTH, MAX_PRICE, CHECK_IN_OUT_TIMES,
      Object.keys(window.constants.accomodationType), TITLES, DESCRIPTION, FEATURES, PHOTOS);

  window.data = {
    nearbyAdvertsList,
  };
})();
