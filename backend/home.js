const request = require('request-promise');
const cookieManager = require('isomorphic-cookie');
const {
  API_URL,
  API_APP_ID,
  API_MY_GAMES_ENDPOINT,
  API_GAMES_ENDPOINT,
} = require('../constants');

module.exports = async (app, req, reply) => {

  // Check if the user is logged in
  const token = cookieManager.load("token", req);

  // Fetch the data from API
  const response = await request.get(`${API_URL}${API_GAMES_ENDPOINT}?$appId=${API_APP_ID}`);
  const lobbyData = JSON.parse(response).data;

  // Fetch my matches
  var options = {
    method: 'GET',
    url: `${API_URL}${API_MY_GAMES_ENDPOINT}?$appId=${API_APP_ID}`,
    headers: {
      'authorization': `Bearer ${token}`
    }
  };

  const resMyData = await request(options);
  const myGames = JSON.parse(resMyData).data;

  return app.render(req.raw, reply.res, '/home', { lobbyData, myGames }, {});
};