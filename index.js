'use strict';
const { app, BrowserWindow, ipcMain } = require('electron');
app.setName('WeatherZ');
app.addListener('window-all-closed', () => {
    app.quit();
});
let mainWindow;
app.addListener('ready', () => {
    mainWindow = new BrowserWindow(
        {
            width: require('electron').screen.getPrimaryDisplay().size.width * .64,
            height: require('electron').screen.getPrimaryDisplay().size.height * .4,
            center: true,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: true
            }
        }
    );
    mainWindow.loadFile("./pages/main.html");
});
let currentCountrySelection, currentPlaceSelection, selectedPlace;
ipcMain.on('DOMContentLoaded', (event) =>
    require('./countryList').get.then(
        (data) => event.reply('CountryList', data),
        (err) => event.reply('CountryList', err)
    ));
ipcMain.on('CountrySelectionChanged', (event, data) => {
    currentCountrySelection = data; // selection gets changed
    require('./placeList').get(currentCountrySelection).then(
        (data) => event.reply('CountrySelectionChanged', data),
        (err) => event.reply('CountrySelectionChanged', err));
});
ipcMain.on('PlaceSelectionChanged', (event, data) => {
    currentPlaceSelection = data;
});

ipcMain.on('AddPlace', (event, data) => {
    currentPlaceSelection = data;
    require('./weatherURL').get(currentCountrySelection, currentPlaceSelection).then((value) => {
        selectedPlace = value;
        console.log(selectedPlace);
    }, (err) => {
        console.log(err);
    });
});