module.exports = async (app, req, reply) => {
  return app.render(req.raw, reply.res, '/home', req.query, {});
};