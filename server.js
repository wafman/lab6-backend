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

function GEOloc (query,fmtQ,lat,long){
  this.query = query;
  this.fmtQ = fmtQ;
  this.lat = lat;
  this.long = long;
}

function Forecast(forecast,time){
  this.forecast = forecast;
  this.time = time;
}

app.get('/location', (request, response) => {
  $.get('./data/geo.json', data => {
    console.log(data);
  });

  response.send();
});

app.get('/weather', (request, response) => {
  $.get('./data/darksky.json', data => {
    console.log(data);
  });
  response.send();
});


app.use('*', (request, response) => response.send('Sorry, that route does not exist.'))

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));
