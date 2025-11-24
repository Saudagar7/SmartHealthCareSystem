const express = require('express');
const { register, login } = require('../controllers/authController');
const validateFields = require('../middlewares/validateFields');

const router = express.Router();

router.post('/register', validateFields(['name', 'email', 'password']), register);
router.post('/login', validateFields(['email', 'password']), login);

module.exports = router;
