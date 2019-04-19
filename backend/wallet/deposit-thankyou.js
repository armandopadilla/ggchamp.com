module.exports = (app, req, res) => {
  return app.render(req.raw, res.res, '/wallet/deposit-thankyou', req.query, {})
};