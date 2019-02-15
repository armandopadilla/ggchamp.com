const fastify = require('fastify')();

fastify
  .register(require('fastify-nextjs'))
  .after(() => {

    // Index Level
    fastify.next('/');
    fastify.next('/home', require('./backend/home'));
    fastify.next('/verify-account', require('./backend/verify-account'));
    fastify.next('/signup', require('./backend/signup'));
    fastify.next('/resetpassword', require('./backend/resetpassword'));
    fastify.next('/login', require('./backend/login'));
    fastify.next('/logout', require('./backend/logout'));
    fastify.next('/invite', require('./backend/invite'));

    // Games
    fastify.next('/games/:gameId/join', require('./backend/games/join'));
    fastify.next('/games/create', require('./backend/games/create'));
    fastify.next('/games/my-games', require('./backend/games/my-games'));

    // Users
    fastify.next('/user/profile', require('./backend/users/profile'));

    // Banking Services
    fastify.next('/deposit', require('./backend/banking/deposit'));
    fastify.next('/withdraw', require('./backend/banking/withdraw'));

  });


// Async endpoints

/**
 * Create a new account
 */
fastify.post('/user/create', {
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
}, (req, res) => {
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
});


/**
 * Reset Password
 */
fastify.post('/resetpassword', {
  schema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' }
      },
      required: ['email']
    }
  }
}, (req, res) => {
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
});

/**
 * Create a new match
 */
fastify.post('/game', {
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
}, (req, res) => {

  const {
    gameId,
    contestId
  } = req.body;

  return request.post('https://api.xxxxx.com/v1/game/join')
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

});

// Scaffold.
fastify.post('/invite', {}, (req, res) => {});
fastify.post('/banking/deposit', {}, (req, res) => {});
fastify.post('/banking/withdraw', {}, (req, res) => {});
fastify.post('/game/:gameId/join', {}, (req, res) => {});



fastify.listen(3000, err => {
  if (err) throw err;
  console.log('Server listening on 3000');
});
