*REATE USER 'sqladmin'@'localhost' IDENTIFIED BY 'admin'; GRANT ALL PRIVILEGES ON *.* TO 'sqladmin'@'localhost' WITH GRANT OPTION; FLUSH PRIVILEGES;
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
  fcmkey         varchar(256) DEFAULT '',
  birth_year     varchar(8) DEFAULT '',
  birth_month    varchar(8) DEFAULT '',
  birth_day      varchar(8) DEFAULT '',
  gender         varchar(8) DEFAULT '',
  area1          varchar(32) DEFAULT '',
  area2          varchar(32) DEFAULT '',
  activated      varchar(8) DEFAULT 'N',                  
  registered     timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, passwd) VALUES ('tt','xy');

INSERT INTO users (email, passwd) VALUES ('haeyun@gmail.com', 'xyz');

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
  updated        timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  refid          int NOT NULL,
  register       varchar(32) NOT NULL,
  registered     timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admin_group (group_name, group_type, updater, register, refid) VALUES ('시스템관리자', '시스템', '관리자A', '관리자A', 0);
INSERT INTO admin_group (group_name, group_type, updater, register, refid) VALUES ('운영관리자',   '시스템', '관리자A', '관리자A', 1);
INSERT INTO admin_group (group_name, group_type, updater, register, refid) VALUES ('서비스관리자', '시스템', '관리자A', '관리자A', 1);
INSERT INTO admin_group (group_name, group_type, updater, register, refid) VALUES ('가맹관리자',   '시스템', '관리자A', '관리자A', 1);

INSERT INTO admin_group (group_name, group_type, updater, register, refid) VALUES ('서울관리자',   '관리자', '관리자B', '관리자B', 3);
INSERT INTO admin_group (group_name, group_type, updater, register, refid) VALUES ('강남구',       '관리자', '관리자C', '관리자C', 5);
INSERT INTO admin_group (group_name, group_type, updater, register, refid) VALUES ('강남구외 전체','관리자', '관리자C', '관리자C', 5);
INSERT INTO admin_group (group_name, group_type, updater, register, refid) VALUES ('전북관리자',   '관리자', '관리자A', '관리자A', 1);
INSERT INTO admin_group (group_name, group_type, updater, register, refid) VALUES ('서울관리자',   '관리자', '관리자D', '관리자D', 4);
INSERT INTO admin_group (group_name, group_type, updater, register, refid) VALUES ('전분관리자',   '관리자', '관리자D', '관리자D', 4);

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

DROP TABLE admin_member;
CREATE TABLE IF NOT EXISTS admin_member (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  rcn            varchar(32) NOT NULL,
  passwd         varchar(32) NOT NULL,
  name           varchar(32) NOT NULL,
  owner          varchar(32) NOT NULL,
  bzcond         varchar(32) DEFAULT '',
  bztype         varchar(32) DEFAULT '',
  bzname         varchar(32) NOT NULL,
  phone          varchar(32) NOT NULL,
  opening        timestamp DEFAULT CURRENT_TIMESTAMP,
  area1          varchar(32) NOT NULL,
  area2          varchar(32) NOT NULL,
  address        varchar(128) NOT NULL,
  status         varchar(8) DEFAULT '사용',
  updater        varchar(32) DEFAULT '',
  updated        timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  register       varchar(32) DEFAULT '',
  registered     timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admin_member (rcn, passwd, name, owner, bzname, phone,address,  area1, area2, status, updater, register) VALUES ('125-12-12340', 'xy', '스타벅스 전주한옥마을점', '이수근', '카페', '010-1234-5678', '전라북도 전주시', '전라북도', '전주시', '가입', '관리자A', '관리자A');
INSERT INTO admin_member (rcn, passwd, name, owner, bzname, phone, address, area1, area2, status, updater, register) VALUES ('125-12-12341', 'xy', '은행나무 게스트하우스', '은지원', '식당', '010-1234-5678', '전라북도 전주시', '전라북도', '전주시', '해지', '관리자A', '관리자A');
INSERT INTO admin_member (rcn, passwd, name, owner, bzname, phone, address, area1, area2, status, updater, register) VALUES ('125-12-12342', 'xy', '이디야 전주교대점', '강호동', '카페', '010-1234-5678', '전라북도 전주시', '전라북도', '전주시', '삭제', '관리자B', '관리자B');





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



DROP TABLE admin_class;
CREATE TABLE IF NOT EXISTS admin_class (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  code_name      varchar(32) NOT NULL,
  icon_path      varchar(32) NOT NULL,
  updater        varchar(32) NOT NULL,
  updated        timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  register       varchar(32) NOT NULL,
  registered     timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admin_class (code_name, icon_path, updater, updated, register, registered) VALUES ('음식점', '/rc/icons/food.png', '관리자A', NOW(), '관리자A', NOW());
INSERT INTO admin_class (code_name, icon_path, updater, updated, register, registered) VALUES ('주점', '/rc/icons/wine.png', '관리자A', NOW(), '관리자A', NOW());
INSERT INTO admin_class (code_name, icon_path, updater, updated, register, registered) VALUES ('카페', '/rc/icons/cafe.png', '관리자A', NOW(), '관리자A', NOW());
INSERT INTO admin_class (code_name, icon_path, updater, updated, register, registered) VALUES ('병원', '/rc/icons/hospital.png', '관리자A', NOW(), '관리자A', NOW());
INSERT INTO admin_class (code_name, icon_path, updater, updated, register, registered) VALUES ('은행', '/rc/icons/bank.png', '관리자A', NOW(), '관리자A', NOW());
INSERT INTO admin_class (code_name, icon_path, updater, updated, register, registered) VALUES ('약국', '/rc/icons/drug.png', '관리자A', NOW(), '관리자A', NOW());
INSERT INTO admin_class (code_name, icon_path, updater, updated, register, registered) VALUES ('주유소', '/rc/icons/gas.png', '관리자A', NOW(), '관리자A', NOW());
INSERT INTO admin_class (code_name, icon_path, updater, updated, register, registered) VALUES ('주차장', '/rc/icons/park.png', '관리자A', NOW(), '관리자A', NOW());


DROP TABLE admin_class_history;
CREATE TABLE IF NOT EXISTS admin_class_history (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  class_name    varchar(32) NOT NULL,
  updater        varchar(32) NOT NULL,
  updated        timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  done           varchar(32) NOT NULL,
  division       varchar(32) NOT NULL,
  description    varchar(32) NOT NULL
);

INSERT INTO admin_class_history (class_name, updater, updated, done, division, description) VALUES ('헤어샵', '관리자1', NOW(), '삭제', '', '');
INSERT INTO admin_class_history (class_name, updater, updated, done, division, description) VALUES ('병원', '관리자3', NOW(), '수정', '', '아이콘변경: hospital.png');
INSERT INTO admin_class_history (class_name, updater, updated, done, division, description) VALUES ('병원', '관리자3', NOW(), '조회', '', '');
INSERT INTO admin_class_history (class_name, updater, updated, done, division, description) VALUES ('병원', '관리자3', NOW(), '생성', '', '');

DROP TABLE user_coupon;
CREATE TABLE IF NOT EXISTS user_coupon (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email          varchar(32) NOT NULL,
  member         varchar(32) NOT NULL,
  rcn            varchar(32) NOT NULL,
  bzcode         varchar(32) NOT NULL,
  ctype          varchar(32) NOT NULL,
  code           varchar(64) NOT NULL,
  name           varchar(64) NOT NULL,
  status         varchar(8) DEFAULT '사용',
  date1          timestamp DEFAULT CURRENT_TIMESTAMP,
  date2          timestamp DEFAULT TIMESTAMPADD(MONTH, 1, CURRENT_TIMESTAMP),
  registered     timestamp DEFAULT CURRENT_TIMESTAMP,
  notice         varchar(256) DEFAULT ''
);

DROP TABLE user_stamp;
CREATE TABLE IF NOT EXISTS user_stamp (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email          varchar(32) NOT NULL,
  member         varchar(32) NOT NULL,
  rcn            varchar(32) NOT NULL,
  bzcode         varchar(32) NOT NULL,
  ctype          varchar(32) NOT NULL,
  code           varchar(64) NOT NULL,
  name           varchar(64) NOT NULL,
  total          int DEFAULT 0,
  stamping       int DEFAULT 1,
  status         varchar(8) DEFAULT '미사용',
  date1          timestamp DEFAULT CURRENT_TIMESTAMP,
  date2          timestamp DEFAULT TIMESTAMPADD(MONTH, 1, CURRENT_TIMESTAMP),
  uodated        timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  registered     timestamp DEFAULT CURRENT_TIMESTAMP,
  notice         varchar(256) DEFAULT ' '
);

DROP TABLE admin_member_coupon;
CREATE TABLE IF NOT EXISTS admin_member_coupon (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  member         varchar(32) NOT NULL,
  rcn            varchar(32) NOT NULL,
  bzcode         varchar(32) NOT NULL,
  ctype          varchar(32) NOT NULL,
  code           varchar(64) NOT NULL,
  name           varchar(64) NOT NULL,
  cash           int,
  reward_cnt     int DEFAULT 0,
  stamp          int, 
  stamp_cnt      int DEFAULT 0,
  limits         int DEFAULT 10000000,
  promotion_cnt  int DEFAULT 0,
  overagain      varchar(8),
  date1          timestamp DEFAULT CURRENT_TIMESTAMP,
  date2          timestamp DEFAULT TIMESTAMPADD(MONTH, 1, CURRENT_TIMESTAMP),
  updater        varchar(32) DEFAULT '',
  updated        timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  register       varchar(32) DEFAULT '',
  registered     timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  status         varchar(8) DEFAULT '미사용',
  notice         varchar(256) DEFAULT ' '
);

INSERT INTO admin_member_coupon (member, rcn, code, ctype, name, status, bzcode, cash, stamp, limits, overagain, notice) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'CP1234567890', '리워드', '아메리카노 할인권', '사용', '카페', 1000, 0, 0, '', '');
INSERT INTO admin_member_coupon (member, rcn, code, ctype, name, status, bzcode, cash, stamp, limits, overagain, notice) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'CP1234567891', '스탬프', '오늘의커피 한잔교환권', '사용', '카페', 0, 10, 3800, "가능", '');
INSERT INTO admin_member_coupon (member, rcn, code, ctype, name, status, bzcode, cash, stamp, limits, overagain, notice) VALUES ('스타벅스 전주한옥마을점', '125-12-12340', 'CP1234567892', '프로모션', '오픈 이벤트 5000원 할인', '사용', '카페', 0, 0, 0, '', '');

DROP TABLE admin_user;
CREATE TABLE IF NOT EXISTS admin_user (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email          varchar(32) NOT NULL,
  password       varchar(128) NOT NULL,
  name           varchar(32) NOT NULL,
  mobile         varchar(32) NOT NULL,
  phone          varchar(32) DEFAULT '',
  grade          varchar(32) NOT NULL,
  status         varchar(8) DEFAULT '사용',
  updater        varchar(32) DEFAULT '',
  updated        timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  register       varchar(32) DEFAULT '',
  registered     timestamp DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO admin_user (email, password, name, mobile, phone, grade, status, updater, register) VALUES ('aaa@hancom.com', ENCRYPT('xyz', CONCAT('$6$',sha('passwordpassword'))) , '홍길동', '010-1234-5678', '02-1544-2000', '시스템관리자', '사용', '관리자A', '관리자A');

INSERT INTO admin_user (email, password, name, mobile, phone, grade, status, updater, register) VALUES ('aaa@hancom.com', SHA2('xyz', 512) , '홍길동1', '010-1234-5678', '02-1544-2000', '시스템관리자', '사용', '관리자A', '관리자A');
INSERT INTO admin_user (email, password, name, mobile, phone, grade, status, updater, register) VALUES ('bbb@hancom.com', SHA2('xyz', 512) , '홍길동2', '010-1234-5678', '02-1544-2000', '운영관리자', '사용', '관리자A', '관리자A');
INSERT INTO admin_user (email, password, name, mobile, phone, grade, status, updater, register) VALUES ('ccc@hancom.com', SHA2('xyz', 512) , '홍길동3', '010-1234-5678', '02-1544-2000', '서비스관리자', '사용', '관리자A', '관리자A');
INSERT INTO admin_user (email, password, name, mobile, phone, grade, status, updater, register) VALUES ('ddd@hancom.com', SHA2('xyz', 512) , '홍길동4', '010-1234-5678', '02-1544-2000', '가맹관리자', '사용', '관리자A', '관리자A');


DROP TABLE admin_user_history;
CREATE TABLE IF NOT EXISTS admin_user_history (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email          varchar(32) NOT NULL,
  updater        varchar(32) NOT NULL,
  updated        timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  done           varchar(32) NOT NULL,
  division       varchar(32) NOT NULL,
  description    varchar(32) NOT NULL
);

INSERT INTO admin_user_history (email, updater, done, division, description) VALUES ('aaa@hancom.com', '관리자1', '삭제', '', '');
INSERT INTO admin_user_history (email, updater, done, division, description) VALUES ('aaa@hancom.com', '관리자1', '수정', '', '이름: 홍길동');
INSERT INTO admin_user_history (email, updater, done, division, description) VALUES ('aaa@hancom.com', '관리자1', '수정', '', '휴대폰번호: 010-1234-5678');
INSERT INTO admin_user_history (email, updater, done, division, description) VALUES ('aaa@hancom.com', '관리자3', '수정', '', '권한: 서비스관리자');
INSERT INTO admin_user_history (email, updater, done, division, description) VALUES ('aaa@hancom.com', '관리자3', '조회', '', '');
INSERT INTO admin_user_history (email, updater, done, division, description) VALUES ('aaa@hancom.com', '관리자3', '생성', '', '');


DROP TABLE user_auth_token;
CREATE TABLE IF NOT EXISTS user_auth_token (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email          varchar(32) NOT NULL,
  token          varchar(32) NOT NULL,
  expire         timestamp NOT NULL,
  registered     timestamp DEFAULT CURRENT_TIMESTAMP
);





DROP TABLE admin_notice;
CREATE TABLE IF NOT EXISTS admin_notice (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title          varchar(32) NOT NULL,
  gender         varchar(8) DEFAULT '남',
  age            varchar(8) DEFAULT '20대',
  area1          varchar(32) DEFAULT '서울특별시',
  area2          varchar(32) DEFAULT '강남구',
  date1          timestamp DEFAULT CURRENT_TIMESTAMP,
  date2          timestamp DEFAULT CURRENT_TIMESTAMP,
  description    varchar(512) NOT NULL,
  file1           varchar(256) DEFAULT '',
  file2           varchar(256) DEFAULT '',
  file3           varchar(256) DEFAULT '',
  views          int DEFAULT 0,
  staus          varchar(8) DEFAULT '사용',
  updater        varchar(32)  DEFAULT '',
  updated        timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  register       varchar(32) DEFAULT '',
  registered     timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admin_notice (title, description) VALUES ("[알림] 10% 할인가에 김장하는 방법", "");
INSERT INTO admin_notice (title, description) VALUES ("[공지] 스마트영수증 일시중지 안내", "");
INSERT INTO admin_notice (title, description) VALUES ("[공지] 전주시, 지역화폐 '전주사랑 상품권 발행", "안녕하세요 스마트영수증 입니다.\n\n 스마트영수증 시스템 점검으로 인한 서비스가 아래와 같이\n 일시 중지됨을 알려드리오니 이용에 참고하시기 바랍니다.\n\n일시중지 내용\n1. 중지일시\n - 2020 년 11 월 3일(화) 00:30 ~ 02:00(예상)\n2. 작업내역\n - 시스템 증설\n3. 중지내용\n - 영수증 발급\n - 쿠폰 사용 및 스탬프 적립");

DROP TABLE admin_event;
CREATE TABLE IF NOT EXISTS admin_event (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title          varchar(32) NOT NULL,
  notice         int DEFAULT 0,
  weight         int DEFAULT 1,
  main           int DEFAULT 0,
  event          int DEFAULT 1,
  gender         varchar(8) DEFAULT '남',
  age            varchar(8) DEFAULT '20대',
  area1          varchar(32) DEFAULT '서울특별시',
  area2          varchar(32) DEFAULT '강남구',
  date1          timestamp DEFAULT CURRENT_TIMESTAMP,
  date2          timestamp DEFAULT CURRENT_TIMESTAMP,
  event1         varchar(256) DEFAULT '',
  event2         varchar(256) DEFAULT '',
  event3         varchar(256) DEFAULT '',
  main1          varchar(256) DEFAULT '',
  main2          varchar(256) DEFAULT '',
  main3          varchar(256) DEFAULT '',
  file1          varchar(256) DEFAULT '',
  file2          varchar(256) DEFAULT '',
  file3          varchar(256) DEFAULT '',
  rgb1           varchar(16) DEFAULT '',
  rgb2           varchar(16) DEFAULT '',
  views          int DEFAULT 0,
  staus          varchar(8) DEFAULT '사용',
  coupon         int DEFAULT 0,
  date3          timestamp DEFAULT CURRENT_TIMESTAMP,
  date4          timestamp DEFAULT CURRENT_TIMESTAMP,
  updater        varchar(32)  DEFAULT '',
  updated        timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  register       varchar(32) DEFAULT '',
  registered     timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admin_notice (title) VALUES ("앱 출시 이벤트 KF94 마스크");
INSERT INTO admin_notice (title) VALUES ("앱 출시 이벤트 패션 마스크");

/*

DROP TABLE admin_coupon;
CREATE TABLE IF NOT EXISTS admin_coupon (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  code           varchar(32) NOT NULL,
  name           varchar(32) NOT NULL,
  staus          varchar(8) DEFAULT '사용',
  member         varchar(64)  DEFAULT '',
  date1          timestamp DEFAULT CURRENT_TIMESTAMP,
  date2          timestamp DEFAULT CURRENT_TIMESTAMP,
  description    varchar(512) DEFAULT '',
  updater        varchar(32)  DEFAULT '',
  updated        timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  register       varchar(32) DEFAULT '',
  registered     timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admin_coupon (code, name, member, description) VALUES ("2400 9555 4229 9417", "KF94 마스크 증정", "해당가맹점", "1. 본쿠폰은 지정 매장에서만 사용가능합니다.");


DROP TABLE admin_coupon;
CREATE TABLE IF NOT EXISTS admin_coupon (
  id             int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  code           varchar(32) NOT NULL,
  name           varchar(32) NOT NULL,
  staus          varchar(8) DEFAULT '사용',
  member         varchar(64)  DEFAULT '',
  date1          timestamp DEFAULT CURRENT_TIMESTAMP,
  date2          timestamp DEFAULT CURRENT_TIMESTAMP,
  description    varchar(512) DEFAULT '',
  updater        varchar(32)  DEFAULT '',
  updated        timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  register       varchar(32) DEFAULT '',
  registered     timestamp DEFAULT CURRENT_TIMESTAMP
);
*/





