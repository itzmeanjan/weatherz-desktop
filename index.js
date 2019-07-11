'use strict';
const { app, BrowserWindow, ipcMain } = require('electron');
app.setName('WeatherZ');
app.addListener('window-all-closed', () => { app.quit(); });
let mainWindow;
app.addListener('ready', () => {
    mainWindow = new BrowserWindow({
        width: require('electron').screen.getPrimaryDisplay().size.width * .64,
        height: require('electron').screen.getPrimaryDisplay().size.height * .4,
        center: true,
        autoHideMenuBar: true,
        webPreferences: { nodeIntegration: true }
    });
    mainWindow.loadFile("./pages/main.html");
});
// selected country, place and pair of them holder
// weatherForecast will hold an instance of WeatherData class, which will
// eventually keep record of weather for selected place
let currentCountrySelection, currentPlaceSelection, selectedPlace,
    weatherForecast;

let isoToIso3Obj;

require('./iso_2_iso3')().then((value) => isoToIso3Obj = value,
    (err) => console.log(err));

ipcMain.on('DOMContentLoaded',
    (event) => require('./countryList')
        .get.then((data) => event.reply('CountryList', data),
            (err) => event.reply('CountryList', err)));
ipcMain.on('CountrySelectionChanged', (event, data) => {
    currentCountrySelection = data; // selection gets changed
    event.reply('UpdateBackground', isoToIso3Obj.getByISO(currentCountrySelection));
    require('./placeList')
        .get(currentCountrySelection)
        .then((data) => event.reply('CountrySelectionChanged', data),
            (err) => event.reply('CountrySelectionChanged', err));
});

ipcMain.on('AddPlace', (event, data) => {
    currentPlaceSelection = data;
    require('./weatherURL')
        .get(currentCountrySelection, currentPlaceSelection)
        .then(
            (value) => {
                selectedPlace = value;
                require('./weatherQuery')(selectedPlace.url)
                    .then(
                        (resp) => {
                            weatherForecast = resp;
                            console.log(weatherForecast);
                        },
                        (err) => { console.log(err); });
            },
            (err) => { console.log(err); });
});
