/**
 * POST - Reset Password
 *
 * @param req
 * @param res
 * @returns {*|Promise.<T>}
 */
const handler = async (req, res) => {
  const { email } = req.body;

  return request.post('https://api.xxxxx.com/v1/user/reset-password')
    .then((response) => {
      if (response.statusCode !== 200) return res.send(response.errorMessage);
      return res.send(response.data);
    })
    .catch(err => {
      console.log(err);
      return res.send(err);
    });
};

module.exports = (fastify, opts, next) => {
  fastify.route({
    method: 'POST',
    url: '/resetpassword',
    handler,
    schema: {
      body: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' }
        },
        required: ['email']
      }
    }
  });

  next();
};