'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.static('./public'));

app.get('/', (request, response) => {
  response.send('server works');
});

function GEOloc(query, fmtQ, lat, long) {
  this.query = query;
  this.fmtQ = fmtQ;
  this.lat = lat;
  this.long = long;
}

function Forecast(forecast, time) {
  this.forecast = forecast;
  this.time = time;
}

function handleError() {
  return { 'status': 500, 'responseText': 'Sorry, something went wrong' };
}

app.get('/location', (request, response) => {
  try {
    const data = require('./data/geo.json');
    console.log(request.query.data);
    console.log(data.results[0].formatted_address);
    console.log(data.results[0].geometry.location.lat);
    console.log(data.results[0].geometry.location.lng);
    // console.log(data.address_component);
    let city = new GEOloc(request.query.data, data.results[0].formatted_address, data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
    response.send(city);
  } catch (error) {
    response.send(handleError);
  }

});


app.get('/weather', (request, response) => {
  try {
    const data = require('./data/darksky.json');
    let daily = Object.entries(data)[6];
    let dailyData = daily[1].data;//hourly day forecast
    console.log(dailyData);

    let myForecast = [];
    dailyData.forEach(element => {
      let date = new Date(element.time * 1000).toDateString();
      let temp = new Forecast(element.summary, date);
      myForecast.push(temp);
    });
    console.log(myForecast);
    response.send(myForecast);

  } catch (error) {
    response.send(handleError);
  }



});

app.use('*', (request, response) => response.send('Sorry, that route does not exist.'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
