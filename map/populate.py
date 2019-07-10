#!/usr/bin/python3

from __future__ import annotations
from os.path import abspath, dirname, join
try:
    from osgeo.ogr import Open
except ImportError as e:
    print('[!]Module Unavialable : {}'.format(str(e)))
    exit(1)


def app(target_file: str = './README.md') -> bool:
    target = False
    try:
        dataSource = Open(
            abspath(join(dirname(__file__), '../data/gadm36_0.shp')))
        layer = dataSource.GetLayer(0)
        with open(target_file, mode='a') as fd:
            fd.write(
                '\n## maps ::\n### World Map :\n![World Map](./world.jpeg)\n')
            fd.writelines(['### {0} :\n![{1}](./{1}.jpeg)\n'.format(feature.GetField('NAME_0'), feature.GetField(
                'GID_0')) for feature in (layer.GetFeature(i) for i in range(layer.GetFeatureCount()))])
            fd.write('\n**Autopopulated by `populate.py`**\n')
        target = True
    except Exception:
        target = False
    finally:
        return target


if __name__ == '__main__':
    try:
        print('Success' if app() else 'Failure')
    except Exception:
        print('\n[!]Terminated')
    finally:
        exit(0)
