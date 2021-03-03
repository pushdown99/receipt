'use strict';

const lib = require('../lib');

module.exports = {

  getPage : function (d) {
    var info = {};
    
    console.log ('getPage: ', d);
    switch (d) {
    case '/admin':
      info.title = 'Dashboard';
      info.name = 'admin/dashboard/dashboard';
      info.navigation = '관리자';
      info.page = 'admin/dashboard/dashboard';
      return info;

    case '/admin/profile':
      info.title = 'Profile';
      info.name = 'admin/profile';
      info.navigation = '프로필';
      info.page = 'admin/profile';
      return info;

    case '/admin/dashboard/dashboard':
      info.title = 'Dashboard';
      info.name = 'admin/dashboard/dashboard';
      info.navigation = '관리자';
      info.page = 'admin/dashboard/dashboard';
      return info;

    case '/admin/dashboard/member':
      info.title = '가맹점가입통계';
      info.name = 'admin/dashboard/member';
      info.navigation = '대시보드 / 가맹점가입통계';
      info.page = 'admin/dashboard/member';
      return info;

    case '/admin/dashboard/user':
      info.title = '사용자가입통계';
      info.name = 'admin/dashboard/user';
      info.navigation = '대시보드 / 사용자가입통계';
      info.page = 'admin/dashboard/user';
      return info;

    case '/admin/dashboard/deal':
      info.title = '사용자거래통계';
      info.name = 'admin/dashboard/deal';
      info.navigation = '대시보드 / 사용자거래통계';
      info.page = 'admin/dashboard/deal';
      return info;

    case '/admin/dashboard/stamp':
      info.title = '사용자스탬프통계';
      info.name = 'admin/dashboard/stamp';
      info.navigation = '대시보드 / 사용자스탬프통계';
      info.page = 'admin/dashboard/stamp';
      return info;

    case '/admin/member/search':
      info.title = '가맹점 조회';
      info.name = 'admin/member/search';
      info.navigation = '가맹점관리 / 가맹점조회';
      info.page = 'admin/member/search';
      return info;

    case '/admin/member/register':
      info.title = '가맹점 등록';
      info.name = 'admin/member/register';
      info.navigation = '가맹점관리 / 가맹점등록';
      info.page = 'admin/member/register';
      return info;

    case '/admin/coupon/search':
      info.title = '쿠폰 조회';
      info.name = 'admin/coupon/search';
      info.navigation = '쿠폰관리 / 쿠폰조회';
      info.page = 'admin/coupon/search';
      return info;

    case '/admin/coupon/register':
      info.title = '쿠폰 등록';
      info.name = 'admin/coupon/register';
      info.navigation = '쿠폰관리 / 쿠폰등록';
      info.page = 'admin/coupon/register';
      return info;

    case '/admin/user/search':
      info.title = '사용자 조회';
      info.name = 'admin/user/search';
      info.navigation = '사용자관리 / 사용자조회';
      info.page = 'admin/user/search';
      return info;

    case '/admin/user/join':
      info.title = '사용자 가입통계';
      info.name = 'admin/user/join';
      info.navigation = '사용자관리 / 사용자가입통계';
      info.page = 'admin/user/join';
      return info;

    case '/admin/user/gender':
      info.title = '사용자 성별통계';
      info.name = 'admin/user/gender';
      info.navigation = '사용자관리 / 사용자성별통계';
      info.page = 'admin/user/gender';
      return info;

    case '/admin/user/age':
      info.title = '사용자 연령통계';
      info.name = 'admin/user/age';
      info.navigation = '사용자관리 / 사용자연령통계';
      info.page = 'admin/user/age';
      return info;

    case '/admin/user/area':
      info.title = '사용자 지역통계';
      info.name = 'admin/user/area';
      info.navigation = '사용자관리 / 사용자지역통계';
      info.page = 'admin/user/area';
      return info;

    case '/admin/event/search':
      info.title = '이벤트/광고 조회';
      info.name = 'admin/event/search';
      info.navigation = '이벤트/광고관리 / 이벤트/광고조회';
      info.page = 'admin/event/search';
      return info;

    case '/admin/event/register':
      info.title = '이벤트/광고 등록';
      info.name = 'admin/event/register';
      info.navigation = '이벤트/광고관리 / 이벤트/광고등록';
      info.page = 'admin/event/search';
      return info;

    case '/admin/notice/search':
      info.title = '공지사항 조회';
      info.name = 'admin/notice/search';
      info.navigation = '공지사항관리 / 공지사항조회';
      info.page = 'admin/notice/search';
      return info;

    case '/admin/notice/register':
      info.title = '공지사항 등록';
      info.name = 'admin/notice/register';
      info.navigation = '공지사항관리 / 공지사항등록';
      info.page = 'admin/notice/search';
      return info;

    case '/admin/admin/search':
      info.title = '관리자 조회';
      info.name = 'admin/admin/search';
      info.navigation = '관리자관리 / 관리자조회';
      info.page = 'admin/admin/search';
      return info;

    case '/admin/admin/register':
      info.title = '관리자 등록';
      info.name = 'admin/admin/register';
      info.navigation = '관리자관리 / 관리자등록';
      info.page = 'admin/admin/search';
      return info;

    case '/admin/class/search':
      info.title = '가맹점 업종 분류코드 조회';
      info.name = 'admin/class/search';
      info.navigation = '설정 / 업종분류코드관리 / 업종분류코드조회';
      info.page = 'admin/class/search';
      return info;

    case '/admin/class/register':
      info.title = '가맹점 업종 분류코드 등록';
      info.name = 'admin/class/register';
      info.navigation = '설정 / 업종분류코드관리 / 업종분류코드등록';
      info.page = 'admin/class/search';
      return info;

    case '/admin/group/search':
      info.title = '그룹권한조회';
      info.name = 'admin/group/search';
      info.navigation = '그룹권한관리 / 그룹권한조회';
      info.page = 'admin/group/search';
      return info;

    case '/admin/group/register':
      info.title = '그룹권한등록';
      info.name = 'admin/group/register';
      info.navigation = '그룹권한관리 / 그룹권한등록';
      info.page = 'admin/group/search';
      return info;

    case '/admin/pos/search':
      info.title = '판매시점관리기조회';
      info.name = 'admin/pos/search';
      info.navigation = '판매시점관리기관리 / 판매시점관리기조회';
      info.page = 'admin/pos/search';
      return info;

    /////////////////////////////////////////////////

    case '/test':
      info.title = '테스트';
      info.name = 'test';
      info.navigation = '';
      info.page = 'test';
      return info;

    /////////////////////////////////////////////////

    case '/member':
      info.title = '대시보드';
      info.name = 'member/index';
      info.navigation = '가맹점';
      info.page = 'member/index';
      return info;

    case '/member/profile':
      info.title = '프로필관리';
      info.name = 'member/profile';
      info.navigation = '프로필관리';
      info.page = 'member/profile';
      return info;

    case '/member/coupon/search':
      info.title = '쿠폰조회';
      info.name = 'member/coupon/search';
      info.navigation = '쿠폰관리 / 쿠폰조회';
      info.page = 'member/coupon/search';
      return info;

    case '/member/coupon/register':
      info.title = '쿠폰등록';
      info.name = 'member/coupon/register';
      info.navigation = '쿠폰관리 / 쿠폰등록';
      info.page = 'member/coupon/register';
      return info;

    case '/member/stamp/search':
      info.title = '스탬프조회';
      info.name = 'member/stamp/search';
      info.navigation = '스탬프관리 / 스탬프조회';
      info.page = 'member/stamp/search';
      return info;

    case '/member/event/search':
      info.title = '광고조회';
      info.name = 'member/event/search';
      info.navigation = '광고관리 / 광고조회';
      info.page = 'member/event/search';
      return info;

    case '/member/detail':
      info.title = '상세정보조회';
      info.name = 'member/detail';
      info.navigation = '상세정보조회';
      info.page = 'member/detail';
      return info;

    }
  }
}
