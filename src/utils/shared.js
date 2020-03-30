/**
 * This module uses CommonJS format so it can be imported from Node and
 * Webpack.
 *
 * TODO: Consider consolidating with misc.js via use of MJS modules...
 */
const kebabCase = require('lodash.kebabcase');

exports.topicLink = topic => `/topics/${kebabCase(topic)}/`;

exports.SHAREABLE_IMAGE_DIMENSIONS = Object.freeze({
  width: 1600,
  height: 840,
});
