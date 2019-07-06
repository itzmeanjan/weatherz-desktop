'use strict';
const http = require('http');
const xml2JS = require('xml2js');
function query(url) {
    return new Promise((resolve, reject) => {
        try {
            http.get(url, (res) => {
                if (res.statusCode !== 200) {
                    res.resume();
                    reject('response not ok');
                }
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk; // keeps reading data
                });
                res.on('end', () => { // when data flow ends, parses XML response to JSON
                    xml2JS.parseString(data, (err, result) => {
                        if (err !== undefined && err !== null)
                            reject('error');
                        else
                            resolve(result);
                    });
                }).on('error', (err) => {
                    reject('error');
                });
            });
        }
        catch (e) {
            reject('error');
        }
    });
}


query('http://www.yr.no/place/Bangladesh/Dhaka/Dhaka/forecast.xml').then((data) => {
    console.log(data);
}, (err) => console.log(err));