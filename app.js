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


fastify.listen(3000, err => {
  if (err) throw err;
  console.log('Server listening on 3000');
});
