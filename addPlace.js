'use strict';

const fs = require('fs');

// extracts all existing place records from target file
// these are the places for which this app will fetch weather data
// from `Yr.no`
// if there's no place record yet, listen for error in returned Promise,
// that's what will be populated
// otherwise an object of `./model/place.AllPlaceEntries` to be returned via Promise
// data read from target_file will be objectified and enclosed in aforementioned class

function extractIt(target_file = './data/addedPlaces.json') {
    return new Promise((resolve, reject) => {
        try {
            fs.exists(target_file, (exists) => {
                if (exists)
                    fs.readFile(target_file, (err, data) => {
                        if (err !== undefined && err !== null)
                            reject('error');
                        else
                            resolve(require('./model/place').AllPlaceEntries
                                .fromJSON(JSON.parse(data.toString()).places));
                    });
                else
                    reject('doesn\'t exist');
            });
        } catch (e) {
            reject('error');
        }
    });
}

// writes JSON stringified data into target file
// JSON data, to be written, is passed as `.model/place.AllPlaceEntries`
// which will be JSONified with in this function

function writeIt(data, target_file = './data/addedPlaces.json') {
    return new Promise((resolve, reject) => {
        fs.writeFile(target_file, JSON.stringify(data.toJSON(), null, 4), (err) => {
            if (err !== undefined && err !== null)
                reject('error');
            else
                resolve('success');
        });
    });
}

// adds requested place to record, which is kept in ./data/addedPlaces.json
// placeData will be of following form
// {
//      name: 'X',
//      url: 'x'   
// }
// which will be serialized into `./model/place._IndividualPlaceEntry` object
// and placed in `.model/place.AllPlaceEntries` object, which holds all places
// for which this app will fetch data from `Yr.no`

function addIt(placeData, target_file = './data/addedPlaces.json') {
    return new Promise(
        (reject, resolve) => extractIt(target_file).then(
            (value) =>
                resolve(value.appendAnother(placeData))
            ,
            (err) =>
                resolve(require('./model/place').instance
                    .appendAnother(placeData))
        ));
}

// making it available to use from outside

module.exports = {
    addIt: addIt, // to add new record
    extractIt: extractIt, // to extract existing record(s)
    writeIt: writeIt // for writing JSON string data to target file
};


// following section was used to check whether it works as expected or not

/*
addIt({ name: 'Berlin', url: 'http://yr.no/Berlin.xml' })
    .then((val) => console.log(val), (err) => console.log(err));
*/
