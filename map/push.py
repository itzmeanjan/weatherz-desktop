#!/usr/bin/python3

from __future__ import annotations

try:
    import osgeo.ogr as geo
    from typing import List, Tuple
    import psycopg2 as psql
    from os.path import join, abspath, dirname
except ImportError as e:
    print('[!]Module Unavailable : {}'.format(str(e)))
    exit(1)


def __pushData__(dbName: str, userName: str, password: str, tableName: str, dataset: List[Tuple[str, str]]) -> bool:
    '''
        Takes dataset in form of `List[Tuple[str, str]]`, and pushed it to database, iteratively

        Returns boolean value to denote status of operation.
    '''
    target_value = False
    try:
        if(not dataset):
            raise Exception('no data to push')
        conn = psql.connect(database=dbName, user=userName, password=password)
        cursor = conn.cursor()
        for count, (iso, outline) in enumerate(dataset):
            cursor.execute('insert into {} values (%s, st_geogfromtext(%s))'.format(
                tableName), (iso, outline))
            if(not count % 50):
                conn.commit()
        else:
            conn.commit()
            cursor.close()
            conn.close()
            target_value = True
    except Exception:
        target_value = False
    finally:
        return target_value


def __readData__(target_file: str = abspath(join(dirname(__file__), '../data/gadm36_0.shp'))) -> List[Tuple[str, str]]:
    '''
        Reads to be pushed dataset from shapefiles.

        Here shapefile contains geography of all countries, stored only in a layer.
    '''
    target_value = []
    try:
        dataSource = geo.Open(target_file)
        layer = dataSource.GetLayer(0)
        target_value = [(elem.GetField('GID_0'), elem.GetGeometryRef().ExportToWkt()) for elem in [
            layer.GetFeature(elem) for elem in range(layer.GetFeatureCount())]]
    except Exception:
        target_value = []
    finally:
        return target_value


def __createTable__(dbName: str, userName: str, password: str, tableName: str) -> bool:
    '''
        Creates table within provided database. If it already exists,
        drops it first and then creates it. Also creates a gist( outline ) based index,
        where outline is a field, which will be storing outline geography of a country.
    '''
    target_value = False
    try:
        conn = psql.connect(database=dbName, user=userName, password=password)
        cursor = conn.cursor()
        cursor.execute('drop table if exists {}'.format(tableName))
        cursor.execute(
            'create table {} (country_iso varchar primary key, outline geography)'.format(tableName))
        cursor.execute('create index {} on {} using gist( outline )'.format(
            '{}_index'.format(tableName), tableName))
        conn.commit()
        cursor.close()
        conn.close()
        target_value = True
    except Exception:
        target_value = False
    finally:
        return target_value


def app(dbName: str = 'countrymap', userName: str = 'postgres', password: str = '@njan5m3dB', tableName: str = 'map') -> bool:
    '''
        Before invoking this function make sure you've installed postgresql on your system properly.

        And also download postgis extension, enable so for database `countrymap`.
    '''
    target_value = False
    try:
        if(__createTable__(dbName=dbName, userName=userName, password=password, tableName=tableName)):
            target_value = __pushData__(dbName=dbName, userName=userName, password=password,
                                        tableName=tableName, dataset=__readData__())
    except Exception:
        target_value = False
    finally:
        return target_value


if __name__ == '__main__':
    try:
        print('Success' if app() else 'Failure')
    except KeyboardInterrupt:
        print('\n[!]Terminated')
    finally:
        exit(0)
