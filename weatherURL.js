'use strict';
const { readFile } = require('fs');
module.exports = {
    get: (iso, place) => new Promise((resolve, reject) => {
        try {
            readFile(`./data/weather${iso.toUpperCase()}.json`, (err, data) => {
                if (err !== null || err !== undefined)
                    reject('error');
                else
                    resolve(JSON.parse(data.toString()).places.filter((elem) => elem.name === place)[0]);
            });
        }
        catch (e) {
            reject('error');
        }
    })
}