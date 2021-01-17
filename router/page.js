'use strict';

const lib = require('../lib');

module.exports = {

  getPage : function (d) {
    let info = {};
    
    console.log ('getPage: ', d);
    switch (d) {
    case '/admin':
      info.title = 'Dashboard';
      info.name = 'admin/index';
      info.navigation = '';
      info.page = 'admin/index';
      return info;

    case '/admin/profile':
      info.title = 'Profile';
      info.name = 'admin/profile';
      info.navigation = '';
      info.page = 'admin/profile';
      return info;

    case '/admin/member/search':
      info.title = '가맹점 조회';
      info.name = 'admin/member/search';
      info.navigation = '';
      info.page = 'admin/member/search';
      return info;

    case '/admin/member/register':
      info.title = '가맹점 등록';
      info.name = 'admin/member/register';
      info.navigation = '';
      info.page = 'admin/member/register';
      return info;

    case '/admin/coupon/search':
      info.title = '쿠폰 조회';
      info.name = 'admin/coupon/search';
      info.navigation = '';
      info.page = 'admin/coupon/search';
      return info;

    case '/admin/coupon/register':
      info.title = '쿠폰 등록';
      info.name = 'admin/coupon/register';
      info.navigation = '';
      info.page = 'admin/coupon/register';
      return info;

    case '/admin/user/search':
      info.title = '사용자 조회';
      info.name = 'admin/user/search';
      info.navigation = '';
      info.page = 'admin/user/search';
      return info;

    case '/admin/user/join':
      info.title = '사용자 가입통계';
      info.name = 'admin/user/join';
      info.navigation = '';
      info.page = 'admin/user/join';
      return info;

    case '/admin/user/gender':
      info.title = '사용자 성별통계';
      info.name = 'admin/user/gender';
      info.navigation = '';
      info.page = 'admin/user/gender';
      return info;

    case '/admin/user/age':
      info.title = '사용자 연령통계';
      info.name = 'admin/user/age';
      info.navigation = '';
      info.page = 'admin/user/age';
      return info;

    case '/admin/user/area':
      info.title = '사용자 지역통계';
      info.name = 'admin/user/area';
      info.navigation = '';
      info.page = 'admin/user/area';
      return info;

    case '/admin/event/search':
      info.title = '이벤트/광고 조회';
      info.name = 'admin/event/search';
      info.navigation = '';
      info.page = 'admin/event/search';
      return info;

    case '/admin/event/register':
      info.title = '이벤트/광고 등록';
      info.name = 'admin/event/register';
      info.navigation = '';
      info.page = 'admin/event/search';
      return info;

    case '/admin/notice/search':
      info.title = '공지사항 조회';
      info.name = 'admin/notice/search';
      info.navigation = '';
      info.page = 'admin/notice/search';
      return info;

    case '/admin/notice/register':
      info.title = '공지사항 등록';
      info.name = 'admin/notice/register';
      info.navigation = '';
      info.page = 'admin/notice/search';
      return info;

    case '/admin/admin/search':
      info.title = '관리자 조회';
      info.name = 'admin/admin/search';
      info.navigation = '';
      info.page = 'admin/admin/search';
      return info;

    case '/admin/admin/register':
      info.title = '관리자 등록';
      info.name = 'admin/admin/register';
      info.navigation = '';
      info.page = 'admin/admin/search';
      return info;

    case '/admin/class/search':
      info.title = '가맹점 업종 분류코드 조회';
      info.name = 'admin/class/search';
      info.navigation = '';
      info.page = 'admin/class/search';
      return info;

    case '/admin/class/register':
      info.title = '가맹점 업종 분류코드 등록';
      info.name = 'admin/class/register';
      info.navigation = '';
      info.page = 'admin/class/search';
      return info;

    case '/admin/group/search':
      info.title = '권한그룹 조회';
      info.name = 'admin/group/search';
      info.navigation = '';
      info.page = 'admin/group/search';
      return info;

    case '/admin/group/register':
      info.title = '권한그룹 등록';
      info.name = 'admin/group/register';
      info.navigation = '';
      info.page = 'admin/group/search';
      return info;

    case '/admin/grade/search':
      info.title = '권한 조회';
      info.name = 'admin/grade/search';
      info.navigation = '';
      info.page = 'admin/grade/search';
      return info;

    }
  }
}