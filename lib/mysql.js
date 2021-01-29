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
    this.query("SET SESSION sql_mode = 'NO_ENGINE_SUBSTITUTION'");
    this.query("set time_zone='+9:00'");
  },

  query: function(s, v = null) {
    if(connection == null) console.log("No MySQL connection.");
    //if(verbose) console.log('db: ', s, v);
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
  getUserSearch: function (record) {
    return this.query("SELECT * from users WHERE (name like ? OR rcn like ?) AND status like ? AND area1 like ? AND area2 like ? AND updated >= ? AND updated <= ?", record);
  },
  getAdminUserEmail: function(record) {
    return this.query("SELECT * FROM admin_user WHERE email = ?", record);
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
    return this.query("SELECT * FROM receipt WHERE id = ? AND email = ?", record);
  },

  delReceiptIdEmail: function(record) {
    return this.query("DELETE FROM receipt WHERE id = ? AND email = ?", record);
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
    return this.query("DELETE FROM receipt WHERE id = ?  AND email = ?", record);
  },


  putFcm: function(record) {
    return this.query("INSERT INTO fcm (email, name, rcn, total, issue, pdf, text, coupon) VALUES (?, ?, ?, ?, ?, ? ,?, ?)", record);
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

  getAdminCouponId: function (record) {
    return this.query("SELECT * FROM admin_member_coupon WHERE id = ?", record);
  },

  getAdminCouponCpcode: function (record) {
    return this.query("SELECT * FROM admin_member_coupon WHERE cpcode = ?", record);
  },

  getCouponEmail: function (record) {
    return this.query("SELECT * FROM coupon WHERE email = ?", record);
  },

  getCouponId: function (record) {
    return this.query("SELECT * FROM admin_member_coupon WHERE id = ?", record);
  },

  getCouponIdEmail: function (record) {
    return this.query("SELECT * FROM admin_member_coupon WHERE id = ? AND email = ?", record);
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

  delCouponIdEmail: function(record) {
    return this.query("DELETE FROM user_coupon WHERE id = ? AND email = ?", record);
  },

  delStampIdEmail: function(record) {
    return this.query("DELETE FROM user_stamp WHERE id = ? AND email = ?", record);
  },

  //////////////////////////////////////////////////////////////////////////////////

  getAdminMemberInfoRcn: function (record) {
    return this.query("SELECT * from admin_member_info WHERE rcn = ?", record);
  },

  getMember: function (record) {
    return this.query("SELECT * FROM member", record);
  },

  getMemberAll: function () {
    return this.query("SELECT * FROM admin_member order by name ASC");
  },
  getAdminMemberRcn: function (record) {
    return this.query("SELECT *, DATE_FORMAT(opening, '%Y-%m-%d') openingF from admin_member WHERE rcn = ?", record);
  },

  getAdminMember: function (record) {
    return this.query("SELECT * from admin_member WHERE (name like ? OR rcn like ?) AND status like ? AND area1 like ? AND area2 like ? AND updated >= ? AND updated <= ?", record);
  },

  getAdminMemberNear: function (lat, lng, distance = 2.0) {
    return this.query ("SELECT *,(6371*acos(cos(radians(?))*cos(radians(lat))*cos(radians(lng)-radians(?))+sin(radians(?))*sin(radians(lat)))) AS distance FROM admin_member HAVING distance <= ? ORDER BY distance LIMIT 0,300", [lat, lng, lat, distance]);
  },

  putAdminMember: function (record) {
    return this.query("INSERT INTO admin_member (rcn, passwd, name, owner, bzcond, bztype, bzname, phone, opening, area1, area2, address, lat, lng) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", record);
  },

  putAdminMemberInfo: function (record) {
    return this.query("INSERT INTO admin_member_info (rcn, logo, intro) VALUES (?,?,?)", record);
  },

  putAdminMemberLogo: function (record) {
    return this.query("INSERT INTO admin_member_logo (rcn, name, logo_path) VALUES (?,?,?)", record);
  },

  getAdminCouponCode: function (record) {
    return this.query("SELECT * from admin_member_coupon WHERE cpcode <= ?", record);
  },

  getAdminCoupon: function (record) {
    return this.query("SELECT * from admin_member_coupon WHERE name like ? AND status like ? AND updated >= ? AND updated <= ?", record);
  },

  putAdminCoupon: function (record) {
    console.log (record);
    return this.query("INSERT INTO admin_member_coupon (member, rcn, bzcode, ctype, cpcode, admin, name, cash, stamp, date1, date2, status, benefit, notice) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", record);
  },

  getAdminAdmin: function (record) {
    return this.query("SELECT * from admin_user WHERE name like ? AND grade like ? AND status like ? AND updated >= ? AND updated <= ?", record);
  },

  getAdminAdminEmail: function (email) {
    return this.query("SELECT * from admin_user WHERE email = ?", [email]);
  },

  putAdminAdmin: function (record) {
    console.log (record);
    return this.query("INSERT INTO admin_user (email, password, name, mobile, phone, grade, status) VALUES (?, ?, ?, ?, ?, ?, ?)", record);
  },

  getAdminNotice: function (record) {
    return this.query("SELECT * from admin_notice WHERE title like ? AND gender like ? AND age like ? AND area1 like ? AND area2 like ? AND updated >= ? AND updated <= ?", record);
  },

  getAdminEventAll: function (record) {
    return this.query("SELECT * from admin_event WHERE status like ? AND coupon like ? AND updated >= ? AND updated <= ?", record);
  },

  getAdminEvent: function (record) {
    return this.query("SELECT * from admin_event WHERE title like ? AND gender like ? AND age like ? AND area1 like ? AND area2 like ? AND updated >= ? AND updated <= ?", record);
  },

  getAdminClass: function (record) {
    return this.query("SELECT * from admin_class WHERE name like ? AND updated >= ? AND updated <= ?", record);
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

  updUserLeaveEmail: function(record) {
    return this.query("UPDATE users SET activated = 'D' WHERE email = ?", record);
  },

  putAdminUser: function(record) {
    return this.query("INSERT INTO admin_user (email, password, name, mobile, phone, grade, status) VALUES (?, ?, ?, ?, ?, ?, ?)", record);
  },

  updAdminUser: function(record) {
    return this.query("UPDATE admin_user set name = ?, mobile = ?, phone = ?) VALUES (?, ?, ?)", record);
  },


  getNotice: function(record = null) {
    return this.query("SELECT * FROM admin_notice");
  },

  getNoticeAt: function(record) {
    return this.query("SELECT * FROM admin_notice WHERE UNIX_TIMESTAMP(date1) <= ? AND UNIX_TIMESTAMP(date2) >= ?", record);
  },

  getEvent: function(record = null) {
    return this.query("SELECT * FROM admin_event");
  },

  getEventAt: function(record) {
    return this.query("SELECT * FROM admin_event WHERE UNIX_TIMESTAMP(date1) <= ? AND UNIX_TIMESTAMP(date2) >= ?", record);
  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getMemberRewardCoupon: function(record) {
    return this.query("SELECT * FROM admin_member_coupon WHERE rcn = ? AND ctype = '리워드' AND cash < ? AND status = '사용' AND UNIX_TIMESTAMP(date1) <= ? AND UNIX_TIMESTAMP(date2) >= ?", record);
  },

  getMemberPromotionCoupon: function(record) {
    return this.query("SELECT * FROM admin_member_coupon WHERE rcn = ? AND ctype = '프로모션' AND status = '사용' AND UNIX_TIMESTAMP(date1) <= ? AND UNIX_TIMESTAMP(date2) >= ?", record);
  },

  getMemberStampCoupon: function(record) {
    return this.query("SELECT * FROM admin_member_coupon WHERE rcn = ? AND ctype = '스탬프' AND status = '사용' AND UNIX_TIMESTAMP(date1) <= ? AND UNIX_TIMESTAMP(date2) >= ?", record);
  },

  getMemberCouponId: function(record) {
    return this.query("SELECT * FROM admin_member_coupon WHERE id = ?", record);
  },

  getMemberCouponRcn: function(record) {
    return this.query("SELECT * FROM admin_member_coupon WHERE rcn = ?", record);
  },

  getMemberCouponLimitId: function (record) {
    var ret = this.getMemberCouponId (record);
    if(ret.length < 1) return -1;
    return ret.limits;
  },

  getUserCouponEmail: function (record) {
    return this.query("SELECT * FROM user_coupon WHERE email = ?", record);
  },

  getUserCouponCode: function (record) {
    return this.query("SELECT * FROM user_coupon WHERE cpcode = ?", record);
  },

  updUserCouponUsedCode: function (record) {
    return this.query("UPDATE user_coupon SET status = '사용' WHERE cpcode = ?", record);
  },

  getUserStampEmail: function (record) {
    return this.query("SELECT * FROM user_stamp WHERE email = ?", record);
  },

  getUserStampIdEmail: function (record) {
    return this.query("SELECT * FROM user_stamp WHERE id = ? AND email = ?", record);
  },

  getUserStampEmailRcn: function (record) {
    return this.query("SELECT * FROM user_stamp WHERE email = ? AND rcn = ?", record);
  },

  putUserStamp: function (record) {
    return this.query("INSERT INTO user_stamp (email, member, rcn, bzcode, ctype, cpcode, name, total, date1, date2, benefit, notice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", record);
  },

  putUserCoupon: function (record) {
    return this.query("INSERT INTO user_coupon (email, member, rcn, bzcode, ctype, cpcode, name, date1, date2, benefit, notice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", record);
  },

  updUserStampToCoupon: function (record) {
    var result = this.query("SELECT * FROM user_stamp WHERE id = ? AND email = ?", record);
    if(result.length > 0) {
      this.query("UPDATE user_stamp set status = '사용' WHERE id = ? AND email = ?", record);
      return this.query("INSERT INTO user_coupon (email, member, rcn, bzcode, ctype, cpcode, name, date1, date2, benefit, notice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [result[0].email, result[0].member, result[0].rcn, result[0].bzcode, result[0].ctype, result[0].cpcode, result[0].name, result[0].date1, result[0].date2, result[0].benefit, result[0].notice]);
    }
  },


  getUserStampHistory: function (record) {
    var ret =  this.query("SELECT * FROM user_stamp WHERE id = ? AND email = ?", record);
    if(ret.length > 0) {
      return this.query("SELECT * FROM user_stamp_history WHERE email = ? AND cpcode = ?", [ret[0].email, ret[0].cpcode]);
    }
    return [];
  },

  putUserStampHistory: function (record) {
    return this.query("INSERT INTO user_stamp_history (email, cpcode, accum) VALUES (?, ?, ?)", record);
  },

  putUserStampWithMemberCoupon: function (email, result) {
    var ret = this.query("SELECT * FROM user_stamp WHERE email = ? AND rcn = ? AND status = '미사용' AND date1 <= CURRENT_TIMESTAMP AND date2 >=  CURRENT_TIMESTAMP AND total <> stamping", [email, result.rcn]); 
    if(ret.length <= 0) {
      ret = this.putUserStamp ([email, result.member, result.rcn, result.bzcode, result.ctype, result.cpcode, result.name, result.stamp, result.date1, result.date2, result.benefit, result.notice]);
      this.putUserStampHistory ([email, result.cpcode, 1]);
      return ret.affectedRows;
    }
    this.putUserStampHistory ([email, ret[0].cpcode, 1]);
    ret = this.query("UPDATE user_stamp SET stamping = stamping + 1 WHERE id = ?", [ret[0].id]); 
    return ret.affectedRows;
  },

  putUserCouponWithMemberCoupon: function (email, result) {
    return this.putUserCoupon ([email, result.member, result.rcn, result.bzcode, result.ctype, result.cpcode, result.name, result.date1, result.date2, result.benefit, result.notice]);
  },

  genMemberCouponId: function(id, email) {
    var result = this.getMemberCouponId ([id]);
    if(result.length < 1) return  -1;
    if(result[0].status != '사용') return -1;

    var ret = this.getUserEmail ([email]);
    var userid = ret[0].id;

    switch (result[0].ctype) {
    case '리워드'  :
      //var ret = this.query("UPDATE admin_member_coupon SET counter = counter +1, reward_cnt = reward_cnt +1 WHERE id = ? AND reward_cnt + 1 <= limits AND date1 <= CURRENT_TIMESTAMP AND date2 >=  CURRENT_TIMESTAMP", [id]);
      var ret = this.query("UPDATE admin_member_coupon SET counter = counter +1, reward_cnt = reward_cnt +1 WHERE id = ? AND date1 <= CURRENT_TIMESTAMP AND date2 >=  CURRENT_TIMESTAMP", [id]);
      if(ret.affectedRows < 1) return -1;
      result[0].cpcode = result[0].cpcode + "-" + (result[0].counter) + "-" + userid;
      this.putUserCouponWithMemberCoupon (email, result[0]);
      break;
    case '스탬프'  :
      //var ret = this.query("UPDATE admin_member_coupon SET counter = counter +1, stamp_cnt = stamp_cnt +1 WHERE id = ? AND stamp_cnt + 1 <= limits AND date1 <= CURRENT_TIMESTAMP AND date2 >=  CURRENT_TIMESTAMP", [id]);
      var ret = this.query("UPDATE admin_member_coupon SET counter = counter +1, stamp_cnt = stamp_cnt +1 WHERE id = ? AND date1 <= CURRENT_TIMESTAMP AND date2 >=  CURRENT_TIMESTAMP", [id]);
      if(ret.affectedRows < 1) return -1;
      result[0].cpcode = result[0].cpcode + "-" + (result[0].counter) + "-" + userid;
      this.putUserStampWithMemberCoupon (email, result[0]);
      break;
    case '프로모션':
      //var ret = this.query("UPDATE admin_member_coupon SET counter = counter +1, promotion_cnt = promotion_cnt +1 WHERE id = ? AND promotion_cnt + 1 <= limits AND date1 <= CURRENT_TIMESTAMP AND date2 >=  CURRENT_TIMESTAMP", [id]);
      var ret = this.query("UPDATE admin_member_coupon SET counter = counter +1, promotion_cnt = promotion_cnt +1 WHERE id = ? AND date1 <= CURRENT_TIMESTAMP AND date2 >=  CURRENT_TIMESTAMP", [id]);
      if(ret.affectedRows < 1) return -1;
      result[0].cpcode = result[0].cpcode + "-" + (result[0].counter) + "-" + userid;
      this.putUserCouponWithMemberCoupon (email, result[0]);
      break;
    }
    return 1;
  },

  // return member-coupon ID
  findCouponRcnEmail: function (rcn, email, total) {
    var result = [];
    var ret = this.getMemberCouponRcn ([rcn]);
    if(ret.length < 1) return result;
    for (var i =0; i < ret.length; i++) {
      switch (ret[i].ctype) {
      case '프로모션': if(ret[i].status=='사용') result.push(ret[i]); break;
      case '스탬프'  : if(ret[i].status=='사용') this.genMemberCouponId (ret[i].id, email); //generate // result.push(ret[i]); break;
      case '리워드'  : if(ret[i].status=='사용' && ret[i].cash <= total) result.push(ret[i]); break;
      }
    }
    return result;
  },

  findMemberLatLng: function (rcn) {
    return this.query("SELECT * FROM admin_member WHERE rcn = ?", [rcn]);
  },

  findMemberLogo: function (rcn) {
    return this.query("SELECT * FROM admin_member_logo WHERE rcn = ?", [rcn]);
  },

  findMemberIcon: function (bzname) {
    return this.query("SELECT * FROM admin_class WHERE name = ?", [bzname]);
  },

  getAdminEventBanner: function () {
    return this.query("SELECT * FROM admin_event WHERE fevent = 1");
  },

  getAdminMainBanner: function () {
    return this.query("SELECT * FROM admin_event WHERE fmain = 1");
  },

  getReceiptSatisticsEmail: function (email) {
    let rt = this.query("SELECT count(*) num FROM receipt WHERE email = ?", [email]);
    let rc = this.query("select count(*) num FROM receipt WHERE DATE_FORMAT(ts, '%Y-%m') =  DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m') AND email = ?", [email]);
    let ct = this.query("SELECT count(*) num FROM user_coupon WHERE email = ?", [email]);
    let cu = this.query("select count(*) num FROM user_coupon WHERE status = '미사용'  AND email = ?", [email]);
    let data    = { "total_receipt": rt[0].num, "current_receipt": rc[0].num, "total_coupon": ct[0].num, "usable_coupon": cu[0].num };
    return [ data ];
  },

  getLicense: function (record) {
    return this.query("SELECT * FROM license WHERE mac = ?", record);
  },

  getPosMac: function (record) {
    return this.query("SELECT * FROM pos WHERE mac = ?", record);
  },

  getPosLicense: function (record) {
    return this.query("SELECT * FROM pos WHERE license = ?", record);
  },

  getPosMacRcn: function (record) {
    return this.query("SELECT * FROM pos WHERE mac = ? AND rcn = ?", record);
  },

  getPosEmailMacRcn: function (record) {
    return this.query("SELECT * FROM pos WHERE email = ? AND mac = ? AND rcn = ?", record);
  },

  getPosEmailToken: function (record) {
    return this.query("SELECT * FROM pos WHERE email = ? AND token = ?", record);
  },

  updPosActivateEmailToken: function (record) {
    return this.query("UPDATE pos SET activated = 'Y', license = ? WHERE email = ? AND token = ?", record);
  },

  putPos: function (record) {
    return this.query("INSERT INTO pos (email, mac, rcn, token, expire) VALUES (?, ?, ?, ?, ?)", record);
  },

  getBzname: function () {
    return this.query("SELECT * FROM admin_class");
  },

}
