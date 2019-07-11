'use strict';

// Holds a single entry from ISO to ISO3 and vice versa

class _IsoToIso3Each {
  constructor(iso, iso3) {
    this.iso = iso;
    this.iso3 = iso3;
  }
}

// Keeps all entries in form of a Array, where each element of Array is an
// object of _IsoToIso3Each class

// You will be mostly interacting with it.

class IsoToIso3 {
  constructor(entry) { this.entry = entry; }

  getByISO(iso) {
    let result = this.entry.filter((elem) => elem.iso.toUpperCase() ===
                                             iso.toUpperCase());
    return result.length == 0 ? null : result[0].iso3;
  }

  getByISO3(iso3) {
    let result = this.entry.filter((elem) => elem.iso3.toUpperCase() ===
                                             iso3.toUpperCase());
    return result.length == 0 ? null : result[0].iso;
  }

  static fromJSON(jsonObject) {
    let isoToIso3 = new IsoToIso3([]);
    Object.keys(jsonObject).forEach((elem) => {
      isoToIso3.entry.push(new _IsoToIso3Each(jsonObject[elem], elem));
    });
    return isoToIso3;
  }
}

module.exports = IsoToIso3;