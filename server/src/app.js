const path = require('path');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api');

const app = express();

/** Middleware **/

// CORS middleware.
app.use(cors({
  origin: 'http://localhost:3000',
}));

// Logging middleware.
app.use(morgan('combined'));

// Parse incoming JSON from the body of incoming requests.
app.use(express.json()); 
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/v1', api);

app.get('/*path', (req, res) => {
  // send in the response the built app's index.html
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;