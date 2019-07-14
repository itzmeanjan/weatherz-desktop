'use strict';

// holds timezone data of current place of concern
// keeps an timezone identifier and utcOffset in minute(s)

class TimeZone {
  // utcOffset is in `minute`
  constructor(id, utcOffset) {
    this.id = id;
    this.utcOffset = utcOffset;
  }

  // you'll most probably use this one, for grabbing an instance of this class

  static fromJSON(jsonObject) {
    let timeZone = new TimeZone(null, null);
    timeZone.id = jsonObject.id;
    timeZone.utcOffset = jsonObject.utcOffset;
    return timeZone;
  }

  // Returns a JSON equivalent representation for TimeZone
  toJSON() { return { id: this.id, utcOffset: this.utcOffset }; }
}

// holds location details of current place of concern
// keeps track of longitude, latitude, altitude & geonameid

class LonLat {
  // geonameid is from GeoNames Database, can be found here
  // https://github.com/itzmeanjan/countryAndWeather
  constructor(longitude, latitude, altitude, geonameid) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.altitude = altitude;
    this.geonameid = geonameid;
  }

  // well this one will serve as instance creator of this class from JSON data

  static fromJSON(jsonObject) {
    let lonLat = new LonLat(null, null, null, null);
    lonLat.longitude = jsonObject.longitude;
    lonLat.latitude = jsonObject.latitude;
    lonLat.altitude = jsonObject.altitude;
    lonLat.geonameid = jsonObject.geonameid;
    return lonLat;
  }

  // Returns a JSON equivalent representation for LonLat
  toJSON() {
    return {
      longitude: this.longitude,
      latitude: this.latitude,
      altitude: this.altitude,
      geonameid: this.geonameid
    };
  }
}

// geolocation keeps track of current place's name, category, country, timezone and lonlat

class GeoLocation {
  constructor(name, type, country, tz, lonlat) {
    this.name = name;
    this.type = type;
    this.country = country;
    this.tz = tz;
    this.lonlat = lonlat;
  }

  // instance creator of this class from JSON

  static fromJSON(jsonObject) {
    let geoLocation = new GeoLocation(null, null, null, null, null);
    geoLocation.name = jsonObject.name;
    geoLocation.type = jsonObject.type;
    geoLocation.country = jsonObject.country;
    geoLocation.tz = TimeZone.fromJSON(jsonObject.tz);
    geoLocation.lonlat = LonLat.fromJSON(jsonObject.lonlat);
    return geoLocation;
  }

  // Returns a JSON equivalent representation for GeoLocation
  toJSON() {
    return {
      name: this.name,
      type: this.type,
      country: this.country,
      tz: this.tz.toJSON(),
      lonlat: this.lonlat.toJSON()
    };
  }
}

// holds meta data, related to this forecast dataset for current place of concern

class MetaData {
  constructor(lastUpdate, nextUpdate) {
    this.lastUpdate = lastUpdate;
    this.nextUpdate = nextUpdate;
  }

  // helps in grabbing an instance of this class, from JSON data

  static fromJSON(jsonObject) {
    let metaData = new MetaData(null, null);
    metaData.lastUpdate = jsonObject.lastUpdate;
    metaData.nextUpdate = jsonObject.nextUpdate;
    return metaData;
  }

  // Returns a JSON equivalent representation for MetaData
  toJSON() {
    return { lastUpdate: this.lastUpdate, nextUpdate: this.nextUpdate };
  }
}

// holds a record of sunrise and sunset for current place
// for the time span specified MetaData field

class Sun {
  constructor(rise, set) {
    this.rise = rise;
    this.set = set;
  }

  static fromJSON(jsonObject) {
    let sun = new Sun(null, null);
    sun.rise = jsonObject.rise;
    sun.set = jsonObject.set;
    return sun;
  }

  // Returns a JSON equivalent representation for Sun
  toJSON() { return { rise: this.rise, set: this.set }; }
}

// holds weather state name and corresponding icon id,
// which is applicable for a certain timespan, provided in SlottedForecast

class WeatherIcon {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  static fromJSON(jsonObject) {
    let weatherIcon = new WeatherIcon(null, null);
    weatherIcon.name = jsonObject.name;
    weatherIcon.id = jsonObject.id;
    return weatherIcon;
  }

  // Returns a JSON equivalent representation for WeatherIcon
  toJSON() { return { name: this.name, id: this.id }; }
}

// holds a record of wind flow direction name, direction code & degree

class WindDirection {
  constructor(name, code, degree) {
    this.name = name;
    this.code = code;
    this.degree = degree;
  }

  static fromJSON(jsonObject) {
    let windDirection = new WindDirection(null, null, null);
    windDirection.name = jsonObject.name;
    windDirection.code = jsonObject.code;
    windDirection.degree = jsonObject.degree;
    return windDirection;
  }

  // Returns a JSON equivalent representation for WindDirection
  toJSON() {
    return { name: this.name, code: this.code, degree: this.degree };
  }
}

// keeps track of wind flow speed, where speed is in meter(s)/ second
// and also wind name

class WindSpeed {
  // speed is in `meters per second`
  constructor(name, speed) {
    this.name = name;
    this.speed = speed;
  }

  static fromJSON(jsonObject) {
    let windSpeed = new WindSpeed(null, null);
    windSpeed.name = jsonObject.name;
    windSpeed.speed = jsonObject.mps;
    return windSpeed;
  }

  // Returns a JSON equivalent representation for WindSpeed
  toJSON() { return { name: this.name, speed: this.speed }; }
}

// keeps temperature for current place for a certain timespan

class Temperature {
  // by default unit will be in `Celcius`
  constructor(value, unit) {
    this.value = value;
    this.unit = unit;
  }

  static fromJSON(jsonObject) {
    let temperature = new Temperature(null, null);
    temperature.value = jsonObject.value;
    temperature.unit = jsonObject.unit;
    return temperature;
  }

  // Returns a JSON equivalent representation for Temperature
  toJSON() { return { value: this.value, unit: this.unit }; }
}

// holds atmospheric pressure value & unit ( in hPa )

class Pressure {
  // by default unit will be in `hPa`
  constructor(value, unit) {
    this.value = value;
    this.unit = unit;
  }

  static fromJSON(jsonObject) {
    let pressure = new Pressure(null, null);
    pressure.value = jsonObject.value;
    pressure.unit = jsonObject.unit;
    return pressure;
  }

  // Returns a JSON equivalent representation for Pressure
  toJSON() { return { value: this.value, unit: this.unit }; }
}

// keeps track of weather forecast for a certain timespan
// holds a lot of details

class SlottedForecast {
  constructor(from, to, period, icon, precipitation, windDirection, windSpeed,
    temperature, pressure) {
    this.from = from;
    this.to = to;
    this.period = period;
    this.icon = icon;
    this.precipitation = precipitation;
    this.windDirection = windDirection;
    this.windSpeed = windSpeed;
    this.temperature = temperature;
    this.pressure = pressure;
  }

  static fromJSON(jsonObject) {
    let slottedForecast = new SlottedForecast(null, null, null, null, null,
      null, null, null, null);
    slottedForecast.from = jsonObject.from;
    slottedForecast.to = jsonObject.to;
    slottedForecast.period = jsonObject.period;
    slottedForecast.icon = WeatherIcon.fromJSON(jsonObject.icon);
    slottedForecast.precipitation = jsonObject.precipitation;
    slottedForecast.windDirection =
      WindDirection.fromJSON(jsonObject.windDirection);
    slottedForecast.windSpeed = WindSpeed.fromJSON(jsonObject.windSpeed);
    slottedForecast.temperature = Temperature.fromJSON(jsonObject.temperature);
    slottedForecast.pressure = Pressure.fromJSON(jsonObject.pressure);
    return slottedForecast;
  }

  // Returns a JSON equivalent representation for SlottedForecast
  toJSON() {
    return {
      from: this.from,
      to: this.to,
      period: this.period,
      icon: this.icon.toJSON(),
      precipitation: this.precipitation,
      windDirection: this.windDirection.toJSON(),
      windSpeed: this.windSpeed.toJSON(),
      temperature: this.temperature.toJSON(),
      pressure: this.pressure.toJSON()
    };
  }
}

// it'll basically maintain an array of SlottedForecast objects
// each element will hold record of weather forecast for a certain timespan, which will
// be specified in that object

class Forecast {
  constructor(slottedForecasts) { this.slottedForecasts = slottedForecasts; }

  static fromJSON(jsonObject) {
    let foreCast = new Forecast([]);
    // using functional construct
    foreCast.slottedForecasts =
      jsonObject.map((elem) => SlottedForecast.fromJSON(elem));
    return foreCast;
  }

  // Returns a JSON equivalent representation for Forecast
  toJSON() { return this.slottedForecasts.map((elem) => elem.toJSON()); }
}

// this one holds a whole forecast dataset, for current place of concern
// containing everything starting from geolocation, meta data, sunrise-sunset information etc.

class WeatherData {
  constructor(geoLocation, meta, sun, forecast) {
    this.geoLocation = geoLocation;
    this.meta = meta;
    this.sun = sun;
    this.forecast = forecast;
  }

  static fromJSON(jsonObject) {
    let weatherData = new WeatherData(null, null, null, null);
    weatherData.geoLocation = GeoLocation.fromJSON(jsonObject.geoLocation);
    weatherData.meta = MetaData.fromJSON(jsonObject.meta);
    weatherData.sun = Sun.fromJSON(jsonObject.sun);
    weatherData.forecast = Forecast.fromJSON(jsonObject.forecast);
    return weatherData;
  }

  // Returns a JSON equivalent representation for WeatherData
  toJSON() {
    return {
      geoLocation: this.geoLocation.toJSON(),
      meta: this.meta.toJSON(),
      sun: this.sun.toJSON(),
      forecast: this.forecast.toJSON()
    };
  }
}

// following class is designed to hold record of a certain place's
// all weather forecast's ever received
//
// basically this will be useful in extracting weather forecast data
// already fetched, preocessed and stored
//
// can also be used for appending newer forecast dataset
// and store back to record file, kept in `../data/`

class WeatherDataCollection {
  constructor(weatherDataSet) { this.weatherDataSet = weatherDataSet; }

  // you'll most probably be using this one, for creating an instance of this class
  // while reading dataset from a certain file, where data will be kept as JSON string

  static fromJSON(jsonObject) {
    let weatherDataCollection = new WeatherDataCollection([]);
    weatherDataCollection.weatherDataSet =
      jsonObject.map((elem) => WeatherData.fromJSON(elem));
    return weatherDataCollection;
  }

  // appends another instance of WeatherData class holding record of weather forecast data,
  // for a certain time period, and returns `this`,
  // so that method chaining can be done easily
  //
  // make sure you pass JSONified data from `./model/data/WeatherData` class's instance
  // which will be converted here, so that it can be stored in local record keeper file(s)

  addAnother(weatherData) {
    if (this.weatherDataSet !== undefined && this.weatherDataSet !== null)
      this.weatherDataSet.push(WeatherData.fromJSON(weatherData));
    else
      this.weatherDataSet = [WeatherData.fromJSON(weatherData)];
    return this;
  }

  // you'll mostly use this when you'll require to convert this object to JSON string representation
  // for storing back to record holder file, where it keeps all weather forecast(s) ever received
  // for current place of concern


  toJSON() {
    return (this.weatherDataSet !== undefined && this.weatherDataSet !== null)
      ? { dataSet: this.weatherDataSet.map((elem) => elem.toJSON()) }
      : { dataSet: [] };
  }
}

// making it available to be used from outside

module.exports = {
  WeatherDataCollection: WeatherDataCollection, // and this one, when we already have some waether forecast record(s) for current place of concern, so that newer record(s) can be appended to it
  instance: new WeatherDataCollection([]) // use it when you find out, there's no weather forecast record for this place
};
