module.exports = async (app, req, res) => {

  // Check if the user is logged in
  //await isLoggedIn();

  // Make the call to the API
  // Check if the user is logged in
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmRvcGFkaWxsYTgxQGdtYWlsLmNvbSIsImlkIjoiNWNiNzU0MGZlZmQ1Y2U1NWJhNGZjM2Y4IiwidXNlcm5hbWUiOiJhcm1hbmRvIiwiaWF0IjoxNTU1NjMzMzMyfQ.p-MYe5hNGHxRX3_63szy6o6wq50VKoZDN6yQPNDuWfI';

  // Fetch the data from API
  const options = {
    method: 'GET',
    url: 'http://localhost:3000/v1/auth/logout',
    headers: {
      'authorization': `Bearer ${token}`
    }
  };

  // Fetch my matches
  await request(options);

  return app.render(req.raw, res.res, '/logout', {}, {})
};