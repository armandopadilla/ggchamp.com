/**
 * POST - Deposit Funds
 *
 * @param req
 * @param res
 * @returns {*|Promise.<T>}
 */
const handler = async (req, res) => {
  const { email } = req.body;

  return request.post('https://api.xxxxx.com/v1/wallet/deposit')
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
    url: '/wallet/deposit',
    handler,
    schema: {
      body: {
        type: 'object',
        properties: {

        },
        required: ['email']
      }
    }
  });

  next();
};