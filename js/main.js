'use strict';

(function () {
  const formFields = document.querySelectorAll(`.map__features, .map__filter, .ad-form fieldset`);

  window.page.disableFormFields(formFields);
  window.map.renderPinCoordinates();
})();
