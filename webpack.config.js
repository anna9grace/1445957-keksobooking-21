const path = require(`path`);

module.exports = {
  entry: [
    `./js/util.js`,
    `./js/constants.js`,
    `./js/backend.js`,
    `./js/photos.js`,
    `./js/pin.js`,
    `./js/card.js`,
    `./js/map.js`,
    `./js/pin-move.js`,
    `./js/filter.js`,
    `./js/page.js`,
    `./js/form.js`,
    `./js/main.js`,
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
