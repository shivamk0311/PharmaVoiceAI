const express = require('express');

const router = express.Router();

const upload = require('../middlewares/upload.middleware')
const {importPatients} = require('../controllers/patientImport.controller')

router.post('/import', upload.single("file"), importPatients)

module.exports = router;
