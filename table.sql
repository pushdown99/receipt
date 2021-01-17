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

DROP TABLE member;
CREATE TABLE IF NOT EXISTS member (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email          varchar(64) NOT NULL,
  passwd         varchar(64) NOT NULL,        -- 패스워드
  name           varchar(64) NOT NULL,
  register       varchar(32) NOT NULL,        -- 사업자등록번호
  owner          varchar(64),
  divtype        varchar(64),
  biztype        varchar(64),
  tel            varchar(32),
  opendate       timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  address        varchar(32),

  logo           varchar(64),
  description    varchar(64),
  holiday        int,
  opening        varchar(32),
  closing        varchar(32),
  image          varchar(64),
  manager        varchar(64),
  managertel     varchar(64),
  used           int DEFAULT 1,
  enroll         varchar(32),
  ts             timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO member (email, passwd, name, tel, register) VALUES ('aaa@gmail.com', 'xyz', '스타벅스 전주한옥마을점', '010-1234-5678', '125-12-5678');
INSERT INTO member (email, passwd, name, tel, register) VALUES ('bbb@naver.com', 'xyz', '은행나무 게스트하우스', '010-1234-5678', '125-12-5678');
INSERT INTO member (email, passwd, name, tel, register) VALUES ('ccc@hanmail.com', 'xyz', '이디야 전주교대점', '010-1234-5678', '125-12-5678');
INSERT INTO member (email, passwd, name, tel, register) VALUES ('ddd@hotmail.com', 'xyz', '삼산마트', '010-1234-5678', '125-12-5678');

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

DROP TABLE city;
CREATE TABLE IF NOT EXISTS city (
  dong_cd        varchar(11) NOT NULL,
  sido_nm        varchar(45) NOT NULL,
  sigungu_nm     varchar(45) NOT NULL,
  dong_nm        varchar(45) NOT NULL,
  dong_cd2       varchar(11) NOT NULL,
  dong_nm2       varchar(45) NOT NULL,
  base_year      varchar(8)  NOT NULL
);


DROP TABLE admin_group;
CREATE TABLE IF NOT EXISTS admin_group (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  group_name     varchar(32) NOT NULL,
  group_type     varchar(32) NOT NULL,
  updater        varchar(32) NOT NULL,
  updated        timestamp NOT NULL,
  register       varchar(32) NOT NULL,
  refid          int NOT NULL,
  ts             timestamp NOT NULL
);

INSERT INTO admin_group (group_name, group_type, updater, updated, register, refid, ts) VALUES ('시스템관리자', '시스템', '관리자A', NOW(), '관리자A', 0, NOW());
INSERT INTO admin_group (group_name, group_type, updater, updated, register, refid, ts) VALUES ('운영관리자',   '시스템', '관리자A', NOW(), '관리자A', 1, NOW());
INSERT INTO admin_group (group_name, group_type, updater, updated, register, refid, ts) VALUES ('서비스관리자', '시스템', '관리자A', NOW(), '관리자A', 1, NOW());
INSERT INTO admin_group (group_name, group_type, updater, updated, register, refid, ts) VALUES ('가맹관리자',   '시스템', '관리자A', NOW(), '관리자A', 1, NOW());

INSERT INTO admin_group (group_name, group_type, updater, updated, register, refid, ts) VALUES ('서울관리자',   '관리자', '관리자B', NOW(), '관리자B', 3, NOW());
INSERT INTO admin_group (group_name, group_type, updater, updated, register, refid, ts) VALUES ('강남구',       '관리자', '관리자C', NOW(), '관리자C', 5, NOW());
INSERT INTO admin_group (group_name, group_type, updater, updated, register, refid, ts) VALUES ('강남구외 전체','관리자', '관리자C', NOW(), '관리자C', 5, NOW());
INSERT INTO admin_group (group_name, group_type, updater, updated, register, refid, ts) VALUES ('전북관리자',   '관리자', '관리자A', NOW(), '관리자A', 1, NOW());
INSERT INTO admin_group (group_name, group_type, updater, updated, register, refid, ts) VALUES ('서울관리자',   '관리자', '관리자D', NOW(), '관리자D', 4, NOW());
INSERT INTO admin_group (group_name, group_type, updater, updated, register, refid, ts) VALUES ('전분관리자',   '관리자', '관리자D', NOW(), '관리자D', 4, NOW());

DROP TABLE admin_member;
CREATE TABLE IF NOT EXISTS admin_member (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  member_name    varchar(32) NOT NULL,
  member_rcn     varchar(32) NOT NULL,
  status         varchar(8) NOT NULL,
  tel            varchar(32) NOT NULL,
  updater        varchar(32) NOT NULL,
  updated        timestamp NOT NULL,
  register       varchar(32) NOT NULL,
  ts             timestamp NOT NULL
);

INSERT INTO admin_member (member_name, member_rcn, status, tel, updater, updated, register, ts) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', '가입', '010-1234-5678', '관리자A', NOW(), '관리자A', NOW());
INSERT INTO admin_member (member_name, member_rcn, status, tel, updater, updated, register, ts) VALUES ('은행나무 게스트하우스', '125-12-12341', '해지', '010-1234-5678', '관리자B', NOW(), '관리자B', NOW());
INSERT INTO admin_member (member_name, member_rcn, status, tel, updater, updated, register, ts) VALUES ('이디야 전주교대점', '125-12-12342', '삭제', '010-1234-5678', '관리자A', NOW(), '관리자A', NOW());





DROP TABLE admin_member_history;
CREATE TABLE IF NOT EXISTS admin_member_history (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  member_name    varchar(32) NOT NULL,
  member_rcn     varchar(32) NOT NULL,
  history        varchar(32) NOT NULL,  -- 'information', 'coupon', 'stamp', 'advertise'
  updater        varchar(32) NOT NULL,
  updated        timestamp NOT NULL,
  done           varchar(32) NOT NULL,
  division       varchar(32) NOT NULL,
  description    varchar(32) NOT NULL
);

INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'information', '관리자1', NOW(), '삭제', '', '');
INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'information', '관리자1', NOW(), '수정', '담당자정보', '담당자명: 나성실');
INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'information', '관리자1', NOW(), '수정', '부가정보', '가맹점 로고: logo.png, 영업시간: [09:00 ~ 22:00)');
INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'information', '관리자3', NOW(), '수정', '기본정보', '대표자: 성춘향');
INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'information', '관리자3', NOW(), '조회', '', '');
INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'information', '관리자3', NOW(), '생성', '', '');


INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'coupon', '관리자1', NOW(), '삭제', '', '');
INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'coupon', '관리자1', NOW(), '수정', '프로모션쿠폰', '상태: 사용');
INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'coupon', '관리자1', NOW(), '수정', '스탬프쿠폰', '상태 사용');
INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'coupon', '관리자3', NOW(), '수정', '리워드쿠폰', '상태: 사용');
INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'coupon', '관리자3', NOW(), '조회', '', '');
INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'coupon', '관리자3', NOW(), '생성', '', '');



INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'stamp', '관리자1', NOW(), '수정', '', '상태: 중지');
INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'stamp', '관리자1', NOW(), '수정', '', '적립조건(금액): 3800');
INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'stamp', '관리자1', NOW(), '수정', '', '중복적립여부: 가능');
INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'stamp', '관리자3', NOW(), '수정', '', '상태: 사용');
INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'stamp', '관리자3', NOW(), '조회', '', '');


INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'advertise', '관리자1', NOW(), '수정', '', '서브이미지 sub_img1');
INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'advertise', '관리자1', NOW(), '수정', '', '서브이미지 sub_img2');
INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'advertise', '관리자3', NOW(), '수정', '', '대표이미지: leaflet.jpg');
INSERT INTO admin_member_history (member_name, member_rcn, history, updater, updated, done, division, description) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'advertise', '관리자3', NOW(), '조회', '', '');




























