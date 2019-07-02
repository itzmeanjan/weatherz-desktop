'use strict';
const { readFile } = require('fs');
module.exports = {
    get: new Promise((resolve, reject) => {
        readFile('./data/iso2Country.json', (err, data) => {
            if (err !== null && err !== undefined)
                reject(undefined);
            else
                resolve(
                    JSON.parse(
                        data.toString()
                    )
                );
        });
    })
}
