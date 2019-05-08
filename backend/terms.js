module.exports = (app, req, reply) => {
  return app.render(req.raw, reply.res, '/terms', req.query, {});
};