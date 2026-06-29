const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const healthRoutes = require('./routes/health.routes')
const patientsRoutes = require('./routes/patient.routes')
const app = express();

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/health', healthRoutes)
app.use('/api/patients', patientsRoutes)

module.exports = app;
