'use strict';
const { ipcRenderer } = require('electron');
window.addEventListener('DOMContentLoaded', (event) => {
    ipcRenderer.on('CountryList', (event, data) => {
        if (data !== undefined && data !== null) {
            let selectTag = document.createElement('select');
            selectTag.id = 'countrySelect';
            selectTag.autofocus = true;
            selectTag.style.color = '#424242';
            selectTag.style.backgroundColor = '#CEF6EC';
            selectTag.addEventListener('change',
                () => ipcRenderer.send('CountrySelectionChanged', selectTag.options[selectTag.selectedIndex].value)
            );
            Object.keys(data).forEach((elem) => {
                let tmpOption = document.createElement('option');
                tmpOption.value = elem;
                tmpOption.text = data[elem];
                selectTag.appendChild(tmpOption);
            });
            if (document.getElementById('waitText') !== undefined && document.getElementById('waitText') !== null) {
                document.getElementById('mainDiv').replaceChild(selectTag, document.getElementById('waitText'));
                document.getElementById('mainDiv').appendChild(document.createElement('br'));
            }
            else if (document.getElementById('placeSelect') !== undefined && document.getElementById('placeSelect') !== null) {
                document.getElementById('mainDiv').replaceChild(selectTag, document.getElementById('placeSelect'));
                document.getElementById('mainDiv').removeChild(document.getElementById('backButton'));
                document.getElementById('mainDiv').removeChild(document.getElementById('addButton'));
            }
            else
                document.getElementById('mainDiv').replaceChild(selectTag, document.getElementById('countrySelect'));
        }
        else
            document.getElementById('waitText').innerText = 'Something went wrong :/';
    });
    ipcRenderer.on('CountrySelectionChanged', (event, data) => {
        if (data !== undefined && data !== null && data.length > 0) {
            let backButton = document.createElement('button');
            backButton.id = 'backButton';
            backButton.addEventListener('click', (ev) =>
                ipcRenderer.send('BackClicked'));
            backButton.textContent = 'Back';
            backButton.style.backgroundColor = '#6644aa';
            backButton.style.border = '1px';
            backButton.style.display = 'inline-block';
            backButton.style.borderRadius = '12px';
            backButton.style.color = '#ffffff';
            backButton.style.paddingLeft = '12px';
            backButton.style.paddingRight = '12px';
            backButton.style.paddingTop = '6px';
            backButton.style.paddingBottom = '6px';
            backButton.style.marginTop = '6px';
            let addButton = document.createElement('button');
            addButton.id = 'addButton';
            addButton.addEventListener('click', (ev) => { });
            addButton.textContent = 'Add Place';
            addButton.style.backgroundColor = '#44de22';
            addButton.style.border = '1px';
            addButton.style.display = 'inline-block';
            addButton.style.borderRadius = '12px';
            addButton.style.color = '#ffffff';
            addButton.style.paddingLeft = '12px';
            addButton.style.paddingRight = '12px';
            addButton.style.paddingTop = '6px';
            addButton.style.paddingBottom = '6px';
            addButton.style.marginTop = '6px';
            addButton.style.marginLeft = '20px';
            let selectTag = document.createElement('select');
            selectTag.autofocus = true;
            selectTag.id = 'placeSelect';
            selectTag.style.color = '#424242';
            selectTag.style.backgroundColor = '#CEF6EC';
            selectTag.addEventListener('change',
                () =>
                    ipcRenderer.send('PlaceSelectionChanged', selectTag.options[selectTag.selectedIndex].value)
            );
            data.forEach((elem) => {
                let tmpOption = document.createElement('option');
                tmpOption.value = elem;
                tmpOption.text = elem;
                selectTag.appendChild(tmpOption);
            });
            document.getElementById('mainDiv').replaceChild(selectTag, document.getElementById('countrySelect'));
            document.getElementById('mainDiv').appendChild(backButton);
            document.getElementById('mainDiv').appendChild(addButton);
            ipcRenderer.send('PlaceSelectionChanged', selectTag.options[selectTag.selectedIndex].value);
        }
    });
    ipcRenderer.send('DOMContentLoaded');
});