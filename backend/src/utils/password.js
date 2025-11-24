const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const hashPassword = (plainPassword) => {
  if (typeof plainPassword !== 'string' || plainPassword.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }

  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

const verifyPassword = (plainPassword, hash) => bcrypt.compare(plainPassword, hash);

module.exports = {
  hashPassword,
  verifyPassword,
};
