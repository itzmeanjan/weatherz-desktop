## mapRenderer
A collection of Python Scripts to render map of World and Countries, to be used in [weatherz-desktop](https://github.com/itzmeanjan/weatherz-desktop)

## what does it do ?
- Generates world map using _Mapnik_, which will be used as a background image [here](https://github.com/itzmeanjan/weatherz-desktop).
- Downloads free Geospatial Dataset from [here](https://biogeo.ucdavis.edu/data/gadm3.6/gadm36_levels_shp.zip).
- Then reads those data and pushes them into _PostgreSQL_ database( _PostGIS_ enabled ).
- Finally using those Country Geography Dataset to draw Country Map( using _Mapnik_ ), which will be eventually used [here](https://github.com/itzmeanjan/weatherz-desktop).

**More coming soon ...**