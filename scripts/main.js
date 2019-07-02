'use strict';
const { ipcRenderer } = require('electron');
window.addEventListener('DOMContentLoaded', (event) => {
    ipcRenderer.on('CountryList', (event, data) => {
        if (data !== undefined && data !== null) {
            document.getElementById('mainDiv').removeChild(document.getElementById('waitText'));
            let selectTag = document.createElement('select');
            selectTag.autofocus = true
            selectTag.addEventListener('change',
                (ev) =>
                    ipcRenderer.send('SelectionChanged', selectTag.options[selectTag.selectedIndex].value)
            );
            Object.keys(data).forEach((elem) => {
                let tmpOption = document.createElement('option');
                tmpOption.value = elem;
                tmpOption.text = data[elem];
                selectTag.appendChild(tmpOption);
            });
            document.getElementById('mainDiv').appendChild(selectTag);
            ipcRenderer.send('SelectionChanged', selectTag.options[selectTag.selectedIndex].value);
        }
        else
            document.getElementById('waitText').innerText = 'Something went wrong :/';
    });
    ipcRenderer.send('DOMContentLoaded', 'loaded');
});