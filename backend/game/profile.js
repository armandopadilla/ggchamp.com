module.exports = (app, req, res) => {
  return app.render(req.raw, res.res, '/game/profile', req.query, {})
};