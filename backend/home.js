const request = require('request-promise');

module.exports = async (app, req, reply) => {

  // Check if the user is logged in
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmRvcGFkaWxsYTgxQGdtYWlsLmNvbSIsImlkIjoiNWNiNzU0MGZlZmQ1Y2U1NWJhNGZjM2Y4IiwidXNlcm5hbWUiOiJhcm1hbmRvIiwiaWF0IjoxNTU1OTQ5NTQ1fQ.ZRru8kGP8ORcEjJCA9OKsH62QcPn7ex9xkk_U8ISy5U';
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