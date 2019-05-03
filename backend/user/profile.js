module.exports = async (app, req, res) => {
  return app.render(req.raw, res.res, '/user/profile', req.query, {})
};