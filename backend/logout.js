const request = require('request-promise');
const cookies = require('isomorphic-cookie');
const {
  API_URL,
  API_APP_ID,
  API_LOGOUT_ENDPOINT,
}  = require('../constants');

module.exports = async (app, req, res) => {

  // Check if the user is logged in
  //await isLoggedIn();

  // Check if the user is logged in
  const token = cookies.load("token", req);

  // Log the user out by making the API call.
  const options = {
    method: 'POST',
    url: `${API_URL}${API_LOGOUT_ENDPOINT}?appId=${API_APP_ID}`,
    headers: {
      'authorization': `Bearer ${token}`
    }
  };

  // Fetch my matches
  await request(options);

  // Remove the cookie
  // @TODO

  return app.render(req.raw, res.res, '/logout', {}, {})
};