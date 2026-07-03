const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const healthRoutes = require("./modules/health/routes/health.routes");
const patientRoutes = require("./modules/patients/routes/patient.routes");
const callRoutes = require("./modules/calls/routes/call.routes");
const vapiRoutes = require("./modules/calls/routes/vapi.routes");
const toolRoutes = require("./modules/tools/routes/tool.routes");
const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/health', healthRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/calls', callRoutes);
app.use('/api/vapi', vapiRoutes);
app.use('/api/tools', toolRoutes);

module.exports = app;
