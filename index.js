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
            width: 640,
            height: 360,
            center: true,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: true
            }
        }
    );
    mainWindow.loadFile("./pages/main.html");
});
ipcMain.on('DOMContentLoaded', (event) => {
    event.reply('CountryList', require('./countryList').get());
});