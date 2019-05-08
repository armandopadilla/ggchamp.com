const withCSS = require('@zeit/next-css');
const withImage = require('next-images');

module.exports = withCSS(
  withImage({
    webpack(config, options) {
      // Further custom configuration here
      return config;
    }
  })
);