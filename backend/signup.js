module.exports = (app, req, reply) => {
  console.log('here');
  return app.render(req.raw, reply.res, '/signup', req.query, {});
};