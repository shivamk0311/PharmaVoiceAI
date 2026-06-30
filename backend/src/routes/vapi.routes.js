const express = require('express')
const { receiveWebhook } = require('../controllers/vapi.controller')

const router = express.Router()

router.post("/webhook", receiveWebhook)

module.exports = router;