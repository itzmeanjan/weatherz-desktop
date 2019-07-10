#!/usr/bin/python3

from __future__ import annotations
from os.path import abspath, join, dirname
from typing import Tuple
try:
    import mapnik
    import osgeo.ogr as geo
except ImportError as e:
    print('[!]Module Unavailable : {}'.format(str(e)))
    exit(1)


def __renderCountry__(myMap: mapnik.Map, bbox: mapnik._Box2d, target_file: str, imageType: str) -> bool:
    '''
        Renders a certain country's map, for which BoundingBox is provided

        Generated image file will be stored in provided path.
    '''
    target = False
    try:
        myMap.zoom_to_box(bbox)
        mapnik.render_to_file(myMap, target_file, imageType)
        target = True
    except Exception:
        target = False
    finally:
        return target


def __getBox2d__(extent: List[float]) -> mapnik._Box2d:
    '''
        Converts a list of (minX, maxX, minY, maxY) to Box2d object

        This is done due to a required swapping operation.
    '''
    extent[1], extent[2] = extent[2], extent[1]
    return mapnik.Box2d(*extent)


def renderIt(style_sheet: str = abspath(join(dirname(__file__), 'style.xml'))):
    '''
        Main renderer, which generates world map & then iterates over ShapeFile,
        and for each Feature ( where a feature is a Country ), renders map.

        Well the basic stylesheet is used for all images to be generated.
    '''
    target = False
    try:
        myMap = mapnik.Map(720, 480)
        mapnik.load_map(myMap, style_sheet)
        myMap.zoom_all()
        mapnik.render_to_file(myMap, 'world.jpeg', 'jpeg100')
        dataSource = geo.Open(
            abspath(join(dirname(__file__), '../data/gadm36_0.shp')))
        layer = dataSource.GetLayer(0)
        target = all([__renderCountry__(myMap=myMap, bbox=__getBox2d__(list(feature.GetGeometryRef().GetEnvelope())), target_file=abspath(join(dirname(__file__), '{}.jpeg'.format(feature.GetField('GID_0')))), imageType='jpeg100') for feature in (layer.GetFeature(
            elem) for elem in range(layer.GetFeatureCount()))])
    except Exception:
        target = False
    finally:
        return target


if __name__ == '__main__':
    try:
        print('Success' if renderIt() else 'Failure')
    except KeyboardInterrupt:
        print('\n[!]Terminated')
    finally:
        exit(0)
