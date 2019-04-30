'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.static('./public'));

app.get('/', (request, response) =>{
  response.send('server works');
});

app.get('/location', (request, response) => {
  let city = {
    search_query: 'seattle',
    formatted_query: 'Seattle, WA, USA',
    latitude: '47.606210',
    longitude: '-122.332071'
  }
  response.send(city);
});


app.use('*', (request, response) => response.send('Sorry, that route does not exist.'))

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));