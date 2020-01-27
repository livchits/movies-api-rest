const dotenv = require('dotenv');
const express = require('express');
const routes = require('./routes');
const morgan = require('morgan');

dotenv.config();

const { PORT = 8001, HOSTNAME } = process.env;

const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => console.log(`Server listening on http://${HOSTNAME}:${PORT}`));
