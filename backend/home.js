const request = require('request-promise');

module.exports = async (app, req, reply) => {

  // Check if the user is logged in

  // Fetch the data from API
  const response = await request.get('http://localhost:3000/v1/game/list');
  const lobbyData = JSON.parse(response).data;

  // Fetch my matches
  // const resMyData = await request.get('http://localhost:3000/v1/game/my-games');
  // const myGames = JSON.parse(resMyData).data;

  return app.render(req.raw, reply.res, '/home', { lobbyData, myGames }, {});
};