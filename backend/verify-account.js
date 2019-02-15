module.exports = (app, req, res) => {
  return app.render(req.raw, res.res, '/verify-account', req.query, {})
};