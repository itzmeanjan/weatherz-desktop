'use strict';
const fs = require('fs');
module.exports = {
    get: () => {
        let regex = new RegExp('^(weather[A-Z]{2}\.json)$');
        let data = [];
        try {
            data = fs.readdirSync('./data/').filter((val) => regex.test(val));
        } catch (e) {
            data = undefined;
        }
        finally {
            return data;
        }
    }
}
