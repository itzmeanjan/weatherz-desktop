'use strict';

class TimeZone {
  // utcOffset is in `minute`
  constructor(id, utcOffset) {
    this.id = id;
    this.utcOffset = utcOffset;
  }

  static fromJSON(jsonObject) {
    let timeZone = new TimeZone(null, null);
    timeZone.id = jsonObject.id;
    timeZone.utcOffset = jsonObject.utcoffsetMinutes;
    return timeZone;
  }

  // Returns a JSON equivalent representation for TimeZone
  toJSON() {
    return {
      id: this.id,
      utcOffset: this.utcOffset
    };
  }
}

class LonLat {
  // geonameid is from GeoNames Database, can be found here
  // https://github.com/itzmeanjan/countryAndWeather
  constructor(longitude, latitude, altitude, geonameid) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.altitude = altitude;
    this.geonameid = geonameid;
  }

  static fromJSON(jsonObject) {
    let lonLat = new LonLat(null, null, null, null);
    lonLat.longitude = jsonObject.longitude;
    lonLat.latitude = jsonObject.latitude;
    lonLat.altitude = jsonObject.altitude;
    lonLat.geonameid = jsonObject.geobaseid;
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

class GeoLocation {
  constructor(name, type, country, tz, lonlat) {
    this.name = name;
    this.type = type;
    this.country = country;
    this.tz = tz;
    this.lonlat = lonlat;
  }

  static fromJSON(jsonObject) {
    let geoLocation = new GeoLocation(null, null, null, null, null);
    geoLocation.name = jsonObject.name[0];
    geoLocation.type = jsonObject.type[0];
    geoLocation.country = jsonObject.country[0];
    geoLocation.tz = TimeZone.fromJSON(jsonObject.timezone[0].$);
    geoLocation.lonlat = LonLat.fromJSON(jsonObject.location[0].$);
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

class MetaData {
  constructor(lastUpdate, nextUpdate) {
    this.lastUpdate = lastUpdate;
    this.nextUpdate = nextUpdate;
  }

  static fromJSON(jsonObject) {
    let metaData = new MetaData(null, null);
    metaData.lastUpdate = jsonObject.lastupdate[0];
    metaData.nextUpdate = jsonObject.nextupdate[0];
    return metaData;
  }

  // Returns a JSON equivalent representation for MetaData
  toJSON() {
    return {
      lastUpdate: this.lastUpdate,
      nextUpdate: this.nextUpdate
    };
  }
}

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
  toJSON() {
    return {
      rise: this.rise,
      set: this.set
    };
  }
}

class WeatherIcon {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  static fromJSON(jsonObject) {
    let weatherIcon = new WeatherIcon(null, null);
    weatherIcon.name = jsonObject.name;
    weatherIcon.id = jsonObject.var;
    return weatherIcon;
  }

  // Returns a JSON equivalent representation for WeatherIcon
  toJSON() {
    return {
      name: this.name,
      id: this.id
    };
  }
}

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
    return {
      name: this.name,
      code: this.code,
      degree: this.degree
    };
  }
}

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
  toJSON() {
    return {
      name: this.name,
      speed: this.speed
    };
  }
}

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
  toJSON() {
    return {
      value: this.value,
      unit: this.unit
    };
  }
}

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
  toJSON() {
    return {
      value: this.value,
      unit: this.unit
    };
  }
}

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
    slottedForecast.from = jsonObject.$.from;
    slottedForecast.to = jsonObject.$.to;
    slottedForecast.period = jsonObject.$.period;
    slottedForecast.icon = WeatherIcon.fromJSON(jsonObject.symbol[0].$);
    slottedForecast.precipitation = jsonObject.precipitation[0].$.value;
    slottedForecast.windDirection =
      WindDirection.fromJSON(jsonObject.windDirection[0].$);
    slottedForecast.windSpeed = WindSpeed.fromJSON(jsonObject.windSpeed[0].$);
    slottedForecast.temperature =
      Temperature.fromJSON(jsonObject.temperature[0].$);
    slottedForecast.pressure = Pressure.fromJSON(jsonObject.pressure[0].$);
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

class Forecast {
  constructor(slottedForecasts) { this.slottedForecasts = slottedForecasts; }

  static fromJSON(jsonObject) {
    let foreCast = new Forecast([]);
    // using functional construct
    foreCast.slottedForecasts = jsonObject.map((elem) => SlottedForecast.fromJSON(elem));
    return foreCast;
  }

  // Returns a JSON equivalent representation for Forecast
  toJSON() {
    return this.slottedForecasts.map((elem) => elem.toJSON());
  }
}

class WeatherData {
  constructor(geoLocation, meta, sun, forecast) {
    this.geoLocation = geoLocation;
    this.meta = meta;
    this.sun = sun;
    this.forecast = forecast;
  }

  static fromJSON(jsonObject) {
    let weatherData = new WeatherData(null, null, null, null);
    weatherData.geoLocation = GeoLocation.fromJSON(jsonObject.location[0]);
    weatherData.meta = MetaData.fromJSON(jsonObject.meta[0]);
    weatherData.sun = Sun.fromJSON(jsonObject.sun[0].$);
    weatherData.forecast =
      Forecast.fromJSON(jsonObject.forecast[0].tabular[0].time);
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

module.exports = WeatherData;