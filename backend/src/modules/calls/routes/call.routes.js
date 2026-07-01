const express = require('express')
const { startCall } = require('../controllers/call.controller')

const router = express.Router()

router.post("/:patientId/start", startCall)

module.exports = router;

