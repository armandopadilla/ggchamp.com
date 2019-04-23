const request = require('request-promise');

module.exports = async (app, req, res) => {

  // Check if the user is logged in or not

  // Grab the token
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmRvcGFkaWxsYTgxQGdtYWlsLmNvbSIsImlkIjoiNWNiNzU0MGZlZmQ1Y2U1NWJhNGZjM2Y4IiwidXNlcm5hbWUiOiJhcm1hbmRvIiwiaWF0IjoxNTU1OTQ5NTQ1fQ.ZRru8kGP8ORcEjJCA9OKsH62QcPn7ex9xkk_U8ISy5U';

  // Fetch game info
  // Fetch the data from API
  var options = {
    method: 'GET',
    url: `http://localhost:3000/v1/user/profile`,
    headers: {
      'authorization': `Bearer ${token}`
    }
  };

  const resUserInfo = await request(options);
  const userInfo = JSON.parse(resUserInfo).data;

  return app.render(req.raw, res.res, '/user/profile', { userInfo }, {})
};