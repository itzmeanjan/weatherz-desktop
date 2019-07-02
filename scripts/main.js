'use strict';
const { ipcRenderer } = require('electron');
window.addEventListener('DOMContentLoaded', (event) => {
    ipcRenderer.on('CountryList', (event, data) => {
        if (data !== undefined) {
            document.getElementById('mainDiv').removeChild(document.getElementById('waitText'));
            let selectTag = document.createElement('select');
            selectTag.autofocus = true
            data.forEach((elem) => {
                let tmpOption = document.createElement('option');
                tmpOption.value = elem;
                tmpOption.text = elem;
                selectTag.appendChild(tmpOption);
            });
            document.getElementById('mainDiv').appendChild(selectTag);
        }
        else
            document.getElementById('waitText').innerText = 'Something went wrong :/';
    });
    ipcRenderer.send('DOMContentLoaded', 'loaded');
});