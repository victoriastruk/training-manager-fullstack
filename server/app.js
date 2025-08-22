const express = require('express');
const cors = require('cors');
const { errorHandlers } = require('./middleware');
const router = require('./routes');

const app = express();


const corsOptions = {
  origin: ["https://training-manager-fullstack.vercel.app"],
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', router);

app.use(errorHandlers.errorHandler);

module.exports = app;
