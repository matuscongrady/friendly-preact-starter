const fs = require('fs');
const path = require('path');
const { version, name } = require('../package.json');

const gqlConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../.graphqlconfig'), 'utf8')
);
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  APP_NAME: name,
  APP_VERSION: isProd ? version : 'dev',
  DEFAULT_LOCALE: process.env.DEFAULT_LOCALE || 'en',
  API_ENDPOINT: isProd
    ? gqlConfig.extensions.endpoints.prod
    : gqlConfig.extensions.endpoints.dev
};
