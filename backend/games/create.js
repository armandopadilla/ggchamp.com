module.exports = (app, req, res) => {
  return app.render(req.raw, res.res, '/games/create', req.query, {})
};