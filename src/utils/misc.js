const kebabCase = require('lodash/kebabcase');

exports.categoryLink = category => `/categories/${kebabCase(category)}/`;