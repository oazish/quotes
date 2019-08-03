const kebabCase = require('lodash/kebabcase');

exports.topicLink = topic => `/topics/${kebabCase(topic)}/`;