'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors'); app.use(cors());
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

app.get('/location', (request, response) => {

  response.status(200).json();
});

app.get('/data', (request, response) => {
  let airplanes = {
    departure: Date.now(),
    canFly: true,
    pilot: 'Well Trained'
  }
  response.status(200).json(airplanes);
});

app.use('*', (request, response) => response.send('Sorry, that route does not exist.'))

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));