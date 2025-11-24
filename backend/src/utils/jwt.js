const jwt = require('jsonwebtoken');

const getSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set');
  }

  return process.env.JWT_SECRET;
};

const signToken = (payload, options = {}) =>
  jwt.sign(payload, getSecret(), {
    expiresIn: '1h',
    ...options,
  });

const verifyToken = (token) => jwt.verify(token, getSecret());

module.exports = {
  signToken,
  verifyToken,
};
