'use strict';
const fs = require('fs');
module.exports = {
    get: (isoCode) => new Promise((resolve, reject) => {
        try {
            fs.readFile(`./data/weather${isoCode}.json`, (err, content) => {
                if (err !== undefined && err !== null)
                    reject(undefined);
                else
                    resolve(JSON.parse(content.toString()).places.map((value) => value.name));
            });
        }
        catch (e) {
            reject(undefined);
        }
    })
}
