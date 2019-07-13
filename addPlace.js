'use strict';

const fs = require('fs');

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

function writeIt(data, target_file = './data/addedPlaces.json') {
    return new Promise((resolve, reject) => {
        fs.writeFile(target_file, data, (err) => {
            if (err !== undefined && err !== null)
                reject('error');
            else
                resolve('success');
        });
    });
}

function addIt(placeData, target_file = './data/addedPlaces.json') {
    return new Promise(
        (reject, resolve) => extractIt().then(
            (value) =>
                writeIt(JSON.stringify(value.appendAnother(placeData).toJSON(),
                    null, 4))
                    .then((val) => resolve(val), (err) => reject(err)),
            (err) =>
                writeIt(JSON.stringify(
                    require('./model/place').instance
                        .appendAnother(placeData)
                        .toJSON(),
                    null, 4))
                    .then((val) => resolve(val), (err) => reject(err))
        ));
}

addIt({ name: 'Bolpur', url: 'http://yr.no/Bolpur.xml' })
    .then((val) => console.log(val), (err) => console.log(err));
