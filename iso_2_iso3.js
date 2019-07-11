'use strict';
const {readFile} = require('fs');

function build(target_file = './data/iso3_2_iso2.json') {
  return new Promise((resolve, reject) => {
    try {
      readFile(target_file, (err, data) => {
        if (err !== undefined && err !== null) {
          reject(null);
        } else {
          resolve(
              require('./model/mapper').fromJSON(JSON.parse(data.toString())));
        }
      });
    } catch (e) {
      reject(null);
    }
  });
}

module.exports = build;