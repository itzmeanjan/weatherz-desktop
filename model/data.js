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
}

class LonLat {
    // geonameid is from GeoNames Database, can be found here https://github.com/itzmeanjan/countryAndWeather
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
        lonLat.geonameid = jsonObject.geonameid;
        return lonLat;
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
        geoLocation.name = jsonObject.name;
        geoLocation.type = jsonObject.type;
        geoLocation.country = jsonObject.country;
        geoLocation.tz = TimeZone.fromJSON(jsonObject.timezone);
        geoLocation.lonlat = LonLat.fromJSON(jsonObject.location);
        return geoLocation;
    }
}

class MetaData {
    constructor(lastUpdate, nextUpdate) {
        this.lastUpdate = lastUpdate;
        this.nextUpdate = nextUpdate;
    }

    static fromJSON(jsonObject) {
        let metaData = new MetaData(null, null);
        metaData.lastUpdate = jsonObject.lastupdate;
        metaData.nextUpdate = jsonObject.nextupdate;
        return metaData;
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
}

class Pressure {
    // by default unit will be in `hPa`
    constructor(value, unit) {
        this.value = value;
        this.unit = unit;
    }

    static fromJSON(jsonObject) {
        let pressure = new Pressure(null, null);
        pressure.value = value;
        pressure.unit = unit;
        return pressure;
    }
}

class SlottedForecast {
    constructor(from, to, period, icon, precipitation, windDirection, windSpeed, temperature, pressure) {
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
        let slottedForecast = new SlottedForecast(null, null, null, null, null, null, null, null, null);
        slottedForecast.from = jsonObject.from;
        slottedForecast.to = jsonObject.to;
        slottedForecast.period = jsonObject.period;
        slottedForecast.icon = WeatherIcon.fromJSON(jsonObject.symbol);
        slottedForecast.precipitation = jsonObject.precipitation;
        slottedForecast.windDirection = WindDirection.fromJSON(jsonObject.windDirection);
        slottedForecast.windSpeed = WindSpeed.fromJSON(jsonObject.windSpeed);
        slottedForecast.temperature = Temperature.fromJSON(jsonObject.temperature);
        slottedForecast.pressure = Pressure.fromJSON(jsonObject.pressure);
        return slottedForecast;
    }
}

class Forecast {
    constructor(slottedForecasts) {
        this.slottedForecasts = slottedForecasts;
    }

    static fromJSON(jsonObject) {
        let foreCast = new Forecast([]);
        jsonObject.forEach((elem) => {
            foreCast.slottedForecasts.push(SlottedForecast.fromJSON(elem.time));
        });
        return foreCast;
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
        weatherData.geoLocation = GeoLocation.fromJSON(jsonObject.location);
        weatherData.meta = MetaData.fromJSON(jsonObject.meta);
        weatherData.sun = Sun.fromJSON(jsonObject.sun);
        weatherData.forecast = Forecast.fromJSON(jsonObject.forecast.tabular);
        return weatherData;
    }
}
