'use strict';
const http = require('http');
const xml2JS = require('xml2js');
const WeatherData = require('./model/data');

// this one will handle httpResponse
// if response status code is 200, we're good to go
// if 301, then it's a redirect, then we try to handle so, by using redirected
// url otherwise, upto current situation, we can assume other status code will
// be treated as error, and won't be handled

function _handler(res, resolve, reject) {
  if (res.statusCode === 301) {
    if (res.headers.location !== undefined && res.headers.location !== null)
      http.get(res.headers.location, (res) => _handler(res, resolve, reject));
  } else if (res.statusCode === 200) {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk; // keeps reading data
    });
    res.on('end', () => { // when data flow ends, parses XML response to JSON
      xml2JS.parseString(data, (err, result) => {
        if (err !== undefined && err !== null)
          reject('error');
        else
          resolve(WeatherData.fromJSON(
            result.weatherdata)); // this is where main data extraction is
        // done
      });
    }).on('error', (err) => { reject('error'); });
  } else {
    res.resume();
    reject('response not ok');
  }
}

// Queries are made using this function
// *** URL passed to function doesn't need to be URI encoded, it'll be done internally
// So be careful with that :)

function query(url) {
  return new Promise((resolve, reject) => {
    try {
      http.get(encodeURI(url), (res) => _handler(res, resolve, reject));
    } catch (e) {
      console.log(e);
      reject('error');
    }
  });
}

// module.exports = query;

query(
  "http://yr.no/place/Pakistan/Khyber_Pakhtunkhwa/Swāt_District/forecast.xml")
  .then((data) => console.log(data.toJSON()), (err) => console.log(err));
