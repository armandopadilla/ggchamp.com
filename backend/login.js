/**
 * Login Page Controller/Action
 *
 * @param app
 * @param req
 * @param res
 */
const cookies = require('isomorphic-cookie');

module.exports = (app, req, res) => {
  cookies.save("tokenXX", "asdfasdfasdf", { path: '/' });
  return app.render(req.raw, res.res, '/login', req.query, {})
};