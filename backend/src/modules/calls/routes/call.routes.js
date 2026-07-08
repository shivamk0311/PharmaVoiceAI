const express = require('express')
const { startCall, getCalls, updateCall } = require('../controllers/call.controller')

const router = express.Router()

router.post("/:patientId/start", startCall)
router.patch("/:callId/staff-complete", updateCall)
router.get("/", getCalls)

module.exports = router;

