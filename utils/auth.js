const cookies = require('isomorphic-cookie');

const isLoggedIn = async (req) => {
  const token = cookies.load("token", req);
  console.log ("token=", token);
  return (token);
}

module.exports = {
  isLoggedIn,
};

