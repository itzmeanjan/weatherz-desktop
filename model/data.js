'use strict';

class WeatherData {
    constructor(location, meta, sun, forecast) {
        this.location = location;
        this.meta = meta;
        this.sun = sun;
        this.forecast = forecast;
    }
}

class Location {
    constructor(name, type, country, tz, lonlat) {
        this.name = name;
        this.type = type;
        this.country = country;
        this.tz = tz;
        this.lonlat = lonlat;
    }
}

class MetaData {
    constructor(lastUpdate, nextUpdate) {
        this.lastUpdate = lastUpdate;
        this.nextUpdate = nextUpdate;
    }
}

class Sun {
    constructor(rise, set) {
        this.rise = rise;
        this.set = set;
    }
}

class Forecast {
    constructor(slottedForecast) {
        this.slottedForecast = slottedForecast;
    }
}

class SlottedForecast {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
}

class Symbol {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}