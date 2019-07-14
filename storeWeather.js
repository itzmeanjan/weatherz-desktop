'use strict';

const fs = require('fs');

// extracts already stored weather forecast data set for a certain place in
// target_file
//
// will return an instance of `./model/storedWeatherData.WeatherDataCollection`
// class, where it'll keep a record of all those weather record(s) stored in
// objectified form where we can eventually add newer records for this place
//
// and convert to JSON, so that it can be written back to target_file, with
// newer record(s) appended

function extractIt(target_file) {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(target_file, (err, data) => {
        if (err !== undefined && err !== null)
          reject('error');
        else
          resolve(require('./model/storedWeatherData')
            .WeatherDataCollection.fromJSON(
              JSON.parse(data.toString()).dataSet));
      });
    } catch (e) {
      reject('error');
    }
  });
}

// takes an instance of `./model/storedWeatherData.WeatherDataCollection`,
// which will be eventually JSONified and written to target_file
//
// written JSON string will be well-formatted

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

// adds a new weather forecast data record for current place of concern
// `weatherData` is nothing but JSONified object ( converted from instance of
// `./model/data/WeatherData` )
//
// first existing record(s) will be read from target_file, and will be
// objectified, so that it becomes easy to append newer record(s) to existing
// data set in case of very first time, when we don't have any weather forecast
// record for this place needs to be starting by creating with a new instance of
// `./model/storedWeatherData.WeatherDataCollection` where collection will be
// kept empty and new record will be added

function addIt(weatherData, target_file) {
  return new Promise((resolve, reject) => {
    extractIt(target_file)
      .then((data) => resolve(data.addAnother(weatherData)),
        (err) => resolve(require('./model/storedWeatherData')
          .instance.addAnother(weatherData)));
  });
}

// making it available to outside

module.exports = {
  extractIt: extractIt, // to extract already existing dataset and return an instance of objectified form
  writeIt: writeIt, // writes JSON string representation of `WeatherDataCollection` object into target_file
  addIt: addIt // appends new weather forecast data to data collection of current place of concern
};
