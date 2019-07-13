'use strict';

// holds record of a certain place, which is present in ./data/addedPlaces.json
// will fetch weather data of this place
// will also be used to display already added place record
//
// keeps place name and corresponding url, from which weather data to be fetched

class _IndividualPlaceEntry {
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }

    // this one will help in creating an object of this class from JSON

    static fromJSON(jsonObject) {
        let _individualPlaceEntry = new _IndividualPlaceEntry(null, null);
        _individualPlaceEntry.name = jsonObject.name;
        _individualPlaceEntry.url = jsonObject.url;
        return _individualPlaceEntry;
    }

    // will be useful in converting place record to JSON string,
    // which is to be eventually stored in ./data/addedPlaces.json

    toJSON() { return { name: this.name, url: this.url }; }
}

// keeps a list of all places for which user is intertested in getting
// weather data
//
// each element of allPlaces will be an object of `_IndividualPlaceEntry` class

class AllPlaceEntries {
    constructor(allPlaces) { this.allPlaces = allPlaces; }

    // takes a JS array where each element is of { name: 'X', url: 'x' } form
    // and returns an instance of this class, holding all places

    static fromJSON(jsonObject) {
        let allPlaceEntries = new AllPlaceEntries([]);
        allPlaceEntries.allPlaces =
            jsonObject.map((elem) => _IndividualPlaceEntry.fromJSON(elem));
        return allPlaceEntries;
    }

    // this one will be helpful in appending a new place record
    // to `allPlaces`
    // returns `this`, so that method calling can be changed
    //
    // * seems helpful in my view
    //
    // well there may be a situation, when someone creates
    // an instance of this class with `null` set as allPlaces
    // then this method will allocate a new JS array to `allPlaces`
    // with an object of `_IndividualPlaceEntry`, which will hold record
    // this place

    appendAnother(jsonObject) {
        if (this.allPlaces !== undefined && this.allPlaces !== null)
            this.allPlaces.push(_IndividualPlaceEntry.fromJSON(jsonObject));
        else
            this.allPlaces = [_IndividualPlaceEntry.fromJSON(jsonObject)];
        return this;
    }

    // helpful while exporting this object to JSON string
    // and storing it in a certain file

    toJSON() {
        return (this.allPlaces !== undefined && this.allPlaces !== null)
            ? { places: this.allPlaces.map((elem) => elem.toJSON()) }
            : { places: [] };
    }
}

module.exports = {
    AllPlaceEntries: AllPlaceEntries, // use it when you're interested in invoking static method `fromJSON`
    instance: new AllPlaceEntries([]) // and this one, when in need of just appending one/ more record(s), and finally exporting them to JSON string
};
