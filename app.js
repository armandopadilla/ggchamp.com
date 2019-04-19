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
    fastify.next('/game/create-thankyou', require('./backend/game/create-thankyou'));
    fastify.next('/game/my-games', require('./backend/game/my-games'));
    fastify.next('/game/:gameId', require('./backend/game/profile'));

    // Users
    fastify.next('/user/profile', require('./backend/user/profile'));

    // Wallet Banking Services
    fastify.next('/wallet/deposit', require('./backend/wallet/deposit'));
    fastify.next('/wallet/deposit-thankyou', require('./backend/wallet/deposit-thankyou'));
    fastify.next('/wallet/withdraw', require('./backend/wallet/withdraw'));
    fastify.next('/wallet/withdraw-thankyou', require('./backend/wallet/withdraw-thankyou'));
    fastify.next('/wallet', require('./backend/wallet'));

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
//fastify.register(require('./backend/wallet/postDeposit'));
// Withdraw
//fastify.register(require('./backend/wallet/postWithdraw'));
// Invite
fastify.register(require('./backend/postInvite'));



fastify.listen(8080, err => {
  if (err) throw err;
  console.log('Server listening on 8080');
});
