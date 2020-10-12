'use strict';

(function () {
  const onDataLoad = (data) => {
    const nearbyAdvertsList = data;

    window.data = {
      nearbyAdvertsList,
    };
  };

  window.backend.load(onDataLoad, window.util.showErrorMessage);
})();
