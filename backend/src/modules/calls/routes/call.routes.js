const express = require('express')
const { startCall, getCalls } = require('../controllers/call.controller')

const router = express.Router()

router.post("/:patientId/start", startCall)
router.get("/", getCalls)

module.exports = router;

