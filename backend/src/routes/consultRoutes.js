const express = require('express');
const { createConsultation, getConsultations } = require('../controllers/consultController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateFields = require('../middlewares/validateFields');

const router = express.Router();

router.use(authMiddleware);

router.post('/', validateFields(['age', 'weight', 'symptoms', 'days']), createConsultation);
router.get('/', getConsultations);

module.exports = router;
