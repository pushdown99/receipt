'use strict';

const mysql = require('sync-mysql');
let connection  = null;
let db_host     = "";
let db_user     = "";
let db_password = "";
let db_database = "";
let verbose     = false;

module.exports = {

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  connect: function(hostname, username, password, database, v) {
    db_host     = hostname;
    db_user     = username;
    db_password = password;
    db_database = database;
    verbose     = v;

    connection  = new mysql({ host:db_host, user:db_user, password:db_password, database:db_database });
    this.query("set time_zone='+9:00'");
  },

  query: function(s, v = null) {
    if(connection == null) console.log("No MySQL connection.");
    if(verbose) console.log('db: ', s, v);
    if(v == null || v.length == 0) return connection.query(s);
    else                           return connection.query(s, v);
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  getReceipts: function(record = null) {
    return this.query("SELECT * FROM receipt", record);
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  getUser: function() {
    return this.query("SELECT * FROM users");
  },
  getUserId: function(record) {
    return this.query("SELECT * FROM users WHERE id = ?", record);
  },
  getUserEmail: function(record) {
    return this.query("SELECT * FROM users WHERE email = ?", record);
  },
  getUserEmailPass: function(record) {
    return this.query("SELECT * FROM users WHERE email = ? AND passwd = ?", record);
  },
  delUser: function() {
    return this.query("DELETE FROM users");
  },
  delUserId: function(record) {
    return this.query("DELETE FROM users WHERE id = ?", record);
  },
  delUserEmail: function(record) {
    return this.query("DELETE FROM users WHERE email = ?", record);
  },
  updUser: function(record) {
    return this.query("UPDATE users SET fcmkey = ? WHERE email = ?", record);
  },
  updUserPasswd: function(record) {
    return this.query("UPDATE users SET passwd = ? WHERE email = ?", record);
  },
  putUser: function(record) {
    return this.query("INSERT INTO users (email, passwd, birth_year, birth_month, birth_day, gender, area1, area2) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", record);
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  getQRcode: function() {
    return this.query("SELECT * FROM qrcode");
  },
  getQRcodeEmail: function(record) {
    return this.query("SELECT * FROM qrcode WHERE email = ?", record);
  },
  getQRcodeQRcode: function(record) {
    return this.query("SELECT * FROM qrcode WHERE qrcode = ?", record);
  },
  delQRcodeEmail: function(record) {
    return this.query("DELETE FROM qrcode WHERE email = ?", record);
  },
  delQRcodeQRcode: function(record) {
    return this.query("DELETE FROM qrcode WHERE qrcode = ?", record);
  },
  delQRcodeExpire: function(record) {
    return this.query("DELETE FROM qrcode WHERE ts < NOW() - INTERVAL ? SECOND", record);
  },
  putQRcode: function(record) {
    return this.query("INSERT INTO qrcode (email, qrcode) VALUES (?, ?)", record);
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  getIssue: function(record) {
    return this.query("SELECT * FROM issue", record);
  },

  getIssueEmail: function(record) {
    return this.query("SELECT * FROM issue WHERE email = ?", record);
  },

  getIssueLicense: function(record) {
    return this.query("SELECT * FROM issue WHERE license = ?", record);
  },

  delIssueEmail: function(record) {
    return this.query("DELETE FROM issue WHERE email = ?", record);
  },

  delIssueLicense: function(record) {
    return this.query("DELETE FROM issue WHERE license = ?", record);
  },

  delIssueExpire: function(record) {
    return this.query("DELETE FROM issue WHERE ts < NOW() - INTERVAL ? SECOND", record);
  },

  putIssue: function(record) {
    return this.query("INSERT INTO issue (email, license) VALUES (?, ?)", record);
  },

  getReceiptId: function(record) {
    return this.query("SELECT * FROM receipt WHERE id = ?", record);
  },

  getReceiptEmail: function(record) {
    return this.query("SELECT * FROM receipt WHERE email = ?", record);
  },

  getReceiptIdEmail: function(record) {
    return this.query("SELECT * FROM receipt WHERE id > ? AND email = ?", record);
  },

  getReceipt: function() {
    return this.query("SELECT * FROM receipt");
  },

  getReceiptEmailFrom: function(record) {
    return this.query("SELECT * FROM receipt WHERE email = ? AND UNIX_TIMESTAMP(ts) > ?", record);
  },

  getReceiptIdFrom: function(record) {
    return this.query("SELECT * FROM receipt WHERE id = ? AND UNIX_TIMESTAMP(ts) > ?", record);
  },

  putReceipt: function(record) {
    return this.query("INSERT INTO receipt (email, name, register, tel, address, text, pdf, total, cash, card, ts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", record);
  },

  delReceiptIdEmail: function(record) {
    return this.query("DELETE FROM receipt WHERE id = ? AND email = ?", record);
  },

  putFcm: function(record) {
    return this.query("INSERT INTO fcm (email, name, total, issue, pdf, text, coupon) VALUES (?, ?, ?, ?, ?, ? ,?)", record);
  },
  getFcmId: function(record) {
    return this.query("SELECT * FROM fcm WHERE id = ?", record);
  },

  getStoreLicense: function (record) {
    return this.query("SELECT * FROM store WHERE license = ?", record);
  },

  getGroupCoupon: function () {
    return this.query("SELECT * FROM g_coupon");
  },

  getGroupCouponRegister: function (record) {
    return this.query("SELECT * FROM g_coupon WHERE register = ?", record);
  },

  getCoupon: function (record) {
    return this.query("SELECT * FROM coupon", record);
  },

  getCouponId: function (record) {
    return this.query("SELECT * FROM coupon WHERE id = ?", record);
  },

  getCouponEmail: function (record) {
    return this.query("SELECT * FROM coupon WHERE email = ?", record);
  },

  getCouponEmailFrom: function(record) {
    return this.query("SELECT * FROM coupon WHERE email = ? AND UNIX_TIMESTAMP(ts) > ?", record);
  },


  getCouponCode: function (record) {
    return this.query("SELECT * FROM coupon WHERE cpcode = ?", record);
  },

  updCouponCodeUsed: function (record) {
    return this.query("UPDATE coupon SET used = 1 WHERE cpcode = ?", record);
  },

  putCoupon: function (record) {
    return this.query("INSERT INTO coupon (email, cpcode, used, g_coupon_id, name, register, title, genre, begins, ends) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", record);
  },

  //////////////////////////////////////////////////////////////////////////////////
  getMember: function (record) {
    return this.query("SELECT * FROM member", record);
  },

  getAdminMember: function (record) {
    return this.query("SELECT * from admin_member WHERE (name like ? OR rcn like ?) AND status like ? AND area1 like ? AND area2 like ? AND updated >= ? AND updated <= ?", record);
  },

  putAdminMember: function (record) {
    return this.query("INSERT INTO admin_member (rcn, passwd, name, owner, bzcond, bztype, bzname, phone, opening, area1, area2, address) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", record);
  },


  getAdminAdmin: function (record) {
    return this.query("SELECT * from admin_user WHERE name like ? AND grade like ? AND status like ? AND updated >= ? AND updated <= ?", record);
  },

  getAdminGroup: function (record) {
    return this.query("SELECT * from admin_group WHERE group_name like ? AND updated >= ? AND updated <= ?", record);
  },

  getCityArea1: function () {
    return this.query("SELECT sido_nm from city GROUP BY sido_nm");
  },

  getCityArea2: function (record) {
    return this.query("SELECT sigungu_nm from city WHERE sido_nm like ? GROUP BY sigungu_nm", record);
  },

  getDashboardDay: function (record) {
    let result = {};
    console.log (`SELECT DATE_FORMAT(ts, '%Y-%m-%d') day, DATE_FORMAT(ts, '%Y-%m-%d') pattern, sum(total) total from receipt WHERE ts >= "${record[0]}" AND ts <= "${record[1]}" GROUP BY DATE(ts) ORDER BY ts DESC`);
    result['summary'] = this.query("SELECT DATE_FORMAT(ts, '%Y-%m-%d') day, DATE_FORMAT(ts, '%Y-%m-%d') pattern, sum(total) total from receipt WHERE ts >= ? AND ts <= ? GROUP BY DATE(ts) ORDER BY ts DESC", record);
    result['data']    = this.query("SELECT *, DATE_FORMAT(ts, '%Y-%m-%d') pattern from receipt WHERE ts >= ? AND ts <= ? ORDER BY ts DESC", record);
    return  result;
  },

  getDashboardWeek: function (record) {
    let result = {};
    console.log (`SELECT DATE_FORMAT(ts, '%Y-%m-%d') day, DATE_FORMAT(ts,'%X %V') pattern, sum(total) total from receipt WHERE ts >= "${record[0]}" AND ts <= "${record[1]}" GROUP BY pattern ORDER BY ts DESC`);
    result['summary'] = this.query("SELECT DATE_FORMAT(ts, '%Y-%m-%d') day, DATE_FORMAT(ts,'%X %V') pattern, sum(total) total from receipt WHERE ts >= ? AND ts <= ? GROUP BY pattern ORDER BY ts DESC", record);
    result['data'] = this.query("SELECT *, DATE_FORMAT(ts,'%X %V') pattern from receipt WHERE ts >= ? AND ts <= ? ORDER BY ts DESC", record);
    return  result;
  },

  getDashboardMon: function (record) {
    let result = {};
    console.log (`SELECT DATE_FORMAT(ts, '%Y-%m') day, DATE_FORMAT(ts,'%X %c') pattern, sum(total) total from receipt WHERE ts >= "${record[0]}" AND ts <= "${record[1]}" GROUP BY pattern ORDER BY ts DESC`);
    result['summary'] = this.query("SELECT DATE_FORMAT(ts, '%Y-%m') day, DATE_FORMAT(ts,'%X %c') pattern, sum(total) total from receipt WHERE ts >= ? AND ts <= ? GROUP BY pattern ORDER BY ts DESC", record);
    result['data'] = this.query("SELECT *, DATE_FORMAT(ts,'%X %c') pattern from receipt WHERE ts >= ? AND ts <= ? ORDER BY ts DESC", record);
    return  result;
  },














  getUserAuthTokenEmail: function(record) {
    return this.query("SELECT * FROM user_auth_token WHERE email = ?", record);
  },

  putUserAuthToken: function(record) {
    return this.query("INSERT INTO user_auth_token (email, token, expire) VALUES (?, ?, ?)", record);
  },

  delUserAuthTokenEmail: function(record) {
    return this.query("DELETE FROM user_auth_token WHERE email = ?", record);
  },

  updUserActivateEmail: function(record) {
    return this.query("UPDATE users SET activated = 'Y' WHERE email = ?", record);
  },

  updUserDeactivateEmail: function(record) {
    return this.query("UPDATE users SET activated = 'N' WHERE email = ?", record);
  },

  putAdminUser: function(record) {
    return this.query("INSERT INTO admin_user (email, password, name, mobile, phone, grade, status) VALUES (?, ?, ?, ?, ?, ?, ?)", record);
  },





}
