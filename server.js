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
  const data = require('./data/geo.json');
  let cityQuery = request.query.data;
  console.log(`city query = ${cityQuery}`);
  let city = new GEOloc(cityQuery, data.results[0].formatted_address, data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
  response.send(city);
});


app.get('/weather', (request, response) => {
  const data = require('./data/darksky.json');
  let daily = Object.entries(data)[6];
  console.log(daily);
  let dailyData = daily[1].data;//hourly day forecast
  console.log(dailyData);

  let myForecast = [];
  dailyData.forEach(element => {
    let date = new Date(element.time * 1000).toDateString();
    let temp = new Forecast(element.summary,date);
    myForecast.push(temp);
  });

  console.log(myForecast);
  response.send(myForecast);
});


app.use('*', (request, response) => response.send('Sorry, that route does not exist.'))

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));
