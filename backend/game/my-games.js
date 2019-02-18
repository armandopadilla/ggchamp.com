module.exports = (app, req, res) => {
  return app.render(req.raw, res.res, '/games/my-games', req.query, {})
};