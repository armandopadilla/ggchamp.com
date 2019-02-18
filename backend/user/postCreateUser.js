/**
 * POST - Create a new user.
 *
 * @param req
 * @param res
 * @returns {*|Promise.<T>}
 */
const handler = async (req, res) => {
  // Grab all the data
  const {
    username,
    email,
    phone,
    password
  } = req.body;

  // Attempt to save the user
  return request.post('https://api.xxxxx.com/v1/user')
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
    url: '/user/create',
    handler,
    schema: {
      body: {
        type: 'object',
        properties: {
          username: { type: 'string', minLength: 4, maxLength: 100 },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          password: { type: 'string', minLength: 6, maxLength: 20 }
        },
        required: ['username', 'email', 'password']
      }
    }
  });

  next();
};