module.exports = (app, req, res) => {
  // Grab the game id
  const { gameId } = req.params;

  return app.render(req.raw, res.res, '/game/join', { gameId }, {})
};