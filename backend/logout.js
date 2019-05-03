const request = require('request-promise');
const cookies = require('isomorphic-cookie');
const {
  API_URL,
  API_APP_ID,
  API_LOGOUT_ENDPOINT,
}  = require('../constants');

module.exports = async (app, req, res) => {
  return app.render(req.raw, res.res, '/logout', {}, {})
};