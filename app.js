const fastify = require('fastify')();

fastify
  .register(require('fastify-nextjs'))
  .after(() => {

    // Index Level
    fastify.next('/');
    fastify.next('/home', require('./backend/home'));
    fastify.next('/verify-account', require('./backend/verify-account'));
    fastify.next('/signup', require('./backend/signup'));
    fastify.next('/signin', require('./backend/signin'));
    fastify.next('/resetpassword', require('./backend/resetpassword'));
    fastify.next('/login', require('./backend/login'));
    fastify.next('/logout', require('./backend/logout'));
    fastify.next('/invite', require('./backend/invite'));

    // Games
    fastify.next('/game/:gameId/join', require('./backend/game/join'));
    fastify.next('/game/create', require('./backend/game/create'));
    fastify.next('/game/my-games', require('./backend/game/my-games'));

    // Users
    fastify.next('/user/profile', require('./backend/user/profile'));

    // Banking Services
    fastify.next('/deposit', require('./backend/wallet/deposit'));
    fastify.next('/withdraw', require('./backend/wallet/withdraw'));

  });


// Async endpoints
// Create User
fastify.register(require('./backend/user/postCreateUser'));
// Join a game
fastify.register(require('./backend/game/postJoinGame'));
// Create a game (match)
fastify.register(require('./backend/game/postCreateGame'));
// Reset Password
fastify.register(require('./backend/postResetPassword'));
// Deposit
fastify.register(require('./backend/wallet/postDeposit'));
// Withdraw
fastify.register(require('./backend/wallet/postWithdraw'));
// Invite
fastify.register(require('./backend/postInvite'));



fastify.listen(3000, err => {
  if (err) throw err;
  console.log('Server listening on 3000');
});
