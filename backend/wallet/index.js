module.exports = (app, req, res) => {
  return app.render(req.raw, res.res, '/wallet/home', req.query, {})
};
