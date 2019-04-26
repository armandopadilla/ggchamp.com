module.exports = (app, req, res) => {
  // Check if the user has access to this page.

  // Grab the game id
  const { gameId } = req.params;

  //

  return app.render(req.raw, res.res, '/game/join', { gameId }, {})
};