/**
 * Sign up / Create an Account (Controller/Action)
 *
 * @param app
 * @param req
 * @param reply
 */
module.exports = (app, req, reply) => {
  return app.render(req.raw, reply.res, '/signup', req.query, {});
};

