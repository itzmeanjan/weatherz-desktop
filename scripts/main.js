'use strict';
const { ipcRenderer } = require('electron');
window.addEventListener('DOMContentLoaded', (event) => {
    let selectCountry;
    let placeData;
    ipcRenderer.on('CountryList', (event, data) => {
        if (data !== undefined && data !== null) {
            selectCountry = document.createElement('select');
            selectCountry.id = 'countrySelect';
            selectCountry.autofocus = true;
            selectCountry.style.color = '#424242';
            selectCountry.style.backgroundColor = '#CEF6EC';
            selectCountry.addEventListener('change', () => {
                ipcRenderer.send(
                    'CountrySelectionChanged',
                    selectCountry.options[selectCountry.selectedIndex].value);
            });
            Object.keys(data).forEach((elem) => {
                let tmpOption = document.createElement('option');
                tmpOption.value = elem;
                tmpOption.text = data[elem];
                selectCountry.appendChild(tmpOption);
            });
            document.getElementById('mainDiv').replaceChild(
                selectCountry, document.getElementById('waitText'));
            document.getElementById('mainDiv').appendChild(
                document.createElement('br'));
        } else
            document.getElementById('waitText').innerText = 'Something went wrong :/';
    });

    ipcRenderer.on('UpdateBackground', (event, data) => {
        if (data !== undefined && data != null)
            document.body.style.backgroundImage = `url(../map/${data}.jpeg)`;
    });

    function dataListCreator(attachHere, target, id, data) {
        let datalistElem;
        if (document.getElementById(id) !== undefined &&
            document.getElementById(id) !== null) {
            datalistElem = document.getElementById(id);
            while (datalistElem.firstChild) {
                datalistElem.removeChild(datalistElem.firstChild);
            }
        } else {
            datalistElem = document.createElement('datalist');
            datalistElem.id = id;
            attachHere.appendChild(datalistElem);
        }
        target.setAttribute('list', id);
        data.forEach((elem) => {
            let optionElem = document.createElement('option');
            optionElem.setAttribute('value', elem);
            datalistElem.appendChild(optionElem);
        });
    }

    ipcRenderer.on('CountrySelectionChanged', (event, data) => {
        if (data !== undefined && data !== null && data.length > 0) {
            placeData = data;
            let minElementLength = 999;
            placeData.forEach((el) => {
                if (el.length <= minElementLength)
                    minElementLength = el.length;
            });
            let backButton = document.createElement('button');
            backButton.id = 'backButton';
            backButton.addEventListener('click', (ev) => {
                document.getElementById('mainDiv').removeChild(
                    document.getElementById('backButton'));
                document.getElementById('mainDiv').removeChild(
                    document.getElementById('addButton'));
                document.getElementById('mainDiv').replaceChild(
                    selectCountry, document.getElementById('searchPlace'));
                if (document.getElementById('dataList') !== undefined &&
                    document.getElementById('dataList') !== null)
                    document.getElementById('mainDiv').removeChild(
                        document.getElementById('dataList'));
                document.body.style.backgroundImage = 'url("../map/world.jpeg")';
            });
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
            addButton.addEventListener('click', (ev) => {
                if (placeData.some(
                    (el) => el === document.getElementById('searchPlace').value))
                    ipcRenderer.send('AddPlace',
                        document.getElementById('searchPlace').value);
            });
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
            let searchPlace = document.createElement('input');
            searchPlace.id = 'searchPlace';
            searchPlace.style.borderRadius = '12px';
            searchPlace.setAttribute('size', '35');
            searchPlace.setAttribute('type', 'search');
            searchPlace.setAttribute('placeholder', 'Place Name');
            searchPlace.style.color = '#424242';
            searchPlace.style.backgroundColor = '#CEF6EC';
            searchPlace.addEventListener('change', () => {
                if (document.getElementById('searchPlace').value.length >=
                    minElementLength) {
                    let tmpStore = placeData.filter((elem) => {
                        try {
                            return document.getElementById('searchPlace')
                                .value.split(' ')
                                .filter((el) => el.length > 0)
                                .some((el) => new RegExp(`^(${el})`, 'i').test(elem));
                        } catch (e) {
                            return false;
                        }
                    });
                    if (!tmpStore.some(
                        (el) => el === document.getElementById('searchPlace').value))
                        dataListCreator(document.getElementById('mainDiv'),
                            document.getElementById('searchPlace'), 'dataList',
                            tmpStore);
                } else {
                    if (document.getElementById('dataList') !== undefined &&
                        document.getElementById('dataList') !== null) {
                        document.getElementById('searchPlace')
                            .setAttribute('list', undefined);
                        document.getElementById('mainDiv').removeChild(
                            document.getElementById('dataList'));
                    }
                }
            });
            document.getElementById('mainDiv').replaceChild(
                searchPlace, document.getElementById('countrySelect'));
            document.getElementById('mainDiv').appendChild(backButton);
            document.getElementById('mainDiv').appendChild(addButton);
        } else
            window.alert('Err: No Place Found !!!');
    });
    ipcRenderer.send('DOMContentLoaded');
});