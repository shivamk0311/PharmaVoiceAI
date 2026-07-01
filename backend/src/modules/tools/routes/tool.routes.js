const express = require('express')
const router = express.Router();

const { verifyPatient, confirmRefill, recordPaymentPreference } = require('../controllers/tool.controller')

router.post('/verify-patient', verifyPatient);
router.post('/confirm-refill', confirmRefill);
router.post('/record-payment-preference', recordPaymentPreference);

module.exports = router;