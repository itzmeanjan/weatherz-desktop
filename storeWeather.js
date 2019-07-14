'use strict';

const fs = require('fs');

function extractIt(target_file) {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(target_file, (err, data) => {
        if (err !== undefined && err !== null)
          reject('error');
        else
          resolve(
              require('./model/storedWeatherData')
                  .WeatherDataCollection.fromJSON(JSON.parse(data.toString())));
      });
    } catch (e) {
      reject('error');
    }
  });
}

function writeIt(data, target_file) {
  return new Promise((resolve, reject) => {
    fs.writeFile(target_file, JSON.stringify(data.toJSON(), null, 4), (err) => {
      if (err !== undefined && err !== null)
        reject('error');
      else
        resolve('success');
    });
  });
}

function addIt(weatherData, target_file) {
  return new Promise((resolve, reject) => {
    extractIt(target_file)
        .then((data) => resolve(data.addAnother(weatherData)),
              (err) => resolve(
                  require('./model/storedWeatherData').instance.addAnother()));
  });
}
