'use strict';

const FILE_TYPES = [`gif`, `png`, `jpeg`, `jpg`];
const PHOTO_WIDTH = 70;
const PHOTO_HEIGHT = 70;
const avatarChooser = document.querySelector(`#avatar`);
const photosChooser = document.querySelector(`#images`);
const avatarPreview = document.querySelector(`.ad-form-header__preview`);
const photoPreview = document.querySelector(`.ad-form__photo`);

const createPreviewElement = (parent) => {
  const element = document.createElement(`img`);
  element.alt = `Фотография жилья`;
  element.width = PHOTO_WIDTH;
  element.height = PHOTO_HEIGHT;
  parent.insertAdjacentElement(`afterbegin`, element);
  return element;
};

const loadPreview = (chooser, preview) => {
  const file = chooser.files[0];
  const fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some((element) => {
    return fileName.endsWith(element);
  });

  if (matches) {
    const reader = new FileReader();
    let image = preview.querySelector(`img`);

    if (!image) {
      image = createPreviewElement(preview);
    }

    reader.addEventListener(`load`, () => {
      image.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

avatarChooser.addEventListener(`change`, loadPreview.bind(null, avatarChooser, avatarPreview));
photosChooser.addEventListener(`change`, loadPreview.bind(null, photosChooser, photoPreview));
