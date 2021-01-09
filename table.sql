CREATE USER 'sqladmin'@'localhost' IDENTIFIED BY 'admin'; GRANT ALL PRIVILEGES ON *.* TO 'sqladmin'@'localhost' WITH GRANT OPTION; FLUSH PRIVILEGES;
CREATE DATABASE hancom CHARACTER SET utf8 COLLATE utf8_general_ci;
USE hancom;
DROP TABLE receipt;
CREATE TABLE IF NOT EXISTS receipt (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email          varchar(64) NOT NULL,        -- 이메일
  name           varchar(64) NOT NULL,        -- 상호명
  register       varchar(32) NOT NULL,        -- 사업자등록번호
  tel            varchar(32) NOT NULL,        -- 전화번호
  address        varchar(64) NOT NULL,        -- 주소
  text           varchar(128) NOT NULL,       -- 영수증 (텍스트)
  pdf            varchar(128) NOT NULL,       -- 영수증 (PDF)
  total          int,                         -- 합계
  cash           int,                         -- 현금
  card           int,                         -- 카드
  ts             timestamp NOT NULL            -- 영수증발급시간
);

DROP TABLE users;
CREATE TABLE IF NOT EXISTS users (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email          varchar(64) NOT NULL UNIQUE, -- 이메일
  passwd         varchar(64) NOT NULL,        -- 패스워드
  fcmkey         varchar(256) ,                -- 키값
  ts             timestamp NOT NULL           -- 사용자등록시간
);

DROP TABLE qrcode;
CREATE TABLE IF NOT EXISTS qrcode (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email          varchar(64) NOT NULL UNIQUE, -- 이메일
  qrcode         varchar(64) NOT NULL UNIQUE, -- 패스워드
  ts             timestamp NOT NULL           -- 사용자등록시간
);

DROP TABLE issue;
CREATE TABLE IF NOT EXISTS issue (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email          varchar(64) NOT NULL UNIQUE, -- 이메일
  license        varchar(64) NOT NULL UNIQUE, -- 아이디
  ts             timestamp NOT NULL           -- 사용자등록시간
);

DROP TABLE license;
CREATE TABLE IF NOT EXISTS license (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  mac            varchar(64) NOT NULL UNIQUE, -- 이메일
  license        varchar(64) NOT NULL UNIQUE, -- 아이디
  ts             timestamp NOT NULL           -- 사용자등록시간
);

DROP TABLE coupon;
CREATE TABLE IF NOT EXISTS coupon (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email          varchar(64) NOT NULL,
  cpcode         varchar(64) NOT NULL,
  used           int,
  g_coupon_id    int,
  name           varchar(64) NOT NULL,
  register       varchar(64) NOT NULL,
  title          varchar(64) NOT NULL,
  genre          int DEFAULT 0,
  begins         timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ends           timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ts             timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE g_coupon;
CREATE TABLE IF NOT EXISTS g_coupon (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name           varchar(64) NOT NULL,
  register       varchar(64) NOT NULL,
  title          varchar(64) NOT NULL,
  pause          int DEFAULT 1,
  limits         int DEFAULT 1000,
  publish        int DEFAULT 0,
  genre          int DEFAULT 0,
  begins         timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ends           timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ts             timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE stamp;
CREATE TABLE IF NOT EXISTS stamp (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email          varchar(64) NOT NULL UNIQUE, -- 이메일
  title          varchar(64) NOT NULL,        -- 스탬프제목(아메리카노 1잔)
  paper          varchar(128) NOT NULL,       -- 종이이미지
  stamp          varchar(128) NOT NULL,       -- 도장이미지
  maxcnt         int,                         -- 최대개수
  cnt            int,                         -- 개수
  lat            double,                      -- 위도 latitude
  lng            double,                      -- 경도 longitude
  used           int,                         -- 사용여부
  store_id       int,                         -- 상점 id
  expire         timestamp NOT NULL,          -- 스탬프만료시간
  FOREIGN KEY (store_id)   REFERENCES store(id)
);

DROP TABLE store;
CREATE TABLE IF NOT EXISTS store (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name           varchar(64) NOT NULL,
  register       varchar(32) NOT NULL,
  license        varchar(64) NOT NULL,
  ts             timestamp NOT NULL
);

DROP TABLE fcm;
CREATE TABLE IF NOT EXISTS fcm (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email          varchar(64) NOT NULL,
  name           varchar(64) NOT NULL,
  total          int         NOT NULL,
  issue          varchar(32) NOT NULL,
  pdf            varchar(64) NOT NULL,
  text           varchar(64) NOT NULL,
  coupon         varchar(64) NOT NULL,
  ts             timestamp NOT NULL
);


