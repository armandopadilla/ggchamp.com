module.exports = (app, req, reply) => {
  return app.render(req.raw, reply.res, '/home', req.query, {});
};