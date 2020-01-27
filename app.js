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

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    message: err.message,
    /*
     if we're in development mode, include stack trace (full error object)
     otherwise, it's an empty object so the user doesn't see all of that
    */
    error: app.get('env') === 'development' ? err : {}
  });
});

app.listen(PORT, () => console.log(`Server listening on http://${HOSTNAME}:${PORT}`));
