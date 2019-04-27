const cookies = require('isomorphic-cookie');

const isLoggedIn = () => {
  const token = cookies.load("token");
  console.log ("token=", token);
  return (token);
}

module.exports = {
  isLoggedIn,
};

