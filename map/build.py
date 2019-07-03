#!/usr/bin/python3

from __future__ import annotations
from os.path import abspath, join, dirname

try:
    import mapnik
except ImportError as e:
    print('[!]Module Unavailable : {}'.format(str(e)))
    exit(1)


def renderIt(style_sheet: str = abspath(join(dirname(__file__), 'world.xml'))):
    target = False
    try:
        myMap = mapnik.Map(720, 480)
        mapnik.load_map(myMap, style_sheet)
        myMap.zoom_all()
        mapnik.render_to_file(myMap, 'world.jpeg', 'jpeg100')
        target = True
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
