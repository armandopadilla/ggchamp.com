/**
 * Single game information.
 *
 * @param app
 * @param req
 * @param res
 */

module.exports = async (app, req, res) => {
  return app.render(req.raw, res.res, '/game/profile', req.params , {})
};