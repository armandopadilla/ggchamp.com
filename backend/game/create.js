module.exports = (app, req, res) => {
  return app.render(req.raw, res.res, '/game/create', req.query, {})
};