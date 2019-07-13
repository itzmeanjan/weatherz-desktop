'use strict';

class _IndividualPlaceEntry {
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }

    static fromJSON(jsonObject) {
        let _individualPlaceEntry = new _IndividualPlaceEntry(null, null);
        _individualPlaceEntry.name = jsonObject.name;
        _individualPlaceEntry.url = jsonObject.url;
        return _individualPlaceEntry;
    }

    toJSON() {
        return {
            name: this.name,
            url: this.url
        };
    }
}

class AllPlaceEntries {
    constructor(allPlaces) {
        this.allPlaces = allPlaces;
    }

    static fromJSON(jsonObject) {
        let allPlaceEntries = new AllPlaceEntries([]);
        allPlaceEntries.allPlaces = jsonObject.map((elem) => _IndividualPlaceEntry.fromJSON(elem));
        return allPlaceEntries;
    }

    appendAnother(jsonObject) {
        if (this.allPlaces !== undefined && this.allPlaces !== null)
            this.allPlaces.push(_IndividualPlaceEntry.fromJSON(jsonObject));
        else
            this.allPlaces = [_IndividualPlaceEntry.fromJSON(jsonObject)];
        return this;
    }

    toJSON() {
        return (this.allPlaces !== undefined && this.allPlaces !== null) ?
            {
                places: this.allPlaces.map((elem) => elem.toJSON())
            }
            :
            {
                places: []
            };
    }
}

module.exports = {
    AllPlaceEntries: AllPlaceEntries,
    instance: new AllPlaceEntries([])
};
