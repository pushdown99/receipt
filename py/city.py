# -*- coding: utf-8 -*- 
from openpyxl import load_workbook
import pymysql

mydict = {}

def import_xlsxfile(filename):
    load_wb = load_workbook(filename, data_only=True)
    load_ws = load_wb['KIKmix']

    head = True
    for row in load_ws.rows:
        if head is True:
            head = False
            continue

        if row[2].value is None or row[3].value is None:
            continue

        if row[5].value is not None:
            dong_cd     = row[0].value  # A = row[0] 행정동코드 
            sido_nm     = row[1].value  # B = row[1] 시도명
            sigungu_nm  = row[2].value  # C = row[2] 시군구명
            dong_nm     = row[3].value  # D = row[3] 읍면동명
            dong_cd2    = row[4].value  # E = row[4] 법정동코드   
            dong_nm2    = row[5].value  # F = row[5] 동리명    
            base_year   = row[6].value  # G = row[6] 생성일자   
            #None       = row[7].value  # H = row[7] 말소일자
            mydict[dong_cd] = [sido_nm, sigungu_nm, dong_nm, dong_cd2, dong_nm2, base_year]
        
def insert_into_mysql():
    '''
    +------------+-------------+------+-----+---------+-------+
    | Field      | Type        | Null | Key | Default | Extra |
    +------------+-------------+------+-----+---------+-------+
    | dong_cd    | varchar(11) | NO   | PRI | NULL    |       |
    | sido_nm    | varchar(45) | NO   |     | NULL    |       |
    | sigungu_nm | varchar(45) | NO   |     | NULL    |       |
    | dong_nm    | varchar(45) | NO   |     | NULL    |       |
    | dong_cd2   | varchar(11) | NO   |     | NULL    |       |
    | dong_nm2   | varchar(45) | NO   |     | NULL    |       |
    | base_year  | varchar(8)  | NO   |     | NULL    |       |
    +------------+-------------+------+-----+---------+-------+
    7 rows in set (0.00 sec)
    '''
    conn = pymysql.connect(host='localhost', user='sqladmin', password='admin', db='hancom', charset='utf8')
    curs = conn.cursor()

    for key in mydict:
        arr = mydict[key]
        sql = "INSERT INTO city VALUES(\"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\");"\
            % (key, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5])
        curs.execute(sql)

    conn.commit()
    conn.close()

import_xlsxfile("data.xlsx")
insert_into_mysql()
