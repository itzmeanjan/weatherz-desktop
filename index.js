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
ipcMain.on('DOMContentLoaded', (event, data) =>
    require('./countryList').get.then(
        (data) => {
            event.reply('CountryList', data);
        },
        (err) => event.reply('CountryList', err)
    ));
ipcMain.on('SelectionChanged', (event, data) => {
    console.log(data);
});