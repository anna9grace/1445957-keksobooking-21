'use strict';

const templateAdvert = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapFilters = document.querySelector(`.map__filters-container`);
const ENDING_CHANGE_NUBMER = 5;


// fill list of features for a current card

const renderFeatures = (element, advert) => {
  const features = element.querySelectorAll(`.popup__feature`);

  for (let feature of features) {
    feature.style.display = `none`;
  }

  advert.offer.features.forEach((item) => {
    element.querySelector(`.popup__feature--${item}`).style.display = ``;
  });
};


// fill capacity characteristics for a current card

const getAccomodationCapacity = (advert) => {
  let rooms = ` комната`;
  if (advert.offer.rooms < ENDING_CHANGE_NUBMER && advert.offer.rooms !== 1) {
    rooms = ` комнаты`;
  } else if (advert.offer.rooms >= ENDING_CHANGE_NUBMER) {
    rooms = ` комнат`;
  }

  let guests = (advert.offer.guests === 1) ? ` гостя` : ` гостей`;

  return advert.offer.rooms + rooms + ` для ` + advert.offer.guests + guests;
};


// fill list of photos for a current card

const renderPhotos = (element, advert) => {
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


// create an element: advert card

const renderAdvertCard = (advert) => {
  const advertElement = templateAdvert.cloneNode(true);
  const cardDescription = advertElement.querySelector(`.popup__description`);
  const cardType = advertElement.querySelector(`.popup__type`);
  const cardTime = advertElement.querySelector(`.popup__text--time`);
  const cardCapacity = advertElement.querySelector(`.popup__text--capacity`);
  const cardAvatar = advertElement.querySelector(`.popup__avatar`);
  const cardPhotos = advertElement.querySelector(`.popup__photos`);
  const cardFeatures = advertElement.querySelector(`.popup__features`);

  advertElement.querySelector(`.popup__title`).textContent = advert.offer.title;
  advertElement.querySelector(`.popup__text--price`).textContent = `${advert.offer.price}₽/ночь`;
  advertElement.querySelector(`.popup__text--address`).textContent = advert.offer.address;

  if (advert.offer.description) {
    cardDescription.textContent = advert.offer.description;
  } else {
    cardDescription.style.display = `none`;
  }

  if (advert.offer.type) {
    cardType.textContent = window.constants.accomodationType[advert.offer.type];
  } else {
    cardType.style.display = `none`;
  }

  if (advert.offer.checkin) {
    cardTime.textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  } else {
    cardTime.style.display = `none`;
  }

  if (advert.offer.rooms) {
    cardCapacity.textContent = getAccomodationCapacity(advert);
  } else {
    cardCapacity.style.display = `none`;
  }

  if (advert.author.avatar) {
    cardAvatar.src = advert.author.avatar;
  } else {
    cardAvatar.style.display = `none`;
  }

  if (advert.offer.photos.length > 0) {
    renderPhotos(advertElement, advert);
  } else {
    cardPhotos.style.display = `none`;
  }

  if (advert.offer.features.length > 0) {
    renderFeatures(advertElement, advert);
  } else {
    cardFeatures.style.display = `none`;
  }

  return mapFilters.before(advertElement);
};

window.card = {
  renderAdvertCard,
};
