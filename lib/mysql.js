'use strict';

let lib     = require('../lib');
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
    this.query("SET time_zone='+9:00'");
  },

  query: function(s, v = null) {
    if(connection == null) console.log("No MySQL connection.");
    //if(verbose) console.log('db: ', s, v);
    if(v == null || v.length == 0) return connection.query(s);
    else                           return connection.query(s, v);
  },

  getReceiptsAll: function(record = []) {
    return this.query("SELECT * FROM receipts", record);
  },
  getUsersAll: function(record = []) {
    return this.query("SELECT * FROM users", record);
  },
  searchUsersByEmail: function(record) {
    return (this.query("SELECT * FROM users where email = ?", record))[0];
  },
  resignUserByEmail: function(record) {
    return (this.query("UPDATE users SET status = '해지' where email = ?", record))[0];
  },
  delTicketByEmail: function(record) {
    return this.query("DELETE FROM ticket WHERE email = ?", record);
  },
  putTicketInit: function(record) {
    return this.query("INSERT INTO ticket (email, qrcode) VALUES (?, ?)", record);
  },
  searchTicketByCode: function(record) {
    return (this.query("SELECT * FROM ticket WHERE qrcode = ?", record))[0];
  },
  searchTicketByLicense: function(record) {
    return (this.query("SELECT * FROM ticket WHERE license = ?", record))[0];
  },
  updTicketByCode: function(record) {
    return this.query("UPDATE ticket SET license = ?, rcn = ?, member = ?, bzname = ?, phone = ?, icon = ? WHERE qrcode = ?", record);
  },
  searchMemberByRcn: function(record) {
    return (this.query("SELECT * FROM admin_member WHERE rcn = ?", record))[0];
  },
  searchUsersByEmail: function(record) {
    return (this.query("SELECT * FROM users WHERE email = ?", record))[0];
  },
  searchReceiptById: function(record) {
    return (this.query("SELECT *, CONVERT_TZ(registered,'+00:00','+09:00') registered FROM receipts WHERE id = ?", record))[0];
  },
  searchReceiptsByEmail: function(record) {
    return this.query("SELECT *, CONVERT_TZ(registered,'+00:00','+09:00') registered FROM receipts WHERE email = ?", record);
  },
  searchAvailMemberCoupon: function(record) {
    return this.query("SELECT *, concat('/publish/coupon/', ?, '/', ?, '/', id) generate FROM admin_member_coupon WHERE rcn = ? AND status = '사용' AND ctype <> '스탬프' AND date1 <= ? AND date2 >= ?", record);
  },
  searchMemberCouponById: function(record) {
    return (this.query("SELECT * FROM admin_member_coupon WHERE id = ?", record))[0];
  },
  //searchMemberByRcn: function(record) {
  //  return (this.query("SELECT * FROM admin_member WHERE rcn = ?", record))[0];
  //},
  updReceiptRewardCouponById: function(record) {
    return this.query("UPDATE receipts SET c_reward = 0 WHERE id = ?", record);
  },
  updReceiptPromotionCouponById: function(record) {
    return this.query("UPDATE receipts SET c_promotion = 0 WHERE id = ?", record);
  },
  generateUserStamp: function(record) {
    var cid   = record[0];
    var email = record[1];
    var rcn   = record[2];
    this.query("UPDATE admin_member_coupon SET counter = counter +1, stamp_cnt = stamp_cnt +1 WHERE id = ? AND date1 <= CURRENT_TIMESTAMP AND date2 >=  CURRENT_TIMESTAMP", [cid]);

    var member = this.query("SELECT * FROM admin_member WHERE rcn = ?", [rcn])[0];
    var coupon = this.query("SELECT * FROM admin_member_coupon WHERE id = ?", [cid])[0];
    var stamps = this.query("SELECT * FROM user_stamp WHERE email = ? AND rcn = ? AND status = '미사용' AND date1 <= CURRENT_TIMESTAMP AND date2 >=  CURRENT_TIMESTAMP AND total <> stamping", [email, rcn]);
    if(stamps.length <= 0) {
      var uid = this.getTableAutoInc(['user_stamp']);
      var record = [email, coupon.member, coupon.rcn, coupon.bzcode, member.phone, member.opentime, member.closetime, member.address, coupon.ctype, `${coupon.cpcode}-${uid}`, coupon.name, coupon.stamp, coupon.date1, coupon.date2, coupon.benefit, coupon.notice, member.lat, member.lng];
      var result = this.query ("INSERT INTO user_stamp (email, member, rcn, bzcode, phone, opentime, closetime, address, ctype, cpcode, name, total, date1, date2, benefit, notice, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", record);
      this.putUserStampHistory ([email, coupon.member, coupon.rcn, `${coupon.cpcode}-${uid}`, 1]);
      return result;
    }
    this.putUserStampHistory ([email, stamps[0].member, stamps[0].rcn, stamps[0].cpcode, 1]);
    var result = this.query("UPDATE user_stamp SET stamping = stamping + 1 WHERE id = ?", [stamps[0].id]);
    return result;
  },
  chgUsetStampCoupon: function (record) {
    var stamp  = this.query("SELECT * FROM user_stamp WHERE id = ?", record)[0];
    this.putUserStampHistory ([stamp.email, stamp.member, stamp.rcn, stamp.cpcode, -10]);
    var member = this.searchMemberByRcn ([stamp.rcn]);
    var uid    = this.getTableAutoInc(['user_coupon']);
    var result = this.generateUserCoupon ([stamp.email, stamp.member, stamp.rcn, stamp.bzcode, member.phone, member.opentime, member.closetime, member.address, stamp.ctype, `${stamp.cpcode}-${uid}`, stamp.name, stamp.date1, stamp.date2, stamp.benefit, stamp.notice, stamp.lat, stamp.lng]);
    this.query("UPDATE user_stamp SET status = '사용' WHERE id = ?", record);
    return result;
  },
  generateUserCoupon: function(record) {
    console.log (record);
    return this.query("INSERT INTO user_coupon (email, member, rcn, bzcode, phone, opentime, closetime, address, ctype, cpcode, name, date1, date2, benefit, notice, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", record);
  },
  searchUserCouponNearByEmail: function(email, lat, lng, distance = 2.0) {
    return this.query ("SELECT *, (6371*acos(cos(radians(?))*cos(radians(lat))*cos(radians(lng)-radians(?))+sin(radians(?))*sin(radians(lat)))) AS distance FROM user_coupon HAVING distance <= ? AND email = ? ORDER BY distance LIMIT 0,300", [lat, lng, lat, distance, email]);
  },
  searchUserStampByEmail: function(record) {
    return this.query ("SELECT * FROM user_stamp WHERE email = ?", record);
  },
  delReceiptById: function (record) {
    return this.query("DELETE from receipts WHERE id = ?", record);
  },
  putReceipts: function(record) {
    return this.query("INSERT INTO receipts (email, member, rcn, bzname, phone, icon, text, pdf, payment, amount, n_promotion, n_reward, n_stamp, c_promotion, c_reward, cpurl, registered) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", record);
  },
  updReceiptsFcmById: function (record) {
    return this.query("UPDATE receipts SET fcm = ?, message = ? WHERE id = ?", record);
  },
  searchMemberNear: function (lat, lng, distance = 2.0) {
    return this.query ("SELECT *, (6371*acos(cos(radians(?))*cos(radians(lat))*cos(radians(lng)-radians(?))+sin(radians(?))*sin(radians(lat)))) AS distance FROM admin_member HAVING distance <= ? ORDER BY distance LIMIT 0,300", [lat, lng, lat, distance]);
  },
  searchMemberByRcn: function (record) {
    return (this.query ("SELECT * FROM admin_member WHERE rcn = ?", record))[0];
  },
  searchMemberForCouponByRcn: function (record) {
    return (this.query ("SELECT * FROM admin_member WHERE rcn = ?", record))[0];
  },
  searchMemberDetailByRcn: function (record) { 
    return this.query ("SELECT * FROM admin_member WHERE rcn = ?", record);
  },
  searchMemberIcon: function (record) {
    return (this.query("SELECT * FROM admin_class WHERE name = ?", record))[0];
  },
  delUserCouponById: function (record) {
    return this.query("DELETE from user_coupon WHERE id = ?", record);
  },
  delUserStampById: function (record) {
    return this.query("DELETE from user_stamp WHERE id = ?", record);
  },
  incRewardCouponById: function (record) {
    return this.query("UPDATE admin_member_coupon SET counter = counter +1, reward_cnt = reward_cnt +1 WHERE id = ? AND date1 <= CURRENT_TIMESTAMP AND date2 >=  CURRENT_TIMESTAMP", record);
  },
  incPromotionCouponById: function (record) {
    return this.query("UPDATE admin_member_coupon SET counter = counter +1, promotion_cnt = promotion_cnt +1 WHERE id = ? AND date1 <= CURRENT_TIMESTAMP AND date2 >=  CURRENT_TIMESTAMP", record);
  },
  getUserStampHistory: function (record) {
    var stamps =  this.query("SELECT * FROM user_stamp WHERE id = ?", record);
    if(stamps.length > 0) {
      return this.query("SELECT * FROM user_stamp_history WHERE email = ? AND cpcode = ?", [stamps[0].email, stamps[0].cpcode]);
    }
    return [];
  },
  putUserStampHistory: function (record) {
    return this.query("INSERT INTO user_stamp_history (email, member, rcn, cpcode, accum) VALUES (?, ?, ?, ?, ?)", record);
  },
  putUserDealHistory: function (record) {
console.log (record);
    return this.query("INSERT INTO user_deal_history (email, member, rcn, cpcode, dtype, atype, amount) VALUES (?, ?, ?, ?, ?, ?, ?)", record);
  },
  searchAdminUserByEmail: function(record) {
    return (this.query("SELECT * FROM admin_users WHERE email = ?", record))[0];
  },
  searchAdminGroupByName: function (record) {
    return (this.query("SELECT * FROM admin_group WHERE name = ?", record))[0];
  },



  ///////////////////////////////////////////////////////////////////////////////////////////////
  //
  // and so on.
  //
  getRandomCity (record) {
    return (this.query("select sido_nm, sigungu_nm FROM city GROUP BY 1,2 ORDER BY rand() limit 1", record))[0]
  },


  ///////////////////////////////////////////////////////////////////////////////////////////////
  //
  // GET NEXT ID
  //
  getTableAutoInc (record) {
    return (this.query("SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = ? and table_schema = database()", record))[0].AUTO_INCREMENT;
  },
  getAdminMemberAutoInc () {
    return (this.query("SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = 'admin_member' and table_schema = database()"))[0].AUTO_INCREMENT;
  },
  getAdminEventAutoInc () {
    return (this.query("SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = 'admin_event' and table_schema = database()"))[0].AUTO_INCREMENT;
  },
  getAdminNoticeAutoInc () {
    return (this.query("SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = 'admin_notice' and table_schema = database()"))[0].AUTO_INCREMENT;
  },
  getAdminClassAutoInc () {
    return (this.query("SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = 'admin_class' and table_schema = database()"))[0].AUTO_INCREMENT;
  },
  getAdminPosVersionAutoInc () {
    return (this.query("SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = 'version' and table_schema = database()"))[0].AUTO_INCREMENT;
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //
  // REGISTER
  //
  putAdminMember: function (record) {
    return this.query("INSERT INTO admin_member (rcn, passwd, name, owner, bzcond, bztype, bzname, phone, opening, area1, area2, address, lat, lng, register) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", record);
  },
  putAdminMemberInfo: function (record) {
    return this.query("INSERT INTO admin_member_info (rcn, logo, intro) VALUES (?,?,?)", record);
  },
  putAdminMemberLogo: function (record) {
    return this.query("INSERT INTO admin_member_logo (rcn, name, logo_path) VALUES (?,?,?)", record);
  },
  putAdminCoupon: function (record) {
    return this.query("INSERT INTO admin_member_coupon (member, rcn, bzcode, ctype, cpcode, admin, name, cash, stamp, date1, date2, status, benefit, notice, register) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", record);
  },
  putAdminEvent: function (record) {
    return this.query("INSERT INTO admin_event (title, status, fnotice, fweight, fmain, fevent, gender, age, area1, area2, date1, date2, event, main, detail, rgb, rgb2, coupon, date3, date4, coupon_url, register) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?)", record);
  },
  putAdminPosVersion: function (record) {
    return this.query("INSERT INTO version (name, version, fsize, fupdate, description, register) VALUES (?, ?, ?, ?, ?, ?)", record);
  },


  putAdminAdmin: function (record) {
    console.log (record);
    return this.query("INSERT INTO admin_users (email, passwd, name, mobile, phone, grade, status, register) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", record);
  },
  putAdminClass: function (record) {
    console.log (record);
    return this.query("INSERT INTO admin_class (name, icon_path, register) VALUES (?, ?, ?)", record);
  },

  putMemberCoupon: function (record) {
console.log (record);
    return this.query("INSERT INTO admin_member_coupon (member, rcn, bzcode, ctype, cpcode, admin, name, cash, stamp, date1, date2, status, benefit, notice) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", record);
  },


  ///////////////////////////////////////////////////////////////////////////////////////////////
  //
  // SEARCH
  //
  searchStatMembers: function (record) {
    return (this.query("SELECT IFNULL(sum(if(status= '가입', 1, 0)),0) regi, IFNULL(sum(if(status= '해지', 1, 0)),0) term FROM admin_member WHERE DATE_FORMAT(registered,'%Y-%m-%d') = ?", record))[0];
  },
  searchStatMembersSparkline: function (record) {
    return (this.query("SELECT * FROM (SELECT DATE_FORMAT(registered,'%Y-%m-%d') day, IFNULL(sum(if(status= '가입', 1, 0)),0) regi, IFNULL(sum(if(status= '해지', 1, 0)),0) term FROM admin_member WHERE DATE_FORMAT(registered,'%Y-%m-%d') <= '2021-02-10' GROUP BY day ORDER BY day ASC limit 10) as a order by day", record));
  },
  searchStatUsers: function (record) {
    return (this.query("SELECT IFNULL(sum(if(status= '가입', 1, 0)),0) regi, IFNULL(sum(if(status= '해지', 1, 0)),0) term FROM users WHERE DATE_FORMAT(registered,'%Y-%m-%d') = ?", record))[0];
  },
  searchStatAdmin: function (record) {
    return (this.query("SELECT IFNULL(sum(if(status= '사용', 1, 0)),0) regi, IFNULL(sum(if(status= '중지', 1, 0)),0) term FROM admin_users WHERE DATE_FORMAT(registered,'%Y-%m-%d') = ?", record))[0];
  },
  searchStatDeal: function (record) {
    return (this.query("SELECT IFNULL(sum(amount),0) deal FROM receipts WHERE DATE_FORMAT(registered,'%Y-%m-%d') = ?", record))[0];
  },
  searchStatCoupon: function (record) {
    return (this.query("SELECT IFNULL(sum(if(dtype= '프로모션' AND atype='적립', 1, 0)),0) promotion, IFNULL(sum(if(dtype= '리워드' AND atype='적립', 1, 0)),0) reward, IFNULL(sum(if(dtype= '스탬프' AND atype='적립', 1, 0)),0) stamp FROM user_deal_history WHERE DATE_FORMAT(registered,'%Y-%m-%d') = ?", record))[0];
  },
  searchStatStamp: function (record) {
    return (this.query("SELECT IFNULL(sum(if(dtype= '스탬프' AND atype='적립', 1, 0)),0) accum, IFNULL(sum(if(dtype= '스탬프' AND atype='교환', 1, 0)),0) xchg, IFNULL(sum(if(dtype= '스탬프' AND atype='만료', 1, 0)),0) term, IFNULL(sum(if(dtype= '스탬프' AND atype='삭제', 1, 0)),0) del FROM user_deal_history WHERE DATE_FORMAT(registered,'%Y-%m-%d') = ?", record))[0];
  },

  searchMemberHistory: function (record) {
    return this.query("SELECT * FROM admin_member_history", record);
  },
  searchMemberHistoryByRcn: function (record) {
    return this.query("SELECT * FROM admin_member_history WHERE rcn = ?", record);
  },
  searchEventHistory: function (record) {
    return this.query("SELECT * FROM admin_event_history", record);
  },
  searchCouponHistory: function (record) {
    return this.query("SELECT * FROM admin_coupon_history", record);
  },
  searchNoticeHistory: function (record) {
    return this.query("SELECT * FROM admin_notice_history", record);
  },
  searchAdminHistory: function (record) {
    return this.query("SELECT * FROM admin_admin_history", record);
  },
  searchClassHistory: function (record) {
    return this.query("SELECT * FROM admin_class_history", record);
  },
  searchUserHistory: function (record) {
    return this.query("SELECT * FROM admin_users_history", record);
  },
  searchGroupHistory: function (record) {
    return this.query("SELECT * FROM admin_group_history", record);
  },

  searchPosLicense: function (record) {
    return (this.query("SELECT * FROM pos WHERE license = ?", record))[0];
  },

  searchCouponRcn: function (record) {
    return this.query("SELECT * FROM admin_member_coupon WHERE rcn = ?", record);
  },
  searchCouponRcnType: function (record) {
    return this.query("SELECT * FROM admin_member_coupon WHERE rcn = ? AND ctype = ? AND date2 >= CURRENT_TIMESTAMP", record);
  },

  searchUserDealDay: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m-%d') day, sum(if(dtype= '거래', 1, 0)) cnt, sum(if(dtype= '거래', amount, 0)) deal, sum(if(dtype='프로모션' AND atype='적립',1,0)) promotion, sum(if(dtype='리워드' AND atype='적립',1,0)) reward, sum(if(dtype='스탬프' AND atype='적립',1,0)) stamp FROM user_deal_history WHERE registered >= ? AND registered <= ? GROUP BY day ORDER BY day ASC", record);
  },

  searchUserDealWeek: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m-%d') day,  DATE_FORMAT(registered,'%X %V') pattern, sum(if(dtype= '거래', 1, 0)) cnt, sum(if(dtype= '거래', amount, 0)) deal, sum(if(dtype='프로모션' AND atype='적립',1,0)) promotion, sum(if(dtype='리워드' AND atype='적립',1,0)) reward, sum(if(dtype='스탬프' AND atype='적립',1,0)) stamp FROM user_deal_history WHERE registered >= ? AND registered <= ? GROUP BY pattern ORDER BY day ASC", record);
  },

  searchUserDealMonth: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m') day, DATE_FORMAT(registered,'%X %c') pattern, sum(if(dtype= '거래', 1, 0)) cnt, sum(if(dtype= '거래', amount, 0)) deal, sum(if(dtype='프로모션' AND atype='적립',1,0)) promotion, sum(if(dtype='리워드' AND atype='적립',1,0)) reward, sum(if(dtype='스탬프' AND atype='적립',1,0)) stamp FROM user_deal_history WHERE registered >= ? AND registered <= ? GROUP BY pattern ORDER BY day ASC", record);
  },

  searchUserStampDay: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m-%d') day, sum(if(dtype= '스탬프' AND atype='적립', 1, 0)) cnt, sum(if(dtype= '스탬프' AND atype='교환', amount, 0)) deal, sum(if(dtype='스탬프' AND atype='만료',1,0)) term, sum(if(dtype='스탬프' AND atype='삭제',1,0)) del FROM user_deal_history WHERE registered >= ? AND registered <= ? GROUP BY day ORDER BY day ASC", record);
  },

  searchUserStampWeek: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m-%d') day,  DATE_FORMAT(registered,'%X %V') pattern, sum(if(dtype= '스탬프' AND atype='적립', 1, 0)) cnt, sum(if(dtype= '스탬프' AND atype='교환', amount, 0)) deal, sum(if(dtype='스탬프' AND atype='만료',1,0)) term, sum(if(dtype='스탬프' AND atype='삭제',1,0)) del FROM user_deal_history WHERE registered >= ? AND registered <= ? GROUP BY pattern ORDER BY day ASC", record);
  },

  searchUserStampMonth: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m') day, DATE_FORMAT(registered,'%X %c') pattern, sum(if(dtype= '스탬프' AND atype='적립', 1, 0)) cnt, sum(if(dtype= '스탬프' AND atype='교환', amount, 0)) deal, sum(if(dtype='스탬프' AND atype='만료',1,0)) term, sum(if(dtype='스탬프' AND atype='삭제',1,0)) del FROM user_deal_history WHERE registered >= ? AND registered <= ? GROUP BY pattern ORDER BY day ASC", record);
  },

  searchAdminGenderDay: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m-%d') day, sum(if(gender= '남' AND status='가입', 1, 0)) male, sum(if(gender= '여' AND status='가입', 1, 0)) female, sum(if(status='가입',1,0)) regi, sum(if(status='해지',1,0)) term FROM users WHERE (registered >= ? AND registered <= ?) OR (termination >= ? AND termination <= ?) GROUP BY day ORDER BY day ASC", record);
  },

  searchAdminGenderWeek: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m-%d') day,  DATE_FORMAT(registered,'%X %V') pattern, sum(if(gender= '남' AND status='가입', 1, 0)) male,  sum(if(gender= '여' AND status='가입', 1, 0)) female, sum(if(status='가입',1,0)) regi, sum(if(status='해지',1,0)) term FROM users WHERE (registered >= ? AND registered <= ?) OR (termination >= ? AND termination <= ?) GROUP BY pattern ORDER BY day ASC", record);
  },

  searchAdminGenderMonth: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m') day, DATE_FORMAT(registered,'%X %c') pattern, sum(if(gender= '남' AND status='가입', 1, 0)) male,  sum(if(gender= '여' AND status='가입', 1, 0)) femail, sum(if(status='가입',1,0)) regi, sum(if(status='해지',1,0)) term FROM users WHERE (registered >= ? AND registered <= ?) OR (termination >= ? AND termination <= ?) GROUP BY pattern ORDER BY day ASC", record);
  },

  searchAdminMemberDay: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m-%d') day, sum(if(area1= '강원도' AND status='가입', 1, 0)) kw,  sum(if(area1= '경기도' AND status='가입', 1, 0)) kg,  sum(if(area1= '경상남도' AND status='가입', 1, 0)) kn,  sum(if(area1= '경상북도' AND status='가입', 1, 0)) kb,  sum(if(area1= '광주광역시' AND status='가입', 1, 0)) gj,  sum(if(area1= '대구광역시' AND status='가입', 1, 0)) tg,  sum(if(area1= '대전광역시' AND status='가입', 1, 0)) tj,  sum(if(area1= '부산광역시' AND status='가입', 1, 0)) bs,  sum(if(area1= '서울특별시' AND status='가입', 1, 0)) so,  sum(if(area1= '세종특별자치시' AND status='가입', 1, 0)) sj, sum(if(area1= '울산광역시' AND status='가입', 1, 0)) us, sum(if(area1= '인천광역시' AND status='가입', 1, 0)) ic, sum(if(area1= '전라남도' AND status='가입', 1, 0)) jn, sum(if(area1= '전라북도' AND status='가입', 1, 0)) jb, sum(if(area1= '제주특별자치도' AND status='가입', 1, 0)) jj, sum(if(area1= '충청북도' AND status='가입', 1, 0)) cb, sum(if(area1= '충청남도' AND status='가입', 1, 0)) cn, sum(if(area1= '' AND status='가입', 1, 0)) et, sum(if(status='가입',1,0)) regi, sum(if(status='해지',1,0)) term FROM admin_member WHERE (registered >= ? AND registered <= ?) OR (termination >= ? AND termination <= ?) GROUP BY day ORDER BY day ASC", record);
  },

  searchAdminMemberWeek: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m-%d') day,  DATE_FORMAT(registered,'%X %V') pattern, sum(if(area1= '강원도' AND status='가입', 1, 0)) kw,  sum(if(area1= '경기도' AND status='가입', 1, 0)) kg,  sum(if(area1= '경상남도' AND status='가입', 1, 0)) kn,  sum(if(area1= '경상북도' AND status='가입', 1, 0)) kb,  sum(if(area1= '광주광역시' AND status='가입', 1, 0)) gj,  sum(if(area1= '대구광역시' AND status='가입', 1, 0)) tg,  sum(if(area1= '대전광역시' AND status='가입', 1, 0)) tj,  sum(if(area1= '부산광역시' AND status='가입', 1, 0)) bs,  sum(if(area1= '서울특별시' AND status='가입', 1, 0)) so,  sum(if(area1= '세종특별자치시' AND status='가입', 1, 0)) sj, sum(if(area1= '울산광역시' AND status='가입', 1, 0)) us, sum(if(area1= '인천광역시' AND status='가입', 1, 0)) ic, sum(if(area1= '전라남도' AND status='가입', 1, 0)) jn, sum(if(area1= '전라북도' AND status='가입', 1, 0)) jb, sum(if(area1= '제주특별자치도' AND status='가입', 1, 0)) jj, sum(if(area1= '충청북도' AND status='가입', 1, 0)) cb, sum(if(area1= '충청남도' AND status='가입', 1, 0)) cn, sum(if(area1= '' AND status='가입', 1, 0)) et, sum(if(status='가입',1,0)) regi, sum(if(status='해지',1,0)) term FROM admin_member WHERE (registered >= ? AND registered <= ?) OR (termination >= ? AND termination <= ?) GROUP BY pattern ORDER BY day ASC", record);
  },

  searchAdminMemberMonth: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m') day, DATE_FORMAT(registered,'%X %c') pattern, sum(if(area1= '강원도' AND status='가입', 1, 0)) kw,  sum(if(area1= '경기도' AND status='가입', 1, 0)) kg,  sum(if(area1= '경상남도' AND status='가입', 1, 0)) kn,  sum(if(area1= '경상북도' AND status='가입', 1, 0)) kb,  sum(if(area1= '광주광역시' AND status='가입', 1, 0)) gj,  sum(if(area1= '대구광역시' AND status='가입', 1, 0)) tg,  sum(if(area1= '대전광역시' AND status='가입', 1, 0)) tj,  sum(if(area1= '부산광역시' AND status='가입', 1, 0)) bs,  sum(if(area1= '서울특별시' AND status='가입', 1, 0)) so,  sum(if(area1= '세종특별자치시' AND status='가입', 1, 0)) sj, sum(if(area1= '울산광역시' AND status='가입', 1, 0)) us, sum(if(area1= '인천광역시' AND status='가입', 1, 0)) ic, sum(if(area1= '전라남도' AND status='가입', 1, 0)) jn, sum(if(area1= '전라북도' AND status='가입', 1, 0)) jb, sum(if(area1= '제주특별자치도' AND status='가입', 1, 0)) jj, sum(if(area1= '충청북도' AND status='가입', 1, 0)) cb, sum(if(area1= '충청남도' AND status='가입', 1, 0)) cn, sum(if(area1= '' AND status='가입', 1, 0)) et, sum(if(status='가입',1,0)) regi, sum(if(status='해지',1,0)) term FROM admin_member WHERE (registered >= ? AND registered <= ?) OR (termination >= ? AND termination <= ?) GROUP BY pattern ORDER BY day ASC", record);
  },

  searchAdminUserDay: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m-%d') day, sum(if(area1= '강원도' AND status='가입', 1, 0)) kw,  sum(if(area1= '경기도' AND status='가입', 1, 0)) kg,  sum(if(area1= '경상남도' AND status='가입', 1, 0)) kn,  sum(if(area1= '경상북도' AND status='가입', 1, 0)) kb,  sum(if(area1= '광주광역시' AND status='가입', 1, 0)) gj,  sum(if(area1= '대구광역시' AND status='가입', 1, 0)) tg,  sum(if(area1= '대전광역시' AND status='가입', 1, 0)) tj,  sum(if(area1= '부산광역시' AND status='가입', 1, 0)) bs,  sum(if(area1= '서울특별시' AND status='가입', 1, 0)) so,  sum(if(area1= '세종특별자치시' AND status='가>입', 1, 0)) sj, sum(if(area1= '울산광역시' AND status='가입', 1, 0)) us, sum(if(area1= '인천광역시' AND status='가입', 1, 0)) ic, sum(if(area1= '전라남도' AND status='가입', 1, 0)) jn, sum(if(area1= '전라북도' AND status='가입', 1, 0)) jb, sum(if(area1= '제주특별자치도' AND status='가입', 1, 0)) jj, sum(if(area1= '충청북도' AND status='가입', 1, 0)) cb, sum(if(area1= '충청남도' AND status='가입', 1, 0)) cn, sum(if(area1= '' AND status='가입', 1, 0)) et, sum(if(status='가입',1,0)) regi, sum(if(status='해지',1,0)) term FROM users WHERE registered >= ? AND registered <= ? GROUP BY day ORDER BY day ASC", record);
  },

  searchAdminUserWeek: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m-%d') day,  DATE_FORMAT(registered,'%X %V') pattern, sum(if(area1= '강원도' AND status='가입', 1, 0)) kw,  sum(if(area1= '경기도' AND status='가입', 1, 0)) kg,  sum(if(area1= '경상남도' AND status='가입', 1, 0)) kn,  sum(if(area1= '경상북도' AND status='가입', 1, 0)) kb,  sum(if(area1= '광주광역시' AND status='가입', 1, 0)) gj,  sum(if(area1= '대구광역시' AND status='가입', 1, 0)) tg,  sum(if(area1= '대전광역시' AND status='가입', 1, 0)) tj,  sum(if(area1= '부산광역시' AND status='가입', 1, 0)) bs,  sum(if(area1= '서울특별시' AND status='가입', 1, 0)) so,  sum(if(area1= '세종특별자치시' AND status='가입', 1, 0)) sj, sum(if(area1= '울산광역시' AND status='가입', 1, 0)) us, sum(if(area1= '인천광역시' AND status='가입', 1, 0)) ic, sum(if(area1= '전라남도' AND status='가입', 1, 0)) jn, sum(if(area1= '전라북도' AND status='가입', 1, 0)) jb, sum(if(area1= '제주특별자치도' AND status='가입', 1, 0)) jj, sum(if(area1= '충청북도' AND status='가입', 1, 0)) cb, sum(if(area1= '충청남도' AND status='가입', 1, 0)) cn, sum(if(area1= '' AND status='가입', 1, 0)) et, sum(if(status='가입',1,0)) regi, sum(if(status='해지',1,0)) term FROM users WHERE registered >= ? AND registered GROUP BY pattern ORDER BY day ASC", record);
  },

  searchAdminUserMonth: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m') day, DATE_FORMAT(registered,'%X %c') pattern, sum(if(area1= '강원도' AND status='가입', 1, 0)) kw,  sum(if(area1= '경기도' AND status='가입', 1, 0)) kg,  sum(if(area1= '경상남도' AND status='가입', 1, 0)) kn, sum(if(area1= '경상북도' AND status='가입', 1, 0)) kb,  sum(if(area1= '광주광역시' AND status='가입', 1, 0)) gj,  sum(if(area1= '대구광역시' AND status='가입', 1, 0)) tg,  sum(if(area1= '대전광역시' AND status='가입', 1, 0)) tj,  sum(if(area1= '부산광역시' AND status='가입', 1, 0)) bs,  sum(if(area1= '서울특별시' AND status='가입', 1, 0)) so,  sum(if(area1= '세종특별자치시' AND status='가입', 1, 0)) sj, sum(if(area1= '울산광역시' AND status='가입', 1, 0)) us, sum(if(area1= '인천광역시' AND status='가입', 1, 0)) ic, sum(if(area1= '전라남도' AND status='가입', 1, 0)) jn, sum(if(area1= '전라북도' AND status='가입', 1, 0)) jb, sum(if(area1= '제주특별자치도' AND status='가입', 1, 0)) jj, sum(if(area1= '충청북도' AND status='가입', 1, 0)) cb, sum(if(area1= '충청남도' AND status='가입', 1, 0)) cn, sum(if(area1= '' AND status='가입', 1, 0)) et, sum(if(status='가입',1,0)) regi, sum(if(status='해지',1,0)) term FROM users WHERE registered >= ? AND registered <= ? GROUP BY pattern ORDER BY day ASC", record); 
  },

  searchAdminUserGenDay: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m-%d') day, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=10,1,0 )) g10, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=20,1,0 )) g20, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=30,1,0 )) g30, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=40,1,0 )) g40, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=50,1,0 )) g50, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=60,1,0 )) g60, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=70,1,0 )) g70, COUNT(*) total FROM users WHERE registered <= ? GROUP BY day ORDER BY day ASC", record);
  },
  searchAdminUserGenWeek: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m-%d') day,  DATE_FORMAT(registered,'%X %V') pattern, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=10,1,0 )) g10, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=20,1,0 )) g20, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=30,1,0 )) g30, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=40,1,0 )) g40, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=50,1,0 )) g50, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=60,1,0 )) g60, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=70,1,0 )) g70, COUNT(*) total FROM users WHERE registered <= ? GROUP BY pattern ORDER BY day ASC", record);
  },
  searchAdminUserGenMonth: function (record) {
    return this.query("SELECT DATE_FORMAT(registered,'%Y-%m') day, DATE_FORMAT(registered,'%X %c') pattern, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=10,1,0 )) g10, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=20,1,0 )) g20, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=30,1,0 )) g30, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=40,1,0 )) g40, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=50,1,0 )) g50, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=60,1,0 )) g60, SUM( IF( ((YEAR(CURDATE())-birth_year) DIV 10 * 10)=70,1,0 )) g70, COUNT(*) total FROM users WHERE registered <= ? GROUP BY pattern ORDER BY day ASC", record);
  },

  searchAdminMember: function (record) {
    return this.query("SELECT * FROM admin_member WHERE (name like ? OR rcn like ?) AND status like ? AND area1 like ? AND area2 like ? AND updated >= ? AND updated <= ? ORDER BY id ASC", record);
  },
  searchAdminUser: function (record) {
    return this.query("SELECT *, ((YEAR(CURDATE())-birth_year) DIV 10 * 10) as age FROM users WHERE email like ? AND os like ? AND gender like ? AND ((YEAR(CURDATE())-IFNULL(birth_year,'1900')) DIV 10 * 10) like ? AND area1 like ? AND area2 like ? AND registered >= ? AND registered <= ? ORDER BY id ASC", record);
  },
  searchAdminUserReceipt: function (record) {
    return this.query("SELECT * FROM receipts WHERE (member like ? AND rcn like ?) AND registered >= ? AND registered <= ? AND email = ?", record);
  },

  searchAdminUserCoupon: function (record) {
    return this.query("SELECT * FROM user_coupon WHERE (member like ? AND rcn like ?) AND registered >= ? AND registered <= ? AND email = ?", record);
  },

  searchAdminUserStamp: function (record) {
    return this.query("SELECT * FROM user_stamp WHERE (member like ? AND rcn like ?) AND registered >= ? AND registered <= ? AND email = ?", record);
  },

  searchAdminCoupon: function (record) {
    return this.query("SELECT * FROM admin_member_coupon WHERE name like ? AND status like ? AND updated >= ? AND updated <= ?", record);
  },
  searchAdminEvent: function (record) {
    return this.query("SELECT * FROM admin_event WHERE status like ? AND coupon like ? AND updated >= ? AND updated <= ?", record);
  },
  searchAdminNotice: function (record) {
    return this.query("SELECT * FROM admin_notice WHERE title like ? AND gender like ? AND age like ? AND area1 like ? AND area2 like ? AND updated >= ? AND updated <= ?", record);
  },
  searchAdminNoticeById: function (record) {
    return (this.query("SELECT * FROM admin_notice WHERE id = ?", record))[0];
  },
  searchAdminClass: function (record) {
    return this.query("SELECT * FROM admin_class WHERE name like ? AND updated >= ? AND updated <= ?", record);
  },


/*
  searchMemberDashDealDay: function (record) {
    return this.query("SELECT DATE_FORMAT(registered, '%Y-%m-%d') day, DATE_FORMAT(registered, '%Y-%m-%d') pattern, sum(amount) total, max(id) maxid, min(id) minid FROM receipts WHERE rcn = ? AND registered >= ? AND registered <= ? GROUP BY DATE(registered) ORDER BY registered ASC", record);
  },
  searchMemberDashDealWeek: function (record) {
    return this.query("SELECT DATE_FORMAT(registered, '%Y-%m-%d') day, DATE_FORMAT(registered,'%X %V') pattern, sum(amount) total, max(id) maxid, min(id) minid FROM receipts WHERE rcn = ? AND registered >= ? AND registered <= ? GROUP BY pattern ORDER BY registered ASC", record);
  },
  searchMemberDashDealMon: function (record) {
    return this.query("SELECT DATE_FORMAT(registered, '%Y-%m') day, DATE_FORMAT(registered,'%X %c') pattern, sum(amount) total, max(id) maxid, min(id) minid FROM receipts WHERE rcn = ? AND registered >= ? AND registered <= ? GROUP BY pattern ORDER BY registered ASC", record);
  },
*/
  searchMemberDashDeal: function (record) {
console.log (record);
    //return this.query("SELECT * from member_dashboard WHERE rcn = ? AND DATE(?) <= day AND DATE(?) >= day AND types = ?", record);
    return this.query("SELECT * from member_dashboard WHERE rcn = ? AND ? <= day AND ? >= day AND types = ?", record);
  },

  searchMemberDashDealRange: function (record) {
    return this.query("SELECT * FROM receipts WHERE rcn = ? AND id >= ? AND id <= ?", record);
  },


  searchMemberDashCouponDay: function (record) {
    return this.query("SELECT DATE_FORMAT(registered, '%Y-%m-%d') day, DATE_FORMAT(registered, '%Y-%m-%d') pattern, SUM(IF(ctype = '프로모션',1,0)) sum_promotion, SUM(IF(ctype = '리워드',1,0)) sum_reward, SUM(IF(ctype = '스탬프',1,0)) sum_stamp, max(id) maxid, min(id) minid FROM user_coupon WHERE rcn = ? AND registered >= ? AND registered <= ? GROUP BY DATE(registered) ORDER BY registered ASC", record);
  },
  searchMemberDashCouponWeek: function (record) {
    return this.query("SELECT DATE_FORMAT(registered, '%Y-%m-%d') day, DATE_FORMAT(registered,'%X %V') pattern, SUM(IF(ctype = '프로모션',1,0)) sum_promotion, SUM(IF(ctype = '리워드',1,0)) sum_reward, SUM(IF(ctype = '스탬프',1,0)) sum_stamp, max(id) maxid, min(id) minid FROM user_coupon WHERE rcn = ? AND registered >= ? AND registered <= ? GROUP BY pattern ORDER BY registered ASC", record);
  },
  searchMemberDashCouponMon: function (record) {
    return this.query("SELECT DATE_FORMAT(registered, '%Y-%m') day, DATE_FORMAT(registered,'%X %c') pattern, SUM(IF(ctype = '프로모션',1,0)) sum_promotion, SUM(IF(ctype = '리워드',1,0)) sum_reward, SUM(IF(ctype = '스탬프',1,0)) sum_stamp, max(id) maxid, min(id) minid FROM user_coupon WHERE rcn = ? AND registered >= ? AND registered <= ? GROUP BY pattern ORDER BY registered ASC", record);
  },
  searchMemberDashCouponRange: function (record) {
    return this.query("SELECT * FROM user_coupon WHERE rcn = ? AND id >= ? AND id <= ?", record);
  },


  searchMemberCoupon: function (record) {
    return this.query("SELECT * FROM admin_member_coupon WHERE rcn = ? AND ctype like ? AND name like ? AND status like ? AND updated >= ? AND updated <= ?", record);
  },
  searchMemberCouponId: function (record) {
    return (this.query("SELECT * FROM admin_member_coupon WHERE id = ?", record))[0];
  },
  searchMemberStamp: function (record) {
    return (this.query("SELECT * FROM admin_member_coupon WHERE rcn = ? AND ctype = '스탬프'", record))[0];
  },
  searchMemberEvent: function (record) {
    return (this.query("SELECT * FROM admin_member WHERE rcn = ?", record))[0];
  },
  searchMemberDetail: function (record) {
/*
    var result1 =  this.query("SELECT * FROM admin_member_logo WHERE rcn = ?", record);
    var result2 =  this.query("SELECT * FROM admin_member_info WHERE rcn = ?", record);
    var result  = result1[0];
    result.logo      = result2[0].logo;
    result.intro     = result2[0].intro;
    result.offduty   = result2[0].offduty;
    result.opentime  = result2[0].opentime;
    result.closetime = result2[0].closetime;

    return result;
*/
    return (this.query("SELECT * FROM admin_member WHERE rcn = ?", record))[0];
  },


  ///////////////////////////////////////////////////////////////////////////////////////////////
  //
  // SELECT ID
  //
  findAdminMemberId: function (record) {
    return (this.query("SELECT * FROM admin_member WHERE id = ?", record))[0];
  },
  findAdminUserId: function (record) {
    return (this.query("SELECT * FROM users WHERE id = ?", record))[0];
  },
  findAdminCouponId: function (record) {
    return (this.query("SELECT * FROM admin_member_coupon WHERE id = ?", record))[0];
  },
  findAdminEventId: function (record) {
    return (this.query("SELECT * FROM admin_event WHERE id = ?", record))[0];
  },
  findAdminNoticeId: function (record) {
    return (this.query("SELECT * FROM admin_notice WHERE id = ?", record))[0];
  },
  findAdminClassId: function (record) {
    return (this.query("SELECT * FROM admin_class WHERE id = ?", record))[0];
  },
  findAdminAdminId: function (record) {
    return (this.query("SELECT * FROM admin_users WHERE id = ?", record))[0];
  },
  findAdminGroupId: function (record) {
    return (this.query("SELECT * FROM admin_group WHERE id = ?", record))[0];
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //
  // SELECT ALL
  //
  getAdminMemberAll: function (record) {
    return this.query("SELECT * FROM admin_member", record);
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////

  allAdminMember: function (record) {
    return this.query("SELECT * FROM admin_member", record);
  },

  allAdminUser: function (record) {
    return this.query("SELECT * FROM users", record);
  },

  putAdminMemberHistory: function (record) {
    return this.query("INSERT INTO admin_member_history (name, rcn, menu, updater, updated, done, division, description) VALUES (?,?,?,?,?,?,?,?)", record);
  },
  putAdminCouponHistory: function (record) {
    return this.query("INSERT INTO admin_coupon_history (name, menu, updater, updated, done, division, description) VALUES (?,?,?,?,?,?,?)", record);
  },
  putAdminEventHistory: function (record) {
    return this.query("INSERT INTO admin_event_history (name, menu, updater, updated, done, division, description) VALUES (?,?,?,?,?,?,?)", record);
  },
  putAdminNoticeHistory: function (record) {
    return this.query("INSERT INTO admin_notice_history (name, menu, updater, updated, done, division, description) VALUES (?,?,?,?,?,?,?)", record);
  },
  putAdminUserHistory: function (record) {
    return this.query("INSERT INTO admin_users_history (email, updater, updated, done, division, description) VALUES (?,?,?,?,?,?)", record);
  },
  putAdminGroupHistory: function (record) {
    return this.query("INSERT INTO admin_group_history (name, menu, updater, updated, done, division, description) VALUES (?,?,?,?,?,?,?)", record);
  },
  putAdminClassHistory: function (record) {
    return this.query("INSERT INTO admin_class_history (name, menu, updater, updated, done, division, description) VALUES (?,?,?,?,?,?,?)", record);
  },
  putAdminAdminHistory: function (record) {
    return this.query("INSERT INTO admin_admin_history (name, menu, updater, updated, done, division, description) VALUES (?,?,?,?,?,?,?)", record);
  },
  putPosLicenseHistory: function (record) {
    return this.query("INSERT INTO admin_license_history (name, menu, updater, updated, done, division, description) VALUES (?,?,?,?,?,?,?)", record);
  },
  putPosMonitorHistory: function (record) {
    return this.query("INSERT INTO admin_monitor_history (name, menu, updater, updated, done, division, description) VALUES (?,?,?,?,?,?,?)", record);
  },
  putPosVersionHistory: function (record) {
    return this.query("INSERT INTO admin_version_history (name, menu, updater, updated, done, division, description) VALUES (?,?,?,?,?,?,?)", record);
  },
 

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //
  // UPDATE
  //
  updAdminMemberPassword: function (record) {
    return this.query("UPDATE admin_member SET passwd = ? WHERE id = ?", record); 
  },

  updAdminUserPassword: function (record) {
    return this.query("UPDATE users SET passwd = ? WHERE id = ?", record);
  },

  updAdminMember: function (record) {
    return this.query("UPDATE admin_member SET status = ?, name = ? , owner = ? , bzcond = ? , bztype = ? , bzname = ? , phone = ? , opening = ? , area1 = ? , area2 = ? , address = ? , lat = ? , lng = ?, updater = ?  WHERE id = ?", record);
  },

  updAdminUser: function (record) {
    return this.query("UPDATE users SET birth_year = ? , birth_month = ? , birth_day = ? , gender = ? , area1 = ? , area2 = ? , status = ?, updater = ? WHERE id = ?", record);
  },

  updAdminMemberProfile: function (record) {
    return this.query("UPDATE admin_member SET resp_name = ? , resp_phone = ? , resp_email = ? WHERE id = ?", record);
  },

  updAdminCoupon: function (record) {
    return this.query("UPDATE admin_member_coupon SET name = ? , status = ? , date1 = ? , date2 = ? , benefit = ? , notice = ?, updater = ? WHERE id = ?", record);
  },

  updAdminEvent: function (record) {
console.log(record);
    return this.query("UPDATE admin_event SET title = ? , status = ?, fnotice = ?, fweight = ?, fmain = ?, fevent = ?, gender = ? , age = ? , area1 = ?, area2 = ?, date1 = ?, date2 = ? , event = ? , main = ?, detail = ?, rgb = ?, rgb2 = ?, coupon = ?, date3 = ?, date4 = ?, coupon_url = ?, updater = ? WHERE id = ?", record);
  },

  updAdminGroup: function (record) {
    console.log (record);
    return this.query("UPDATE admin_group SET gname = ?, name = ?, fcoupon = ?, fevent = ?, fnotice = ?, fadmin = ?, fgroup = ?, homepage = ?, updater = ? WHERE id = ?", record);
  },


  updAdminNotice: function (record) {
    return this.query("UPDATE admin_notice SET title = ? , gender = ? , age = ? , area1 = ?, area2 = ?, date1 = ?, date2 = ? , description = ? , detail = ? WHERE id = ?", record);
  },

  updAdminAdmin: function (record) {
    return this.query("UPDATE admin_users SET name = ? , mobile = ? , phone = ? , grade = ?, status = ?, updater = ? WHERE id = ?", record);
  },
  updAdminAdminPassword: function (record) {
    return this.query("UPDATE admin_users SET passwd = ? WHERE id = ?", record);
  },

  updAdminClass: function (record) {
    return this.query("UPDATE admin_class SET name = ? , icon_path = ?, updater = ?  WHERE id = ?", record);
  },

  updAdminPosLicense: function (record) {
    return this.query("UPDATE pos SET status = ? , updater = ?  WHERE id = ?", record);
  },

  updAdminPosVersion: function (record) {
    return this.query("UPDATE version SET description = ? , updater = ?  WHERE id = ?", record);
  },

  updMemberCouponStatus: function (record) {
    return this.query("UPDATE admin_member_coupon SET status = ? WHERE id = ?", record);
  },
  updMemberStamp: function (record) {
console.log (record);
    return this.query("UPDATE admin_member_coupon SET status = ?, stamp = ?, limits = ?, overagain = ?, benefit = ?, notice = ? WHERE rcn = ? AND ctype = '스탬프'", record);
  },
  updMemberEvent: function (record) {
console.log (record);
    return this.query("UPDATE admin_member SET leaflet = ?, leaflet_sub1 = ?, leaflet_sub2 = ?, leaflet_sub3 = ? WHERE rcn = ?", record);
  },
  updMemberDetail: function (record) {
console.log (record);
    return this.query("UPDATE admin_member SET logo = ?, intro = ?, offduty1 = ?, offduty2 = ?, opentime = ?, closetime = ?, resp_name = ?, resp_phone = ?, resp_email = ? WHERE rcn = ?", record);
  },
  
  ///////////////////////////////////////////////////////////////////////////////////////////////
  //
  // DELETE
  //
  delAdminMemberId: function (record) {
    return this.query("DELETE FROM admin_member WHERE id =?", record);
  },
  delAdminCouponId: function (record) {
    return this.query("DELETE FROM admin_member_coupon WHERE id =?", record);
  },
  delAdminEventId: function (record) {
    return this.query("DELETE FROM admin_event WHERE id =?", record);
  },
  delAdminNoticeId: function (record) {
    return this.query("DELETE FROM admin_notice WHERE id =?", record);
  },
  delAdminAdminId: function (record) {
    return this.query("DELETE FROM admin_users WHERE id =?", record);
  },
  delAdminClassId: function (record) {
    return this.query("DELETE FROM admin_class WHERE id =?", record);
  },
  delAdminGroupId: function (record) {
    return this.query("DELETE FROM admin_group WHERE id =?", record);
  },
  delMemberCouponId: function (record) {
    return this.query("DELETE FROM admin_member_coupon WHERE id =?", record);
  },
  delMemberDetailStatus: function (record) {
    return this.query("UPDATE admin_member SET status = '해지' WHERE rcn = ?", record);
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //
  // OTHERS
  //
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
    return this.query("SELECT * FROM users WHERE (name like ? OR rcn like ?) AND status like ? AND area1 like ? AND area2 like ? AND updated >= ? AND updated <= ? ORDER BY id ASC", record);
  },
  getAdminUserEmail: function(record) {
    return this.query("SELECT * FROM admin_users WHERE email = ?", record);
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
    return this.query("UPDATE users SET fcmkey = ?, uuid = ? WHERE email = ?", record);
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
  delQRcodeQRcode: function(record) {
    return this.query("DELETE FROM qrcode WHERE qrcode = ?", record);
  },
  delQRcodeExpire: function(record) {
    return this.query("DELETE FROM qrcode WHERE ts < NOW() - INTERVAL ? SECOND", record);
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

  getAdminCouponAll: function (record) {
    return this.query("SELECT * FROM admin_member_coupon WHERE admin = 'Y'", record);
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
    return this.query("SELECT * FROM admin_member_info WHERE rcn = ?", record);
  },

  getMember: function (record) {
    return this.query("SELECT * FROM member", record);
  },

  getMemberAll: function () {
    return this.query("SELECT * FROM admin_member ORDER BY name ASC");
  },
  getAdminMemberRcn: function (record) {
    return this.query("SELECT *, DATE_FORMAT(opening, '%Y-%m-%d') openingF FROM admin_member WHERE rcn = ?", record);
  },

  getAdminMember: function (record) {
    return this.query("SELECT * FROM admin_member WHERE (name like ? OR rcn like ?) AND status like ? AND area1 like ? AND area2 like ? AND updated >= ? AND updated <= ?", record);
  },

  getAdminMemberNear: function (lat, lng, distance = 2.0) {
    return this.query ("SELECT *,(6371*acos(cos(radians(?))*cos(radians(lat))*cos(radians(lng)-radians(?))+sin(radians(?))*sin(radians(lat)))) AS distance FROM admin_member HAVING distance <= ? ORDER BY distance LIMIT 0,300", [lat, lng, lat, distance]);
  },

  getAdminCouponCode: function (record) {
    return this.query("SELECT * FROM admin_member_coupon WHERE cpcode <= ?", record);
  },

  getAdminCoupon: function (record) {
    return this.query("SELECT * FROM admin_member_coupon WHERE name like ? AND status like ? AND updated >= ? AND updated <= ?", record);
  },

  getAdminAdmin: function (record) {
    return this.query("SELECT * FROM admin_users WHERE name like ? AND grade like ? AND status like ? AND updated >= ? AND updated <= ?", record);
  },

  getAdminAdminEmail: function (email) {
    return this.query("SELECT * FROM admin_users WHERE email = ?", [email]);
  },

  getAdminNotice: function (record) {
    return this.query("SELECT * FROM admin_notice WHERE title like ? AND gender like ? AND age like ? AND area1 like ? AND area2 like ? AND updated >= ? AND updated <= ?", record);
  },

  putAdminNotice: function (record) {
    console.log (record);
    return this.query("INSERT INTO admin_notice (title, gender, age, area1, area2, date1, date2, description, detail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", record);
  },

  putAdminGroup: function (record) {
    console.log (record);
    return this.query("INSERT INTO admin_group (gname, pattern, gdepth, name, fcoupon, fevent, fnotice, fadmin, fgroup, homepage, register) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", record);
  },

  getAdminEventAll: function (record) {
    return this.query("SELECT * FROM admin_event WHERE status like ? AND coupon like ? AND updated >= ? AND updated <= ?", record);
  },

  getAdminEvent: function (record) {
    return this.query("SELECT * FROM admin_event WHERE title like ? AND gender like ? AND age like ? AND area1 like ? AND area2 like ? AND updated >= ? AND updated <= ?", record);
  },

  getAdminClass: function (record) {
    return this.query("SELECT * FROM admin_class WHERE name like ? AND updated >= ? AND updated <= ?", record);
  },

  getAdminGroup: function (record) {
    return this.query("SELECT * FROM admin_group WHERE name like ? AND updated >= ? AND updated <= ? AND pattern like ?", record);
  },

  getAdminLicense: function (record) {
    return this.query("SELECT * FROM pos WHERE (name like ? OR rcn like ?) AND status like ? AND license like ? AND updated >= ? AND updated <= ?", record);
  },

  getAdminMonitor: function (record) {
    return this.query("SELECT * FROM pos WHERE (name like ? OR rcn like ?) AND version like ? AND status like ? AND network like ?", record);
  },

  getAdminPosId: function (record) {
    return this.query("SELECT * FROM pos WHERE id = ?", record)[0];
  },

  getGroup1: function () {
    return this.query("SELECT * FROM admin_group ORDER BY id, gdepth");
  },

  getGroup1ByName: function (record) {
    return this.query("select * from admin_group where pattern like ? ORDER BY pattern DESC", record);
  },

  getVersion: function () {
    return this.query("SELECT * FROM version");
  },

  getVersionId: function (record) {
    return this.query("SELECT * FROM version WHERE id = ?", record)[0];
  },

  getMaxVersion: function () {
    return this.query("SELECT * FROM version WHERE version IN (SELECT MAX(version) FROM version)")[0];
  },

  getCityArea1: function () {
    return this.query("SELECT sido_nm FROM city GROUP BY sido_nm");
  },

  getCityArea2: function (record) {
    return this.query("SELECT sigungu_nm FROM city WHERE sido_nm like ? GROUP BY sigungu_nm", record);
  },

  getDashboardDay: function (record) {
    let result = {};
    console.log (`SELECT DATE_FORMAT(ts, '%Y-%m-%d') day, DATE_FORMAT(ts, '%Y-%m-%d') pattern, sum(total) total FROM receipt WHERE ts >= "${record[0]}" AND ts <= "${record[1]}" GROUP BY DATE(ts) ORDER BY ts ASC`);
    result['summary'] = this.query("SELECT DATE_FORMAT(ts, '%Y-%m-%d') day, DATE_FORMAT(ts, '%Y-%m-%d') pattern, sum(total) total FROM receipt WHERE ts >= ? AND ts <= ? GROUP BY DATE(ts) ORDER BY ts ASC", record);
    result['data']    = this.query("SELECT *, DATE_FORMAT(ts, '%Y-%m-%d') pattern FROM receipt WHERE ts >= ? AND ts <= ? ORDER BY ts ASC", record);
    return  result;
  },

  getDashboardWeek: function (record) {
    let result = {};
    console.log (`SELECT DATE_FORMAT(ts, '%Y-%m-%d') day, DATE_FORMAT(ts,'%X %V') pattern, sum(total) total FROM receipt WHERE ts >= "${record[0]}" AND ts <= "${record[1]}" GROUP BY pattern ORDER BY ts ASC`);
    result['summary'] = this.query("SELECT DATE_FORMAT(ts, '%Y-%m-%d') day, DATE_FORMAT(ts,'%X %V') pattern, sum(total) total FROM receipt WHERE ts >= ? AND ts <= ? GROUP BY pattern ORDER BY ts ASC", record);
    result['data'] = this.query("SELECT *, DATE_FORMAT(ts,'%X %V') pattern FROM receipt WHERE ts >= ? AND ts <= ? ORDER BY ts ASC", record);
    return  result;
  },

  getDashboardMon: function (record) {
    let result = {};
    console.log (`SELECT DATE_FORMAT(ts, '%Y-%m') day, DATE_FORMAT(ts,'%X %c') pattern, sum(total) total FROM receipt WHERE ts >= "${record[0]}" AND ts <= "${record[1]}" GROUP BY pattern ORDER BY ts ASC`);
    result['summary'] = this.query("SELECT DATE_FORMAT(ts, '%Y-%m') day, DATE_FORMAT(ts,'%X %c') pattern, sum(total) total FROM receipt WHERE ts >= ? AND ts <= ? GROUP BY pattern ORDER BY ts ASC", record);
    result['data'] = this.query("SELECT *, DATE_FORMAT(ts,'%X %c') pattern FROM receipt WHERE ts >= ? AND ts <= ? ORDER BY ts ASC", record);
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
    return this.query("INSERT INTO admin_users (email, passwd, name, mobile, phone, grade, status) VALUES (?, ?, ?, ?, ?, ?, ?)", record);
  },

  updAdminProfile: function(record) {
    return this.query("UPDATE admin_users SET name = ?, mobile = ?, phone = ? WHERE email = ?", record);
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
      this.query("UPDATE user_stamp SET status = '사용' WHERE id = ? AND email = ?", record);
      return this.query("INSERT INTO user_coupon (email, member, rcn, bzcode, ctype, cpcode, name, date1, date2, benefit, notice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [result[0].email, result[0].member, result[0].rcn, result[0].bzcode, result[0].ctype, result[0].cpcode, result[0].name, result[0].date1, result[0].date2, result[0].benefit, result[0].notice]);
    }
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
    let rt = this.query("SELECT count(*) num FROM receipts WHERE email = ?", [email]);
    let rc = this.query("select count(*) num FROM receipts WHERE DATE_FORMAT(registered, '%Y-%m') =  DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m') AND email = ?", [email]);
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

  updPosHbeat: function (record) {
    return this.query("UPDATE pos SET hbeat = ?, version = ? WHERE license = ?", record);
  },

  delPosLicenseId: function (record) {
    return this.query("DELETE FROM pos WHERE id = ?", record);
  },

  delPosVersionId: function (record) {
    return this.query("DELETE FROM version WHERE id = ?", record);
  },

  updPosMember: function (record) {
    return this.query("UPDATE pos SET name = ? WHERE license = ?", record);
  },

  putPos: function (record) {
    return this.query("INSERT INTO pos (email, mac, rcn, token, expire) VALUES (?, ?, ?, ?, ?)", record);
  },

  getBzname: function () {
    return this.query("SELECT * FROM admin_class");
  },

}
