const express = require('express')
const router = express.Router();

const { verifyPatient, confirmRefill } = require('../controllers/tool.controller')

router.post('/verify-patient', verifyPatient);
router.post('/confirm-refill', confirmRefill);

module.exports = router;