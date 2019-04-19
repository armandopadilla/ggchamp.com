const request = require('request-promise');

module.exports = async (app, req, reply) => {

  // Check if the user is logged in
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmRvcGFkaWxsYTgxQGdtYWlsLmNvbSIsImlkIjoiNWNiNzU0MGZlZmQ1Y2U1NWJhNGZjM2Y4IiwidXNlcm5hbWUiOiJhcm1hbmRvIiwiaWF0IjoxNTU1NjMzMzMyfQ.p-MYe5hNGHxRX3_63szy6o6wq50VKoZDN6yQPNDuWfI';
  //console.log(document.cookie);

  // Fetch the data from API
  var options = {
    method: 'GET',
    url: 'http://localhost:3000/v1/game/my-games',
    headers: {
      'authorization': `Bearer ${token}`
    }
  };
  const response = await request.get('http://localhost:3000/v1/game/list');
  const lobbyData = JSON.parse(response).data;

  // Fetch my matches
  const resMyData = await request(options);
  const myGames = JSON.parse(resMyData).data;

  return app.render(req.raw, reply.res, '/home', { lobbyData, myGames }, {});
};