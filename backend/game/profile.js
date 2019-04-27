/**
 * Single game information.
 *
 * @param app
 * @param req
 * @param res
 */
const request = require('request-promise');
const {
  API_URL,
  API_APP_ID,
  API_GAME_ENDPOINT,
} = require('../../constants');

module.exports = async (app, req, res) => {

  // Check if the user is logged in or not

  // Grab the token
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmRvcGFkaWxsYTgxQGdtYWlsLmNvbSIsImlkIjoiNWNiNzU0MGZlZmQ1Y2U1NWJhNGZjM2Y4IiwidXNlcm5hbWUiOiJhcm1hbmRvIiwiaWF0IjoxNTU1NjMzMzMyfQ.p-MYe5hNGHxRX3_63szy6o6wq50VKoZDN6yQPNDuWfI';

  // Grab the game id
  const { gameId } = req.params;
  console.log(gameId);

  // Fetch game info
  // Fetch the data from API
  var options = {
    method: 'GET',
    url: `${API_URL}${API_GAME_ENDPOINT}/${gameId}?appId=${API_APP_ID}&playerInfo=1`,
    headers: {
      'authorization': `Bearer ${token}`
    }
  };

  const resGame = await request(options);
  const game = JSON.parse(resGame).data;

  return app.render(req.raw, res.res, '/game/profile', { game }, {})
};