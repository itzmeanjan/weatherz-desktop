## mapRenderer
A Python Script to render _World Map_ and individual _Country Map(s)_, to be used in [weatherz-desktop](https://github.com/itzmeanjan/weatherz-desktop)

## what does it do ?
- Downloads free Geospatial Dataset from [here](https://biogeo.ucdavis.edu/data/gadm3.6/gadm36_levels_shp.zip).
- Generates world map and individual country map using _Mapnik_, which will be used as background image [here](https://github.com/itzmeanjan/weatherz-desktop).

## how does it do ?
- First download map data from [here](https://biogeo.ucdavis.edu/data/gadm3.6/gadm36_levels_shp.zip). Consider using following command from terminal.
```bash
$ wget https://biogeo.ucdavis.edu/data/gadm3.6/gadm36_levels_shp.zip
```
- After unzipping it, I've put it in `../data/` directory.
```bash
$ unzip gadm36_levels_shp.zip
$ mv gadm36_0.* ../data/
```
- Well downloaded dataset will have 5 layers, but `Layer-0` will hold _Country Outline_ in each feature. And we're currently interested in `Layer-0` only.
- Time to write a stylesheet, which will be used by _Mapnik_, for rendering map(s). Our stylesheet resides [here](./style.xml)
```xml
<Map background-color="#bdbdbd" srs="+proj=longlat +datum=WGS84 +no_defs ">
    <Style name="style1">
        <Rule>
            <PolygonSymbolizer fill="#424242" />
        </Rule>
    </Style>
    <Layer name="layer1">
        <StyleName>style1</StyleName>
        <Datasource>
            <Parameter name="file">../data/gadm36_0.shp</Parameter>
            <Parameter name="type">shape</Parameter>
        </Datasource>
    </Layer>
</Map>
```
- Parent element `Map` holds _background-color_ and Geospatial Reference System ( in `srs` attribute ).
- Now for each and every `Layer` in map, we need a `Style` element.
- As we're interested in drawing `Polygon/ Multipolygon` for each country, we'll put it under a `Rule` element, within our only `Style` element, named `style1`.
- Now for this `Layer`, we need a `DataSource`, which is simply our downloaded _ShapeFile_.
- Now run `build.py` to render World map and individual map of all countries. Generated maps to be stored in `../map/`.

Each country specific map will be stored in `XXX.jpeg`, where `XXX` denotes _ISO3_ code for a certain country.

World map will be stored in `world.jpeg`.
```bash
$ time python3 build.py
```
This will be pretty fast. Make sure, you've downloaded dataset properly and placed it in `../data/` directory.
```bash
Success

real	1m20.497s
user	1m19.909s
sys	0m0.920s
```

## maps ::
### World Map :
![World Map](./world.jpeg)
### Aruba :
![ABW](./ABW.jpeg)
### Afghanistan :
![AFG](./AFG.jpeg)
### Angola :
![AGO](./AGO.jpeg)
### Anguilla :
![AIA](./AIA.jpeg)
### Åland :
![ALA](./ALA.jpeg)
### Albania :
![ALB](./ALB.jpeg)
### Andorra :
![AND](./AND.jpeg)
### United Arab Emirates :
![ARE](./ARE.jpeg)
### Argentina :
![ARG](./ARG.jpeg)
### Armenia :
![ARM](./ARM.jpeg)
### American Samoa :
![ASM](./ASM.jpeg)
### Antarctica :
![ATA](./ATA.jpeg)
### French Southern Territories :
![ATF](./ATF.jpeg)
### Antigua and Barbuda :
![ATG](./ATG.jpeg)
### Australia :
![AUS](./AUS.jpeg)
### Austria :
![AUT](./AUT.jpeg)
### Azerbaijan :
![AZE](./AZE.jpeg)
### Burundi :
![BDI](./BDI.jpeg)
### Belgium :
![BEL](./BEL.jpeg)
### Benin :
![BEN](./BEN.jpeg)
### Bonaire, Sint Eustatius and Saba :
![BES](./BES.jpeg)
### Burkina Faso :
![BFA](./BFA.jpeg)
### Bangladesh :
![BGD](./BGD.jpeg)
### Bulgaria :
![BGR](./BGR.jpeg)
### Bahrain :
![BHR](./BHR.jpeg)
### Bahamas :
![BHS](./BHS.jpeg)
### Bosnia and Herzegovina :
![BIH](./BIH.jpeg)
### Saint-Barthélemy :
![BLM](./BLM.jpeg)
### Belarus :
![BLR](./BLR.jpeg)
### Belize :
![BLZ](./BLZ.jpeg)
### Bermuda :
![BMU](./BMU.jpeg)
### Bolivia :
![BOL](./BOL.jpeg)
### Brazil :
![BRA](./BRA.jpeg)
### Barbados :
![BRB](./BRB.jpeg)
### Brunei :
![BRN](./BRN.jpeg)
### Bhutan :
![BTN](./BTN.jpeg)
### Bouvet Island :
![BVT](./BVT.jpeg)
### Botswana :
![BWA](./BWA.jpeg)
### Central African Republic :
![CAF](./CAF.jpeg)
### Canada :
![CAN](./CAN.jpeg)
### Cocos Islands :
![CCK](./CCK.jpeg)
### Switzerland :
![CHE](./CHE.jpeg)
### Chile :
![CHL](./CHL.jpeg)
### China :
![CHN](./CHN.jpeg)
### Côte d'Ivoire :
![CIV](./CIV.jpeg)
### Cameroon :
![CMR](./CMR.jpeg)
### Democratic Republic of the Congo :
![COD](./COD.jpeg)
### Republic of Congo :
![COG](./COG.jpeg)
### Cook Islands :
![COK](./COK.jpeg)
### Colombia :
![COL](./COL.jpeg)
### Comoros :
![COM](./COM.jpeg)
### Cape Verde :
![CPV](./CPV.jpeg)
### Costa Rica :
![CRI](./CRI.jpeg)
### Cuba :
![CUB](./CUB.jpeg)
### Curaçao :
![CUW](./CUW.jpeg)
### Christmas Island :
![CXR](./CXR.jpeg)
### Cayman Islands :
![CYM](./CYM.jpeg)
### Cyprus :
![CYP](./CYP.jpeg)
### Czech Republic :
![CZE](./CZE.jpeg)
### Germany :
![DEU](./DEU.jpeg)
### Djibouti :
![DJI](./DJI.jpeg)
### Dominica :
![DMA](./DMA.jpeg)
### Denmark :
![DNK](./DNK.jpeg)
### Dominican Republic :
![DOM](./DOM.jpeg)
### Algeria :
![DZA](./DZA.jpeg)
### Ecuador :
![ECU](./ECU.jpeg)
### Egypt :
![EGY](./EGY.jpeg)
### Eritrea :
![ERI](./ERI.jpeg)
### Western Sahara :
![ESH](./ESH.jpeg)
### Spain :
![ESP](./ESP.jpeg)
### Estonia :
![EST](./EST.jpeg)
### Ethiopia :
![ETH](./ETH.jpeg)
### Finland :
![FIN](./FIN.jpeg)
### Fiji :
![FJI](./FJI.jpeg)
### Falkland Islands :
![FLK](./FLK.jpeg)
### France :
![FRA](./FRA.jpeg)
### Faroe Islands :
![FRO](./FRO.jpeg)
### Micronesia :
![FSM](./FSM.jpeg)
### Gabon :
![GAB](./GAB.jpeg)
### United Kingdom :
![GBR](./GBR.jpeg)
### Georgia :
![GEO](./GEO.jpeg)
### Guernsey :
![GGY](./GGY.jpeg)
### Ghana :
![GHA](./GHA.jpeg)
### Gibraltar :
![GIB](./GIB.jpeg)
### Guinea :
![GIN](./GIN.jpeg)
### Guadeloupe :
![GLP](./GLP.jpeg)
### Gambia :
![GMB](./GMB.jpeg)
### Guinea-Bissau :
![GNB](./GNB.jpeg)
### Equatorial Guinea :
![GNQ](./GNQ.jpeg)
### Greece :
![GRC](./GRC.jpeg)
### Grenada :
![GRD](./GRD.jpeg)
### Greenland :
![GRL](./GRL.jpeg)
### Guatemala :
![GTM](./GTM.jpeg)
### French Guiana :
![GUF](./GUF.jpeg)
### Guam :
![GUM](./GUM.jpeg)
### Guyana :
![GUY](./GUY.jpeg)
### Hong Kong :
![HKG](./HKG.jpeg)
### Heard Island and McDonald Islands :
![HMD](./HMD.jpeg)
### Honduras :
![HND](./HND.jpeg)
### Croatia :
![HRV](./HRV.jpeg)
### Haiti :
![HTI](./HTI.jpeg)
### Hungary :
![HUN](./HUN.jpeg)
### Indonesia :
![IDN](./IDN.jpeg)
### Isle of Man :
![IMN](./IMN.jpeg)
### India :
![IND](./IND.jpeg)
### British Indian Ocean Territory :
![IOT](./IOT.jpeg)
### Ireland :
![IRL](./IRL.jpeg)
### Iran :
![IRN](./IRN.jpeg)
### Iraq :
![IRQ](./IRQ.jpeg)
### Iceland :
![ISL](./ISL.jpeg)
### Israel :
![ISR](./ISR.jpeg)
### Italy :
![ITA](./ITA.jpeg)
### Jamaica :
![JAM](./JAM.jpeg)
### Jersey :
![JEY](./JEY.jpeg)
### Jordan :
![JOR](./JOR.jpeg)
### Japan :
![JPN](./JPN.jpeg)
### Kazakhstan :
![KAZ](./KAZ.jpeg)
### Kenya :
![KEN](./KEN.jpeg)
### Kyrgyzstan :
![KGZ](./KGZ.jpeg)
### Cambodia :
![KHM](./KHM.jpeg)
### Kiribati :
![KIR](./KIR.jpeg)
### Saint Kitts and Nevis :
![KNA](./KNA.jpeg)
### South Korea :
![KOR](./KOR.jpeg)
### Kuwait :
![KWT](./KWT.jpeg)
### Laos :
![LAO](./LAO.jpeg)
### Lebanon :
![LBN](./LBN.jpeg)
### Liberia :
![LBR](./LBR.jpeg)
### Libya :
![LBY](./LBY.jpeg)
### Saint Lucia :
![LCA](./LCA.jpeg)
### Liechtenstein :
![LIE](./LIE.jpeg)
### Sri Lanka :
![LKA](./LKA.jpeg)
### Lesotho :
![LSO](./LSO.jpeg)
### Lithuania :
![LTU](./LTU.jpeg)
### Luxembourg :
![LUX](./LUX.jpeg)
### Latvia :
![LVA](./LVA.jpeg)
### Macao :
![MAC](./MAC.jpeg)
### Saint-Martin :
![MAF](./MAF.jpeg)
### Morocco :
![MAR](./MAR.jpeg)
### Monaco :
![MCO](./MCO.jpeg)
### Moldova :
![MDA](./MDA.jpeg)
### Madagascar :
![MDG](./MDG.jpeg)
### Maldives :
![MDV](./MDV.jpeg)
### Mexico :
![MEX](./MEX.jpeg)
### Marshall Islands :
![MHL](./MHL.jpeg)
### Macedonia :
![MKD](./MKD.jpeg)
### Mali :
![MLI](./MLI.jpeg)
### Malta :
![MLT](./MLT.jpeg)
### Myanmar :
![MMR](./MMR.jpeg)
### Montenegro :
![MNE](./MNE.jpeg)
### Mongolia :
![MNG](./MNG.jpeg)
### Northern Mariana Islands :
![MNP](./MNP.jpeg)
### Mozambique :
![MOZ](./MOZ.jpeg)
### Mauritania :
![MRT](./MRT.jpeg)
### Montserrat :
![MSR](./MSR.jpeg)
### Martinique :
![MTQ](./MTQ.jpeg)
### Mauritius :
![MUS](./MUS.jpeg)
### Malawi :
![MWI](./MWI.jpeg)
### Malaysia :
![MYS](./MYS.jpeg)
### Mayotte :
![MYT](./MYT.jpeg)
### Namibia :
![NAM](./NAM.jpeg)
### New Caledonia :
![NCL](./NCL.jpeg)
### Niger :
![NER](./NER.jpeg)
### Norfolk Island :
![NFK](./NFK.jpeg)
### Nigeria :
![NGA](./NGA.jpeg)
### Nicaragua :
![NIC](./NIC.jpeg)
### Niue :
![NIU](./NIU.jpeg)
### Netherlands :
![NLD](./NLD.jpeg)
### Norway :
![NOR](./NOR.jpeg)
### Nepal :
![NPL](./NPL.jpeg)
### Nauru :
![NRU](./NRU.jpeg)
### New Zealand :
![NZL](./NZL.jpeg)
### Oman :
![OMN](./OMN.jpeg)
### Pakistan :
![PAK](./PAK.jpeg)
### Panama :
![PAN](./PAN.jpeg)
### Pitcairn Islands :
![PCN](./PCN.jpeg)
### Peru :
![PER](./PER.jpeg)
### Philippines :
![PHL](./PHL.jpeg)
### Palau :
![PLW](./PLW.jpeg)
### Papua New Guinea :
![PNG](./PNG.jpeg)
### Poland :
![POL](./POL.jpeg)
### Puerto Rico :
![PRI](./PRI.jpeg)
### North Korea :
![PRK](./PRK.jpeg)
### Portugal :
![PRT](./PRT.jpeg)
### Paraguay :
![PRY](./PRY.jpeg)
### Palestina :
![PSE](./PSE.jpeg)
### French Polynesia :
![PYF](./PYF.jpeg)
### Qatar :
![QAT](./QAT.jpeg)
### Reunion :
![REU](./REU.jpeg)
### Romania :
![ROU](./ROU.jpeg)
### Russia :
![RUS](./RUS.jpeg)
### Rwanda :
![RWA](./RWA.jpeg)
### Saudi Arabia :
![SAU](./SAU.jpeg)
### Sudan :
![SDN](./SDN.jpeg)
### Senegal :
![SEN](./SEN.jpeg)
### Singapore :
![SGP](./SGP.jpeg)
### South Georgia and the South Sandwich Islands :
![SGS](./SGS.jpeg)
### Saint Helena :
![SHN](./SHN.jpeg)
### Svalbard and Jan Mayen :
![SJM](./SJM.jpeg)
### Solomon Islands :
![SLB](./SLB.jpeg)
### Sierra Leone :
![SLE](./SLE.jpeg)
### El Salvador :
![SLV](./SLV.jpeg)
### San Marino :
![SMR](./SMR.jpeg)
### Somalia :
![SOM](./SOM.jpeg)
### Saint Pierre and Miquelon :
![SPM](./SPM.jpeg)
### Serbia :
![SRB](./SRB.jpeg)
### South Sudan :
![SSD](./SSD.jpeg)
### São Tomé and Príncipe :
![STP](./STP.jpeg)
### Suriname :
![SUR](./SUR.jpeg)
### Slovakia :
![SVK](./SVK.jpeg)
### Slovenia :
![SVN](./SVN.jpeg)
### Sweden :
![SWE](./SWE.jpeg)
### Swaziland :
![SWZ](./SWZ.jpeg)
### Sint Maarten :
![SXM](./SXM.jpeg)
### Seychelles :
![SYC](./SYC.jpeg)
### Syria :
![SYR](./SYR.jpeg)
### Turks and Caicos Islands :
![TCA](./TCA.jpeg)
### Chad :
![TCD](./TCD.jpeg)
### Togo :
![TGO](./TGO.jpeg)
### Thailand :
![THA](./THA.jpeg)
### Tajikistan :
![TJK](./TJK.jpeg)
### Tokelau :
![TKL](./TKL.jpeg)
### Turkmenistan :
![TKM](./TKM.jpeg)
### Timor-Leste :
![TLS](./TLS.jpeg)
### Tonga :
![TON](./TON.jpeg)
### Trinidad and Tobago :
![TTO](./TTO.jpeg)
### Tunisia :
![TUN](./TUN.jpeg)
### Turkey :
![TUR](./TUR.jpeg)
### Tuvalu :
![TUV](./TUV.jpeg)
### Taiwan :
![TWN](./TWN.jpeg)
### Tanzania :
![TZA](./TZA.jpeg)
### Uganda :
![UGA](./UGA.jpeg)
### Ukraine :
![UKR](./UKR.jpeg)
### United States Minor Outlying Islands :
![UMI](./UMI.jpeg)
### Uruguay :
![URY](./URY.jpeg)
### United States :
![USA](./USA.jpeg)
### Uzbekistan :
![UZB](./UZB.jpeg)
### Vatican City :
![VAT](./VAT.jpeg)
### Saint Vincent and the Grenadines :
![VCT](./VCT.jpeg)
### Venezuela :
![VEN](./VEN.jpeg)
### British Virgin Islands :
![VGB](./VGB.jpeg)
### Virgin Islands, U.S. :
![VIR](./VIR.jpeg)
### Vietnam :
![VNM](./VNM.jpeg)
### Vanuatu :
![VUT](./VUT.jpeg)
### Wallis and Futuna :
![WLF](./WLF.jpeg)
### Samoa :
![WSM](./WSM.jpeg)
### Akrotiri and Dhekelia :
![XAD](./XAD.jpeg)
### Caspian Sea :
![XCA](./XCA.jpeg)
### Clipperton Island :
![XCL](./XCL.jpeg)
### Kosovo :
![XKO](./XKO.jpeg)
### Northern Cyprus :
![XNC](./XNC.jpeg)
### Paracel Islands :
![XPI](./XPI.jpeg)
### Spratly Islands :
![XSP](./XSP.jpeg)
### Yemen :
![YEM](./YEM.jpeg)
### South Africa :
![ZAF](./ZAF.jpeg)
### Zambia :
![ZMB](./ZMB.jpeg)
### Zimbabwe :
![ZWE](./ZWE.jpeg)

**Autopopulated by `populate.py`**

**Note : Data collected from _GADM_, so no reponsibility taken by author of these script(s), for generated map(s).**

Hoping this helps :wink:
