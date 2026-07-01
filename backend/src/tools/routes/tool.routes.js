const express = require('express')
const router = express.Router();

const { verifyPatient } = require('../controllers/tool.controller')

router.post('/verify-patient', verifyPatient);

module.exports = router;