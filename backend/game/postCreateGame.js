const handler = (req, res) => {

  const {
    contestId,
    name,
    gameTitle,
    gameType,
    startDateTime,
    entryFee,
    invitePhones
  } = req.body;

  return request.post('https://api.xxxxx.com/v1/game')
    .then((response) => {
      if (response.statusCode !== 200) return res.send(response.errorMessage);
    })
    .then(() => {
      return request.post('https://api.xxxxx.com/v1/contest/join');
    })
    .then((response) => {
      return res.send({})
    })
    .catch(err => {
      console.log(err);
      return res.send(err);
    });

};



module.exports = (fastify, opts, next) => {
  fastify.route({
    method: 'POST',
    url: '/game',
    handler,
    schema: {
      body: {
        type: 'object',
        properties: {
          gameId: { type: 'string' },
          contestId: { type: 'string' }
        },
        required: [ 'gameId', 'contestId' ]
      }
    }
  });

  next()
};