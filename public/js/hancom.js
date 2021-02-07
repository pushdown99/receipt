
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// jQuery EXTEND
//
$.extend({
  postJSON: function(url, body) {
    return $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(body),
      contentType: "application/json",
      dataType: 'json'
    });
  },

  postFORM: function(url, formData) {
    $.ajax({
      type: "POST",
      enctype: 'multipart/form-data',
      url: url,
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function (data) {
        console.log("SUCCESS : ", data);
      },
      error: function (e) {
        console.log("ERROR : ", e);
      }
    });
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// VARIABLE
//
const shrink     = 640;
const width      = (window.innerWidth > 0) ? window.innerWidth : screen.width;
const height     = (window.innerHeight > 0) ? window.innerHeight : screen.height;
const today      = moment().format('YYYY-MM-DD');
const before     = moment().subtract(1, 'months').format('YYYY-MM-DD');
const pagelength = 10;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// jQuery READY
//
$(function() {
  var pageid = $('#pageid').text();
  console.log ("current page is", pageid);
  switch(pageid) {
  case 'admin-dashboard-member':
  case 'admin-dashboard-user':
  case 'admin-dashboard-search':
  case 'admin-dashboard-deal':
  case 'admin-dashboard-stamp':
console.log('dashboiard');
    $("#sb-dashboard").addClass("menu-is-opening menu-open");
    break;

  case 'admin-member-search':
  case 'admin-member-register':
    $("#sb-member").addClass("menu-is-opening menu-open");
    break;
  case 'admin-user-search':
  case 'admin-user-join-search':
  case 'admin-user-age-search':
  case 'admin-user-gender-search':
  case 'admin-user-area-search':
    $("#sb-user").addClass("menu-is-opening menu-open");
    $("#sb-user-stat").addClass("menu-is-opening menu-open");
    break;
  case 'admin-coupon-search':
  case 'admin-coupon-register':
    $("#sb-coupon").addClass("menu-is-opening menu-open");
    break;
  case 'admin-event-search':
  case 'admin-event-register':
    $("#sb-event").addClass("menu-is-opening menu-open");
    break;
  case 'admin-notice-search':
  case 'admin-notice-register':
    $("#sb-notice").addClass("menu-is-opening menu-open");
    break;
  case 'admin-admin-search':
  case 'admin-admin-register':
    $("#sb-admin").addClass("menu-is-opening menu-open");
    break;
  case 'admin-class-search':
  case 'admin-class-register':
    $("#sb-class").addClass("menu-is-opening menu-open");
    break;
  case 'admin-group-search':
  case 'admin-group-register':
  case 'admin-role-search':
    $("#sb-group").addClass("menu-is-opening menu-open");
    $("#sb-role").addClass("menu-is-opening menu-open");
    break;



  case 'member-dashboard-search':
    $("#sb-member-dashboard").addClass("menu-is-opening menu-open");
    break;
  case 'member-coupon-search':
  case 'member-coupon-register':
    $("#sb-member-coupon").addClass("menu-is-opening menu-open");
    break;
  case 'member-stamp-search':
    $("#sb-member-stamp").addClass("menu-is-opening menu-open");
    break;
  case 'member-event-search':
    $("#sb-member-event").addClass("menu-is-opening menu-open");
    break;
  case 'member-detail-search':
    $("#sb-member-detail").addClass("menu-is-opening menu-open");
    break;
  }

  if ($("#date1").length) { $("#date1").datetimepicker({ format: 'YYYY-MM-DD' }); $("#date1").val(before); }
  if ($("#date2").length) { $("#date2").datetimepicker({ format: 'YYYY-MM-DD' }); $("#date2").val(today); }
  if ($("#date2").length == 0 && $("#date1").length > 0) { $("#date1").val(today); }
  if ($("#date3").length) { $("#date3").datetimepicker({ format: 'YYYY-MM-DD' }); $("#date3").val(before); }
  if ($("#date4").length) { $("#date4").datetimepicker({ format: 'YYYY-MM-DD' }); $("#date4").val(today); }
  if ($("#date4").length == 0 && $("#date3").length > 0) { $("#date3").val(today); }
  if ($("#m-date1").length) { $("#m-date1").datetimepicker({ format: 'YYYY-MM-DD' }); $("#m-date1").val(before); }
  if ($("#m-date2").length) { $("#m-date2").datetimepicker({ format: 'YYYY-MM-DD' }); $("#m-date2").val(today); }
  if ($("#m-date3").length) { $("#m-date3").datetimepicker({ format: 'YYYY-MM-DD' }); $("#m-date3").val(before); }
  if ($("#m-date4").length) { $("#m-date4").datetimepicker({ format: 'YYYY-MM-DD' }); $("#m-date4").val(today); }
  if ($("#m-date5").length) { $("#m-date5").datetimepicker({ format: 'YYYY-MM-DD' }); $("#m-date5").val(before); }
  if ($("#m-date6").length) { $("#m-date6").datetimepicker({ format: 'YYYY-MM-DD' }); $("#m-date6").val(today); }
  if ($("#m-date7").length) { $("#m-date7").datetimepicker({ format: 'YYYY-MM-DD' }); $("#m-date7").val(before); }
  if ($("#m-date8").length) { $("#m-date8").datetimepicker({ format: 'YYYY-MM-DD' }); $("#m-date8").val(today); }

  if ($("#modal-date1").length) { $("#modal-date1").datetimepicker({ format: 'YYYY-MM-DD' }); }
  if ($("#modal-date2").length) { $("#modal-date2").datetimepicker({ format: 'YYYY-MM-DD' }); }
  if ($("#modal-date3").length) { $("#modal-date3").datetimepicker({ format: 'YYYY-MM-DD' }); }
  if ($("#modal-date4").length) { $("#modal-date4").datetimepicker({ format: 'YYYY-MM-DD' }); }

  if ($("#rgb1").length)   { $("#rgb1").colorpicker() }
  if ($("#rgb2").length)   { $("#rgb2").colorpicker() }
  if ($("#m-rgb1").length) { $("#m-rgb1").colorpicker() }
  if ($("#m-rgb2").length) { $("#m-rgb2").colorpicker() }

  function getArea1 () {
    $.getJSON(`/json/city/search`, function(data) {
      html = '<a class="dropdown-item area1-item">전체</a><div role="separator" class="dropdown-divider"></div>';
      $.each(data, function(i, t) {
        html += `<a class="dropdown-item area1-item">${t.sido_nm}</a>`;
      });
      $("#area1").html(html);
    });
  }
  if ($("#area1").length) getArea1 (); 

  function getModalArea1 () {
    $.getJSON(`/json/city/search`, function(data) {
      html = '';
      $.each(data, function(i, t) {
        html += `<a class="dropdown-item modal-area1-item">${t.sido_nm}</a>`;
      });
      $("#m-area1").html(html);
    });
  }
  if ($("#m-area1").length) getModalArea1 ();

  function getBzname () {
    $.getJSON(`/json/bzname/search`, function(data) {
      html = '';
      $.each(data, function(i, t) {
        html += `<a class="dropdown-item area1-item">${t.name}</a>`;
      });
      $("#bzname").html(html);
    });
  }
  if ($("#bzname").length) getBzname ();

  function getMBzname () {
    $.getJSON(`/json/bzname/search`, function(data) {
      html = '';
      $.each(data, function(i, t) {
        html += `<a class="dropdown-item area1-item">${t.name}</a>`;
      });
      $("#m-bzname").html(html);
    });
  }
  if ($("#m-bzname").length) getMBzname ();

  function getMember1 () {
    $.getJSON(`/json/admin/member/search/all`, function(data) {
      html = '';
      $.each(data, function(i, t) {
        html += `<a class="dropdown-item member1-item" rcn="${t.rcn}" bzcode="${t.bzname}">${t.name}</a>`;
      });
      $("#member1").html(html);
    });
  }
  if ($("#member1").length) getMember1 (); 

  function getAdminCoupon1 () {
console.log("admin-coupon");
    $.getJSON(`/json/admin/coupon/select`, function(data) {
      html = '';
      $.each(data, function(i, t) {
        html += `<a class="dropdown-item admin-coupon1-item" cpid="${t.id}" data=${JSON.stringify(t)} date1="${moment(t.date1).format('YYYY-MM-DD')}" date2="${moment(t.date2).format('YYYY-MM-DD')}"cpcode="${t.cpcode}">${t.member}:${t.name}</a>`;
      });
      $("#admin-coupon1").html(html);
    });
  }
  if ($("#admin-coupon1").length) getAdminCoupon1 ();

  function clock() {
    var Clock = document.getElementById("clock");
    var date = new Date();
    var year      = date.getFullYear();
    var month     = date.getMonth();
    var clockDate = date.getDate();
    var day = date.getDay();
  
    var week = ['일', '월', '화', '수', '목', '금', '토'];
    //var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
  
    Clock.innerText = `${year} 년 ${month+1} 월 ${clockDate} 일 ${week[day]}요일 ` +
    `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes }`  : minutes }:${seconds < 10 ? `0${seconds }`  : seconds }`;
  }

  if($("#clock").length > 0) {
    clock();
    setInterval(clock, 1000);
  }
  if ($("#search").length) $("#search").trigger( "click" );
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// REGISTER
//
$(document).on('click', '#register', function (event) {
  var pageid = $('#pageid').text();
  switch(pageid) {
  case 'admin-profile'          : return admin_profile_register ();
  case 'admin-member-register'  : return admin_member_register ();
  case 'admin-coupon-register'  : return admin_coupon_register ();
  case 'admin-event-register'   : return admin_event_register  ();
  case 'admin-notice-register'  : return admin_notice_register ();
  case 'admin-admin-register'   : return admin_admin_register  ();
  case 'admin-class-register'   : return admin_class_register  ();
  case 'admin-group-register'   : return admin_group_register  ();

  case 'member-coupon-register' : return member_coupon_register ();

  case 'admin-member-search'    : return $(location).attr('href', '/admin/member/register');
  case 'admin-coupon-search'    : return $(location).attr('href', '/admin/coupon/register');
  case 'admin-event-search'     : return $(location).attr ('href', '/admin/event/register');
  case 'admin-notice-search'    : return $(location).attr('href', '/admin/notice/register');
  case 'admin-admin-search'     : return $(location).attr('href', '/admin/admin/register');
  case 'admin-class-search'     : return $(location).attr('href', '/admin/class/register');
  case 'admin-group-search'     : return $(location).attr('href', '/admin/group/register');

  case 'member-coupon-search'   : return $(location).attr('href', '/member/coupon/register');


  case 'pos-sign-up'            : return pos_sign_up ();

  }
});

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-MEMBER-REGISTER
function admin_member_register_complete () {
  $("#rcn").val("");
  $("#rcn-valid").val("0");
  $("#password1").val("");
  $("#password2").val("");
  $("#name").val("");
  $("#owner").val("");
  $("#bzcond").val("");
  $("#bztype").val("");
  $("#btn-bzname").html("");
  $("#phone").val("");
  $("#date1").val("");
  $("#btn-area1").html("");
  $("#btn-area2").html("");
  $("#addr").val("");
  dynamicAlert("가맹점 정보가 정상적으로 등록되었습니다.");
  return true;
}

function admin_member_register () {
  var params = {
    register:  userInfo.name,
    rcn:       $("#rcn").val(),
    rcnvalid:  $("#rcn-valid").val(),
    password1: $("#password1").val(),
    password2: $("#password2").val(),
    name:      $("#name").val(),
    owner:     $("#owner").val(),
    bzcond:    $("#bzcond").val(),
    bztype:    $("#bztype").val(),
    bzname:    $("#btn-bzname").html(),
    phone:     $("#phone").val(),
    date1:     $("#date1").val(),
    area1:     $("#btn-area1").html(),
    area2:     $("#btn-area2").html(),
    addr:      $("#addr").val(),
    lat:       $("#lat").val(),
    lng:       $("#lng").val()
  }
  if (params.rcn == "" || params.rcnvalid == "0") { dynamicAlert("유효한 사업자등록번호를 입력해주세요"); return; }
  if (params.password1 == "" || params.password2 == "" ) { dynamicAlert("비밀번호를 입력해주세요"); return; }
  if (params.password1 != params.password2) { dynamicAlert("비밀번호가 다릅니다. 비밀번호를 다시 입력해주세요"); return; }
  if (params.name == "") {dynamicAlert("가맹점 상호명을 입력해주세요"); return; }
  if (params.bzname == "선택") {dynamicAlert("업종 분류코드를 선택해주세요"); return; }
  if (params.phone == "") {dynamicAlert("연락처를 입력해주세요"); return; }
  if (params.area1 == "선택" || params.area2 == "선택") {dynamicAlert("지역을 선택해주세요"); return; }
  if (params.addr == "") { dynamicAlert("주소를 입력해주세요"); return; }

  $.postJSON('/json/admin/member/register', params).then(res => {
    console.log(res);
    admin_member_register_complete();
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-COUPON-REGISTER
function admin_coupon_register_complete () {
  $("#cpcode").val("");
  $("#cpcode-valid").val("0");
  $("#cpname").val("");
  $("#btn-member1").html("선택");
  $("#benefit").val("");
  $("#notice").val("");
  dynamicAlert("쿠폰 정보가 정상적으로 등록되었습니다.");
}

function admin_coupon_register () {
  var params = {
    register       : userInfo.name,
    cpcode         : 'C'+$("#cpcode").val(),
    valid          : $("#cpcode-valid").html(),
    cpname         : $("#cpname").val(),
    member1_bzcode : $("#member1-bzcode").html(),
    member1_rcn    : $("#member1-rcn").html(),
    member1        : $("#btn-member1").html(),
    date1          : $("#date1").val() + ' 00:00:00',
    date2          : $("#date2").val() + ' 23:59:59',
    status         : $('input[type=radio][name=status]:checked').val(),
    benefit        : $("#benefit").val(),
    notice         : $("#notice").val()
  }
  if (params.cpcode == "")     { dynamicAlert("쿠폰코드를 입력해주세요"); return }
  if (params.valid == "0")     { dynamicAlert("사용가능한 쿠폰코드를 입력해주세요."); return }
  if (params.cpname == "")     { dynamicAlert("쿠폰명을 입력해주세요."); return }
  if (params.member == "선택") { dynamicAlert("교환가능한 가맹점을 선택해주세요."); return }
  if (params.benefit == "")    { dynamicAlert("쿠폰혜택을 입력해주세요."); return }
  if (params.notice == "")     { dynamicAlert("유의사항을 입력해주세요."); return }

  console.log (params);
  $.postJSON('/json/admin/coupon/register', params).then(res => {
    admin_coupon_register_complete();
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-EVENT-REGISTER
function admin_event_register () {
  var register= userInfo.name;
  var title   = $("#title").val();
  var status  = $("input[id='status']:checked").val();
  var fweight = $("#btn-fweight").html();
  var fnotice = ($("#fnotice").is(":checked"))? 1 : 0
  var fmain   = ($("#fmain").is(":checked"))?   1 : 0
  var fevent  = ($("#fevent").is(":checked"))?  1 : 0
  var gender  = $("#btn-gender").html();
  var age     = $("#btn-age").html();
  var area1   = $("#btn-area1").html();
  var area2   = $("#btn-area2").html();
  var date1   = $("#date1").val() + " 00:00:00";
  var date2   = $("#date2").val() + " 23:59:59";
  var rgb1    = $("#rgb1").val();
  var rgb2    = $("#rgb2").val();
  var coupon  = ($("#btn-admin-coupon1").html() == "선택")? "무":"유";
  var date3   = $("#validity1").html();
  var date4   = $("#validity2").html();

  if (title   == "") { dynamicAlert("이벤트명을 입력해주세요.");                  return }
  //if (rgb1   == "")  { dynamicAlert("상단 네비게이션 컬러를 지정해주세요.");      return }
  //if (rgb2   == "")  { dynamicAlert("하단 네비게이션 컬러를 지정해주세요.");      return }

  var formData = new FormData();
  formData.append('register',register);
  formData.append('title',   title);
  formData.append('status',  status);
  formData.append('fweight', fweight);
  formData.append('fnotice', fnotice);
  formData.append('fmain',   fmain);
  formData.append('fevent',  fevent);
  formData.append('gender',  gender);
  formData.append('age',     age);
  formData.append('area1',   area1);
  formData.append('area2',   area2);
  formData.append('date1',   date1);
  formData.append('date2',   date2);
  formData.append('file1',   $('#file1')[0].files[0]);
  formData.append('file2',   $('#file2')[0].files[0]);
  formData.append('file3',   $('#file3')[0].files[0]);
  formData.append('file4',   $('#file4')[0].files[0]);
  formData.append('file5',   $('#file5')[0].files[0]);
  formData.append('file6',   $('#file6')[0].files[0]);
  formData.append('file7',   $('#file7')[0].files[0]);
  formData.append('file8',   $('#file8')[0].files[0]);
  formData.append('file9',   $('#file9')[0].files[0]);
  formData.append('rgb1',    rgb1);
  formData.append('rgb2',    rgb2);
  formData.append('coupon',  coupon);
  formData.append('date3',   date3);
  formData.append('date4',   date4);
  $.postFORM ('/json/admin/event/register', formData);
  dynamicAlert("이벤트/공지 정보가 정상적으로 등록되었습니다.");
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-NOTICE-REGISTER
function admin_notice_register () {
  var register= userInfo.name;
  var title  = $("#title").val();
  var gender = $("#btn-gender").html();
  var age    = $("#btn-age").html();
  var area1  = $("#btn-area1").html();
  var area2  = $("#btn-area2").html();
  var date1  = $("#date1").val() + " 00:00:00";
  var date2  = $("#date2").val() + " 23:59:59";
  var notice = $("#notice").val();
  var file1  = $("#file1").val();
  var file2  = $("#file2").val();
  var file3  = $("#file3").val();
  if (title   == "") { dynamicAlert("공지사항제목을 입력해주세요.");   return }
  if (notice  == "") { dynamicAlert("공지사항 내용을 입력해주세요."); return }

  var formData = new FormData();
  formData.append('register',register);
  formData.append('title',  title);
  formData.append('gender', gender);
  formData.append('age',    age);
  formData.append('area1',  area1);
  formData.append('area2',  area2);
  formData.append('date1',  date1);
  formData.append('date2',  date2);
  formData.append('notice', notice);
  formData.append( 'file1', $('#file1')[0].files[0]);
  formData.append( 'file2', $('#file2')[0].files[0]);
  formData.append( 'file3', $('#file3')[0].files[0]);
  $.postFORM ('/json/admin/notice/register', formData);
  dynamicAlert("공지사항이 정상적으로 등록되었습니다.");
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-ADMIN-REGISTER
function admin_admin_register_complete () {
  $("#rcn").val("");
  $("#rcn-valid").val("0");
  $("#password1").val("");
  $("#password2").val("");
  $("#name").val("");
  $("#owner").val("");
  $("#bzcond").val("");
  $("#bztype").val("");
  $("#btn-bzname").html("");
  $("#phone").val("");
  $("#date1").val("");
  $("#btn-area1").html("");
  $("#btn-area2").html("");
  $("#addr").val("");
  dynamicAlert("관리자 정보가 정상적으로 등록되었습니다.");
}

function admin_admin_register () {
  var params = {
    register: userInfo.name,
    email:    $("#admin-email").val(),
    valid:    $("#admin-email-valid").val(),
    password: $("#password1").val(),
    password1:$("#password1").val(),
    password2:$("#password2").val(),
    name:     $("#name").val(),
    mobile:   $("#mobile1").val() + "-" + $("#mobile2").val() + "-" + $("#mobile3").val(),
    mobile1:  $("#mobile1").val(),
    mobile2:  $("#mobile3").val(),
    mobile3:  $("#mobile3").val(),
    phone:    $("#phone1").val() + "-" + $("#phone2").val() + "-" + $("#phone3").val(),
    phone1:   $("#phone1").val(),
    phone2:   $("#phone2").val(),
    phone3:   $("#phone3").val(),
    role:     $("#btn-role").html(),
    register: userInfo.name,
    status:   $('input[name="status"]:checked').val()
  }
  if (params.email == "" || params.valid == "0") { dynamicAlert("유효한 이메일을 입력해주세요"); return; }
  if (params.password1 == "" || params.password2 == "" ) { dynamicAlert("비밀번호를 입력해주세요"); return; }
  if (params.password1 != params.password2) { dynamicAlert("비밀번호가 다릅니다. 비밀번호를 다시 입력해주세요"); return; }
  if (params.name == "") {dynamicAlert("관리자 이름을 입력해주세요"); return; }
  if (params.mobile1 == "" || params.mobile2 == "" || params.mobile3 == "") {dynamicAlert("휴대폰 전화번호를 입력해주세요."); return; }
  if (params.role == "선택") { dynamicAlert("관리자 권한을 선택해주세요."); return; }
  if (params.phone == "--") params.phone = "";

  $ .postJSON('/json/admin/admin/register', params).then(res => {
    console.log(res);
    admin_admin_register_complete();
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-CLASS-REGISTER
function admin_class_register () {
  console.log (userInfo);
  var name  = $("#name").val() ;
  var register  = userInfo.name;

  if (name == "")  { dynamicAlert("업종명을 입력해주세요"); return }
  if (file1 == "") { dynamicAlert("1x 이미지 파일을 지정해주세요"); return }
  if (file2 == "") { dynamicAlert("2x 이미지 파일을 지정해주세요"); return }
  if (file3 == "") { dynamicAlert("3x 이미지 파일을 지정해주세요"); return }

  var formData = new FormData();
  formData.append('name',  name);
  formData.append('register',  register);
  formData.append( 'file1', $('#file1')[0].files[0]);
  formData.append( 'file2', $('#file2')[0].files[0]);
  formData.append( 'file3', $('#file3')[0].files[0]);
  $.postFORM ('/json/admin/class/register', formData);
  dynamicAlert("업종명이 정상적으로 등록되었습니다.");
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-GROUP-REGISTER
function admin_group_register () {
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-PROFILE-REGISTER
function admin_profile_register () {
  var params = {
    name  : $("#name").val(),
    mobile : $("#mobile").val(),
    phone  : $("#phone").val(),
  }
  if (params.name == "" | params.mobile == "") { dynamicAlert("공란을 채워주세요"); return }
  $.postJSON('/json/admin/class/register', params).then(res => {
    console.log(res);
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
// MEMBER-COUPON-REGISTER
function member_coupon_register () {
  console.log(memberInfo);
  var params = {
    cpcode         : 'C'+$("#cpcode").val(),
    valid          : $("#cpcode-valid").html(),
    cpname         : $("#cpname").val(),
    cash           : $("#cash").val(),
    stamp          : $("#btn-stamp").html(),
    ctype          : $("#btn-ctype").html(),
    bzname         : memberInfo.bzname,
    rcn            : memberInfo.rcn,
    member         : memberInfo.name,
    date1          : $("#date1").val() + ' 00:00:00',
    date2          : $("#date2").val() + ' 23:59:59',
    status         : $('input[type=radio][name=status]:checked').val(),
    benefit        : $("#benefit").val(),
    notice         : $("#notice").val()
  }
console.log (params);
  if (params.cpcode == "")     { dynamicAlert("쿠폰코드를 입력해주세요"); return }
  if (params.valid == "0")     { dynamicAlert("사용가능한 쿠폰코드를 입력해주세요."); return }
  if (params.ctype == "선택")  { dynamicAlert("쿠폰유형을 선택해주세요."); return }
  if (params.cpname == "")     { dynamicAlert("쿠폰명을 입력해주세요."); return }
  if (params.benefit == "")    { dynamicAlert("쿠폰혜택을 입력해주세요."); return }
  if (params.notice == "")     { dynamicAlert("유의사항을 입력해주세요."); return }

  console.log (params);
  $.postJSON('/json/member/coupon/register', params).then(res => {
    admin_coupon_register_complete();
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// SEARCH
//
$(document).on('click', '#search', function (event) {
  var pageid = $('#pageid').text();
  switch(pageid) {
  case 'admin-dashboard-user'    : return admin_dashboard_user ();
  case 'admin-dashboard-member'  : return admin_dashboard_member ();
  case 'admin-member-search'     : return admin_member_search ();
  case 'admin-user-search'       : return admin_user_search ();
  case 'admin-user-join-search'  : return admin_user_join_search ();
  case 'admin-user-age-search'   : return admin_user_age_search ();
  case 'admin-user-gender-search': return admin_user_gender_search ();
  case 'admin-user-area-search'  : return admin_user_area_search ();
  case 'admin-coupon-search'     : return admin_coupon_search ();
  case 'admin-event-search'      : return admin_event_search ();
  case 'admin-notice-search'     : return admin_notice_search ();
  case 'admin-admin-search'      : return admin_admin_search ();
  case 'admin-class-search'      : return admin_class_search ();
  case 'admin-group-search'      : return admin_group_search () ;

  case 'member-dashboard-search' : return member_dashbaord_search ();
  case 'member-coupon-search'    : return member_coupon_search ();
  case 'member-stamp-search'     : return member_stamp_search ();
  case 'member-event-search'     : return member_event_search ();
  case 'member-detail-search'    : return member_detail_search ();
  }
});

$(document).on('click', '#list', function (event) {
  var pageid = $('#pageid').text();
  switch(pageid) {
  case 'admin-admin-register'  : return $(location).attr('href', '/admin/admin/search');
  case 'admin-member-register' : return $(location).attr('href', '/admin/member/search');
  case 'admin-group-register'  : return $(location).attr('href', '/admin/group/search');
  case 'admin-event-register'  : return $(location).attr('href', '/admin/event/search');
  case 'admin-class-register'  : return $(location).attr('href', '/admin/class/search');
  case 'admin-coupon-register' : return $(location).attr('href', '/admin/coupon/search');
  case 'admin-notice-register' : return $(location).attr('href', '/admin/notice/search');

  case 'member-coupon-register': return $(location).attr('href', '/member/coupon/search');
  }
});


//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-DASHBOARD-MEMBER
function admin_dashboard_member () {
  var params = {
    cond  : $("#status:checked").val(),
    date1 : $("#date1").val() + ' 00:00:00',
    date2 : $("#date2").val() + ' 23:59:59'
  }
  $.postJSON('/json/admin/dashboard/member', params).then(res => {
    console.log (res);
    html  = '<div class="table-responsive table-hover">';
    html += '<table id="dashboard-user-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    html += '<th style="text-align: center;" rowspan="2">No</th>';
    html += '<th style="text-align: center;" rowspan="2">일자</th>';
    html += '<th style="text-align: center;" colspan="17">지역</th>';
    html += '<th style="text-align: center;" rowspan="2">가입</th>';
    html += '<th style="text-align: center;" rowspan="2">해지</th>';
    html += '</tr>';
    html += '<tr>';
    html += '<th style="text-align: center;">서울</th>';
    html += '<th style="text-align: center;">전북</th>';
    html += '<th style="text-align: center;">전남</th>';
    html += '<th style="text-align: center;">강원</th>';
    html += '<th style="text-align: center;">경기</th>';
    html += '<th style="text-align: center;">경북</th>';
    html += '<th style="text-align: center;">경남</th>';
    html += '<th style="text-align: center;">광주</th>';
    html += '<th style="text-align: center;">대구</th>';
    html += '<th style="text-align: center;">부산</th>';
    html += '<th style="text-align: center;">세종</th>';
    html += '<th style="text-align: center;">울산</th>';
    html += '<th style="text-align: center;">인천</th>';
    html += '<th style="text-align: center;">제주</th>';
    html += '<th style="text-align: center;">충북</th>';
    html += '<th style="text-align: center;">충남</th>';
    html += '<th style="text-align: center;">기타</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    $.each(res, function(i, t) {
      html += '<tr>';
      html += `<td style="text-align: center;">${i}</td>`;
      html += `<td style="text-align: center;">${t.day}</td>`;
      html += `<td style="text-align: center;">${t.so}</td>`;
      html += `<td style="text-align: center;">${t.jb}</td>`;
      html += `<td style="text-align: center;">${t.jn}</td>`;
      html += `<td style="text-align: center;">${t.kw}</td>`;
      html += `<td style="text-align: center;">${t.kg}</td>`;
      html += `<td style="text-align: center;">${t.kb}</td>`;
      html += `<td style="text-align: center;">${t.kn}</td>`;
      html += `<td style="text-align: center;">${t.gj}</td>`;
      html += `<td style="text-align: center;">${t.tg}</td>`;
      html += `<td style="text-align: center;">${t.bs}</td>`;
      html += `<td style="text-align: center;">${t.sj}</td>`;
      html += `<td style="text-align: center;">${t.us}</td>`;
      html += `<td style="text-align: center;">${t.ic}</td>`;
      html += `<td style="text-align: center;">${t.jj}</td>`;
      html += `<td style="text-align: center;">${t.cb}</td>`;
      html += `<td style="text-align: center;">${t.cn}</td>`;
      html += `<td style="text-align: center;">${t.et}</td>`;
      html += `<td style="text-align: center;">${t.regi}</td>`;
      html += `<td style="text-align: center;">${t.term}</td>`;
    });
    $("#results").html(html);
    $('#dashboard-user-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      'dom': 'Bfrtip',
      //'buttons': [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
      'buttons': [ 'excel', 'print' ],
      "pageLength": pagelength
    });
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-DASHBOARD-USER
function admin_dashboard_user () {
  var params = {
    cond  : $("#status:checked").val(),
    date1 : $("#date1").val() + ' 00:00:00',
    date2 : $("#date2").val() + ' 23:59:59'
  }
  $.postJSON('/json/admin/dashboard/user', params).then(res => {
    console.log (res);
    //$("#exporttable").attr("target", "dashboard-user-table");
    //console.log($("#exporttable").attr("target"));
    html  = '<div class="table-responsive table-hover">';
    html += '<table id="dashboard-user-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    html += '<th style="text-align: center;" rowspan="2">No</th>';
    html += '<th style="text-align: center;" rowspan="2">일자</th>';
    html += '<th style="text-align: center;" colspan="2">성별</th>';
    html += '<th style="text-align: center;" rowspan="2">가입</th>';
    html += '<th style="text-align: center;" rowspan="2">해지</th>';
    html += '</tr>';
    html += '<tr>';
    html += '<th style="text-align: center;">남</th>';
    html += '<th style="text-align: center;">여</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    $.each(res, function(i, t) {
      html += '<tr>';
      html += `<td style="text-align: center;">${i}</td>`;
      html += `<td style="text-align: center;">${t.day}</td>`;
      html += `<td style="text-align: center;">${t.male}</td>`;
      html += `<td style="text-align: center;">${t.female}</td>`;
      html += `<td style="text-align: center;">${t.regi}</td>`;
      html += `<td style="text-align: center;">${t.term}</td>`;
    });
    $("#results").html(html);
    $('#dashboard-user-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      'dom': 'Bfrtip',
      //'buttons': [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
      'buttons': [ 'excel', 'print' ],
      "pageLength": pagelength
    });
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-MEMBER-SEARCH
function admin_member_search () {
  var params = {
    rcn   : ($("#rcn").val() == "")? "all": '%' + $("#rcn").val() +'%',
    stat  : ($("#stat").text() == "전체")? "all":$("#stat").text(),
    area1 : ($("#btn-area1").html() == "전체")? "all":$("#btn-area1").html(),
    area2 : ($("#btn-area2").html() == "전체")? "all":$("#btn-area2").html(),
    date1 : $("#date1").val() + ' 00:00:00',
    date2 : $("#date2").val() + ' 23:59:59'
  }
  $.postJSON('/json/admin/member/search', params).then(res => {
    html = '<div class="table-responsive table-hover">';
    html += '<table id="admin-member-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    if (width > shrink)
    html += '<th style="text-align: center;">No</th>';
    html += '<th style="text-align: center;">사업자번호</th>';
    html += '<th style="text-align: center;"></th>';
    html += '<th style="text-align: center;">가맹점상호</th>';
    html += '<th style="text-align: center;"></th>';
    if (width > shrink)
    html += '<th style="text-align: center;">상태</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">전화번호</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">수정</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">수정일</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">등록자</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">등록일</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    $.each(res, function(i, t) {
      html += '<tr>';
      if (width > shrink)
      html += `<td style="text-align: center;"><div class="ropa">${i}</div></td>`;
      html += `<td style="text-align: center;"><a id="member-detail"  modal-id="${t.id}" href="javascript:void(0);" data-toggle="tooltip" title="가맹점상세정보 (${t.name})"><div class="ropa">${t.rcn}</div></a></td>`;
      html += `<td style="text-align: center;"><a id="member-history" modal-id="${t.id}" href="javascript:void(0);" data-toggle="tooltip" title="가맹점이력조회 (${t.name})"><i class="fas fa-history fa-sm"></i></a></td>`;
      html += `<td style="text-align: center;"><a id="member-detail"  modal-id="${t.id}" href="javascript:void(0);" data-toggle="tooltip" title="가맹점상세정보 (${t.name})">${t.name}</a></td>`;
      html += `<td style="text-align: center;"><a id="member-goto"    modal-id="${t.id}" href="/member/${t.id}" data-toggle="tooltip" title="가맹점관리 (${t.name})"><i class="fas fa-sliders-h fa-sm"></i></a></td>`;
      if (width > shrink)
      html += `<td style="text-align: center;">${t.status}</td>`;
      if (width > shrink)
      html += `<td style="text-align: center;"><div class="ropa"><a href="tel:${t.phone}">${t.phone}</a></div></td>`;
      if (width > shrink)
      html += `<td style="text-align: center;">${t.updater}</td>`;
      if (width > shrink)
      html += `<td style="text-align: center;"><div class="ropa">${moment(t.updated).format('YYYY-MM-DD HH:mm:ss')}</div></td>`;
      if (width > shrink)
      html += `<td style="text-align: center;">${t.register}</td>`;
      if (width > shrink)
      html += `<td style="text-align: center;"><div class="ropa">${moment(t.registered).format('YYYY-MM-DD HH:mm:ss')}</div></td>`;
    });
    $("#results").html(html);
    $('#admin-member-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      "pageLength": pagelength
    });
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-USER-SEARCH
function admin_user_search () {
  var params = {
    email : ($("#email").val() == "")? "all": '%' + $("#email").val() +'%',
    os    : ($("#btn-os").html() == "전체")? "all":$("#btn-os").html(),
    gender: ($("#btn-gender").html() == "전체")? "all":$("#btn-gender").html(),
    age   : ($("#btn-age").html() == "전체")? "all":$("#btn-age").html().replace(/대/gi,''),
    area1 : ($("#btn-area1").html() == "전체")? "all":$("#btn-area1").html(),
    area2 : ($("#btn-area2").html() == "전체")? "all":$("#btn-area2").html(),
    date1 : $("#date1").val() + ' 00:00:00',
    date2 : $("#date2").val() + ' 23:59:59'
  }
  $.postJSON('/json/admin/user/search', params).then(data => {
    html = '<div class="table-responsive">';
    html += '<table id="admin-member-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    html += '<th style="text-align: center;">No</th>';
    html += '<th style="text-align: center;">사용자ID</th>';
    html += '<th style="text-align: center;"></th>';
    html += '<th style="text-align: center;">운영체제</th>';
    html += '<th style="text-align: center;">연령대</th>';
    html += '<th style="text-align: center;">성별</th>';
    html += '<th style="text-align: center;">지역</th>';
    html += '<th style="text-align: center;">시군구</th>';
    html += '<th style="text-align: center;">수정자</th>';
    html += '<th style="text-align: center;">수정일</th>';
    html += '<th style="text-align: center;">등록일</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    $.each(data, function(i, t) {
      t.age      = (t.age == null)? "":t.age;
      t.updater  = (t.updater == null)? "":t.updater;
      t.register = (t.register == null)? "":t.register;
      html += '<tr>';
      html += `<td style="text-align: center;"><div class="ropa">${i}</div></td>`;
      html += `<td style="text-align: left;">  <a id="user-detail"  modal-id="${t.id}" href="javascript:void(0);"><div class="ropa">${t.email}</div></a></td>`;
      html += `<td style="text-align: center;"><a id="user-history" modal-id="${t.id}" href="javascript:void(0);"><i class="fas fa-history fa-sm"></i></a></td>`;
      html += `<td style="text-align: center;">${t.os}</td>`;
      html += `<td style="text-align: center;">${t.age}</td>`;
      html += `<td style="text-align: center;"><div class="ropa">${t.gender}</div></td>`;
      html += `<td style="text-align: center;"><div class="ropa">${t.area1}</div></td>`;
      html += `<td style="text-align: center;"><div class="ropa">${t.area2}</div></td>`;
      html += `<td style="text-align: center;">${t.updater}</td>`;
      html += `<td style="text-align: center;"><div class="ropa">${moment(t.updated).format('YYYY-MM-DD HH:mm:ss')}</div></td>`;
      html += `<td style="text-align: center;"><div class="ropa">${moment(t.registered).format('YYYY-MM-DD HH:mm:ss')}</div></td>`;
    });
    $("#results").html(html);
    $('#admin-member-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      "pageLength": pagelength
    });
  });
}


//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-COUPON-SEARCH
function admin_coupon_search () {
  var params = {
    name  : ($("#name").val() == "")? "all": $("#name").val(),
    stat  : ($("#stat").text() == "전체")? "all":$("#stat").text(),
    date1 : $("#date1").val() + ' 00:00:00',
    date2 : $("#date2").val() + ' 23:59:59'
  }
  $.postJSON('/json/admin/coupon/search', params).then(data => {
    html = '<div class="table-responsive">';
    html += '<table id="admin-member-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    if (width > shrink) 
    html += '<th style="text-align: center;">No</th>';
    html += '<th style="text-align: center;">쿠폰종류</th>';
    html += '<th style="text-align: center;">쿠폰명</th>';
    html += '<th style="text-align: center;"></th>';
    html += '<th style="text-align: center;">상태</th>';
    if (width > shrink) 
    html += '<th style="text-align: center;">수정자</th>';
    if (width > shrink) 
    html += '<th style="text-align: center;">수정일</th>';
    if (width > shrink) 
    html += '<th style="text-align: center;">등록자</th>';
    if (width > shrink) 
    html += '<th style="text-align: center;">등록일</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    $.each(data, function(i, t) {
      html += '<tr>';
      if (width > shrink) 
      html += `<td style="text-align: center;">${i}</td>`;
      html += `<td style="text-align: left;">${t.ctype}</td>`;
      html += `<td style="text-align: left;"><a id="coupon-detail" modal-id="${t.id}" href="javascript:void(0);">${t.name}</a></td>`;
      html += `<td style="text-align: center;"><a id="coupon-history" modal-id="${t.id}" href="javascript:void(0);"><i class="fas fa-history fa-sm"></i></a></td>`;
      html += `<td style="text-align: center;">${t.status}</td>`;
      if (width > shrink) 
      html += `<td style="text-align: center;">${t.updater}</td>`;
      if (width > shrink) 
      html += `<td style="text-align: center;">${moment(t.updated).format('YYYY-MM-DD HH:mm:ss')}</td>`;
      if (width > shrink) 
      html += `<td style="text-align: center;">${t.register}</td>`;
      if (width > shrink) 
      html += `<td style="text-align: center;">${moment(t.registered).format('YYYY-MM-DD HH:mm:ss')}</td>`;
    });
    $("#results").html(html);
    $('#admin-member-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      "pageLength": pagelength
    });
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-EVENT-SEARCH
function admin_event_search () {
  var params = {
    status: ($("#btn-status").html() == "전체")? "all": $("#btn-status").html(),
    coupon: ($("#btn-coupon").html() == "전체")? "all": $("#btn-coupon").html(),
    date1 : $("#date1").val() + " 00:00:00",
    date2 : $("#date2").val() + " 23:59:59",
  }

  $.postJSON('/json/admin/event/search', params).then(res => {
    console.log (res)
    html = '<div class="table-responsive">';
    html += '<table id="admin-member-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    if (width > shrink)
    html += '<th style="text-align: center;">No</th>';
    html += '<th style="text-align: center;">이벤트명</th>';
    html += '<th style="text-align: center;">상태</th>';
    html += '<th style="text-align: center;">공지/광고</th>';
    html += '<th style="text-align: center;">메인</th>';
    html += '<th style="text-align: center;">이벤트</th>';
    html += '<th style="text-align: center;">쿠폰</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">수정자</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">수정일</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">등록자</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">등록일</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    $.each(res, function(i, t) {
      var fnotice = (t.fnotice)? 'Y':'N';
      var fmain   = (t.fmain)? 'Y':'N';
      var fevent  = (t.fevent)? 'Y':'N';
      html += '<tr>';
      if (width > shrink)
      html += `<td style="text-align: center;">${i}</td>`;
      html += `<td style="text-align: left;"><a id="event-detail" modal-id="${t.id}" href="javascript:void(0);">${t.title}</a></td>`;
      html += `<td style="text-align: center;">${t.status}</td>`;
      html += `<td style="text-align: center;">${fnotice}</td>`;
      html += `<td style="text-align: center;">${fmain}</td>`;
      html += `<td style="text-align: center;">${fevent}</td>`;
      html += `<td style="text-align: center;">${t.coupon}</td>`;
      if (width > shrink)
      html += `<td style="text-align: center;">${t.updater}</td>`;
      if (width > shrink)
      html += `<td style="text-align: center;">${moment(t.updated).format('YYYY-MM-DD HH:mm:ss')}</td>`;
      if (width > shrink)
      html += `<td style="text-align: center;">${t.register}</td>`;
      if (width > shrink)
      html += `<td style="text-align: center;">${moment(t.registered).format('YYYY-MM-DD HH:mm:ss')}</td>`;
    });
    $("#results").html(html);
    $('#admin-member-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      "pageLength": pagelength
    });
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-NOTICE-SEARCH
function admin_notice_search () {
  var params = {
    title  : ($("#title").val() == "")? "all": $("#title").val(),
    date1 : $("#date1").val() + " 00:00:00",
    date2 : $("#date2").val() + " 23:59:59",
    gender: ($("#gender").text() == "전체")? "all": $("#gender").text(),
    age   : ($("#age").text() == "전체")? "all": $("#age").text(),
    area1 : ($("#btn-area1").html() == "전체")? "all":$("#btn-area1").html(),
    area2 : ($("#btn-area2").html() == "전체")? "all":$("#btn-area2").html(),
  }

  $.postJSON('/json/admin/notice/search', params).then(res => {
    html = '<div class="table-responsive">';
    html += '<table id="admin-member-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    if (width > shrink)
    html += '<th style="text-align: center;">No</th>';
    html += '<th style="text-align: center;">제목</th>';
      if (width > shrink)
    html += '<th style="text-align: center;">성별</th>';
      if (width > shrink)
    html += '<th style="text-align: center;">나이</th>';
      if (width > shrink)
    html += '<th style="text-align: center;">지역</th>';
    html += '<th style="text-align: center;">시작</th>';
    html += '<th style="text-align: center;">종료</th>';
    html += '<th style="text-align: center;">조회수</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">수정자</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">수정일</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">등록자</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">등록일</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    $.each(res, function(i, t) {
      html += '<tr>';
      if (width > shrink)
      html += `<td style="text-align: center;">${i}</td>`;
      html += `<td style="text-align: left;"><a id="notice-detail" modal-id="${t.id}" href="javascript:void(0);">${t.title}</a></td>`;
      if (width > shrink)
      html += `<td style="text-align: left;">${t.gender}</td>`;
      if (width > shrink)
      html += `<td style="text-align: left;">${t.age}</td>`;
      if (width > shrink)
      html += `<td style="text-align: left;">${t.area1}</td>`;
      html += `<td style="text-align: center;">${moment(t.date1).format('YYYY-MM-DD')}</td>`;
      html += `<td style="text-align: center;">${moment(t.date2).format('YYYY-MM-DD')}</td>`;
      html += `<td style="text-align: center;">${t.views}</td>`;
      if (width > shrink)
      html += `<td style="text-align: center;">${t.updater}</td>`;
      if (width > shrink)
      html += `<td style="text-align: center;">${moment(t.updated).format('YYYY-MM-DD HH:mm:ss')}</td>`;
      if (width > shrink)
      html += `<td style="text-align: center;">${t.register}</td>`;
      if (width > shrink)
      html += `<td style="text-align: center;">${moment(t.registered).format('YYYY-MM-DD HH:mm:ss')}</td>`;
    });
    $("#results").html(html);
    $('#admin-member-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      "pageLength": pagelength
    });
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-ADMIN-SEARCH
function admin_admin_search () {
  var params = {
    name  : ($("#name").val() == "")? "all": $("#name").val(),
    grade : ($("#grade").text() == "전체")? "all": $("#grade").text(),
    stat  : ($("#stat").text() == "전체")? "all": $("#stat").text(),
    date1 : $("#date1").val() + " 00:00:00",
    date2 : $("#date2").val() + " 23:59:59"
  }

  $.postJSON('/json/admin/admin/search', params).then(res => {
    html = '<div class="table-responsive">';
    html += '<table id="admin-member-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    if (width > shrink)
    html += '<th style="text-align: center;">No</th>';
    html += '<th style="text-align: center;">ID</th>';
    html += '<th style="text-align: center;">이름</th>';
    html += '<th style="text-align: center;">권한</th>';
    html += '<th style="text-align: center;">상태</th>';
    html += '<th style="text-align: center;">최종수정자</th>';
    html += '<th style="text-align: center;">수정일</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">등록자</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">등록일</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    $.each(res, function(i, t) {
      html += '<tr>';
      if (width > shrink)
      html += `<td style="text-align: center;">${i}</td>`;
      html += `<td style="text-align: left;"><a id="admin-detail" modal-id="${t.id}" href="javascript:void(0);">${t.email}</a></td>`;
      html += `<td style="text-align: left;"><a id="admin-detail" modal-id="${t.id}" href="javascript:void(0);">${t.name}</a></td>`;
      html += `<td style="text-align: left;">${t.grade}</td>`;
      html += `<td style="text-align: left;">${t.status}</td>`;
      html += `<td style="text-align: center;">${t.updater}</td>`;
      html += `<td style="text-align: center;">${moment(t.updated).format('YYYY-MM-DD HH:mm:ss')}</td>`;
      if (width > shrink)
      html += `<td style="text-align: center;">${t.register}</td>`;
      if (width > shrink)
      html += `<td style="text-align: center;">${moment(t.registered).format('YYYY-MM-DD HH:mm:ss')}</td>`;
    });
    $("#results").html(html);
    $('#admin-member-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      "pageLength": pagelength
    });
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-CLASS-SEARCH
function admin_class_search () {
  var params = {
    date1 :  $("#date1").val() + " 00:00:00",
    date2 :  $("#date2").val() + " 23:59:59",
    bizname: ($("#bizname").text() == "")? "all": $("#bizname").val()
  }

  $.postJSON('/json/admin/class/search', params).then(res => {
console.log (res);
    html = '<div class="table-responsive">';
    html += '<table id="admin-member-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    html += '<th style="text-align: center;">No</th>';
    html += '<th style="text-align: center;">업종명</th>';
    html += '<th style="text-align: center;">아이콘</th>';
    html += '<th style="text-align: center;">수정자</th>';
    html += '<th style="text-align: center;">수정일</th>';
    html += '<th style="text-align: center;">등록자</th>';
    html += '<th style="text-align: center;">등록일</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    $.each(res, function(i, t) {
      html += '<tr>';
      html += `<td style="text-align: center;">${i}</td>`;
      html += `<td style="text-align: left;"><a id="class-detail" modal-id="${t.id}" href="javascript:void(0);">${t.name}</a></td>`;
      html += `<td style="text-align: left;"><img src='https://tric.kr${t.icon_path}.png'></td>`;
      html += `<td style="text-align: center;">${t.updater}</td>`;
      html += `<td style="text-align: center;">${moment(t.updated).format('YYYY-MM-DD HH:mm:ss')}</td>`;
      html += `<td style="text-align: center;">${t.register}</td>`;
      html += `<td style="text-align: center;">${moment(t.registered).format('YYYY-MM-DD HH:mm:ss')}</td>`;
    });
    $("#results").html(html);
    $('#admin-member-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      "pageLength": pagelength
    });
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-GROUP-SEARCH
function admin_group_search () {
  var params = {
    name  : ($("#name").val() == "")? "all": $("#name").val(),
    date1 : $("#date1").val(),
    date2 : $("#date2").val()
  }
  $.postJSON('/json/group/search', params).then(res => {
    html = '<div class="table-responsive">';
    html += '<table id="admin-member-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    if (width > shrink)
    html += '<th style="text-align: center;">No</th>';
    html += '<th style="text-align: center;">권한그룹명</th>';
    html += '<th style="text-align: center;">분류</th>';
    html += '<th style="text-align: center;">수정</th>';
    html += '<th style="text-align: center;">수정일</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">등록자</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">등록일</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    $.each(res, function(i, t) {
      html += '<tr>';
      if (width > shrink)
      html += `<td style="text-align: center;">${i}</td>`;
      html += `<td style="text-align: left;">${t.group_name}</td>`;
      html += `<td style="text-align: left;">${t.group_type}</td>`;
      html += `<td style="text-align: center;">${t.updater}</td>`;
      html += `<td style="text-align: center;">${moment(t.updated).format('YYYY-MM-DD HH:mm:ss')}</td>`;
      if (width > shrink)
      html += `<td style="text-align: center;">${t.register}</td>`;
      if (width > shrink)
      html += `<td style="text-align: center;">${moment(t.registered).format('YYYY-MM-DD HH:mm:ss')}</td>`;
    });
    $("#results").html(html);
    $('#admin-member-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      "pageLength": pagelength
    });
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// UPDATE
//
$(document).on('click', '#update', function (event) {
  var pageid = $('#pageid').text();
  switch(pageid) {
  case 'member-stamp-search' : return member_stamp_update ();
  case 'member-event-search' : return member_event_update ();
  case 'member-detail-search': return member_detail_update ();
  }
});

function member_stamp_update () {
  var params = {
    rcn:       memberInfo.rcn,
    status:    $('input[type=radio][name=status]:checked').val(),
    stamp:     $("#btn-stamp").html(),
    limits:    $("#limits").val(),
    overagain: $("#btn-overagain").html(),
    benefit:   $("#benefit").val(),
    notice:    $("#notice").val()
  }
  if (params.limits == "") { dynamicAlert("적립조건을 입력해주세요"); return; }
  if (params.notice == "") { dynamicAlert("유의사항을 입력해주세요"); return; }

  $.postJSON('/json/member/stamp/update', params).then(res => {
    console.log (res);
  });
}

function member_event_update () {
console.log(memberInfo);
  var id           = memberInfo.id;
  var rcn          = memberInfo.rcn;
  var leaflet      = memberInfo.leaflet;
  var leaflet_sub1 = (memberInfo.leaflet_sub1 == null)? "": memberInfo.leaflet_sub1;
  var leaflet_sub2 = (memberInfo.leaflet_sub2 == null)? "": memberInfo.leaflet_sub2;
  var leaflet_sub3 = (memberInfo.leaflet_sub3 == null)? "": memberInfo.leaflet_sub3;

  var formData = new FormData();
  formData.append('id',  id);
  formData.append('rcn', rcn);
  formData.append('leaflet'     , leaflet);
  formData.append('leaflet_sub1', leaflet_sub1);
  formData.append('leaflet_sub2', leaflet_sub2);
  formData.append('leaflet_sub3', leaflet_sub3);
  formData.append('file1',  $('#file1')[0].files[0]);
  formData.append('file2',  $('#file2')[0].files[0]);
  formData.append('file3',  $('#file3')[0].files[0]);
  formData.append('file4',  $('#file4')[0].files[0]);
  formData.append('file5',  $('#file5')[0].files[0]);
  formData.append('file6',  $('#file6')[0].files[0]);
  formData.append('file7',  $('#file7')[0].files[0]);
  formData.append('file8',  $('#file8')[0].files[0]);
  formData.append('file9',  $('#file9')[0].files[0]);
  formData.append('file10', $('#file10')[0].files[0]);
  formData.append('file11', $('#file11')[0].files[0]);
  formData.append('file12', $('#file12')[0].files[0]);
  $.postFORM ('/json/member/event/update', formData);
}

function member_detail_update () {
  var id         = memberInfo.id;
  var rcn        = memberInfo.rcn;
  var logo       = memberInfo.logo;
  var intro      = $("#intro").val() ;
  var offduty1   = $("#btn-offduty1").html() ;
  var offduty2   = $("#btn-offduty2").html() ;
  var opentime   = $("#opentime").val() ;
  var closetime  = $("#closetime").val() ;
  var resp_name  = $("#resp-name").val() ;
  var resp_phone = $("#resp-phone").val() ;
  var resp_email = $("#resp-email").val() ;

  var formData = new FormData();
  formData.append('id',        id);
  formData.append('rcn',       rcn);
  formData.append('logo',      logo);
  formData.append('file1',     $('#file1')[0].files[0]);
  formData.append('file2',     $('#file2')[0].files[0]);
  formData.append('file3',     $('#file3')[0].files[0]);
  formData.append('intro',     intro);
  formData.append('offduty1',  offduty1);
  formData.append('offduty2',  offduty2);
  formData.append('opentime',  opentime);
  formData.append('closetime', closetime);
  formData.append('resp_name', resp_name);
  formData.append('resp_phone', resp_phone);
  formData.append('resp_email', resp_email);
  $.postFORM ('/json/member/detail/update', formData);
  dynamicAlert("가맹점 상세정보를 수정했습니다");
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// DELETE
//
$(document).on('click', '#delete', function (event) {
  var pageid = $('#pageid').text();
  switch(pageid) {
  case 'member-detail-search' : return member_detail_delete ();
  }
});

function member_detail_delete () {
  var params = {
    rcn:        memberInfo.rcn
  }
  $.postJSON('/json/member/detail/delete', params).then(res => {
    console.log(res);
    dynamicAlert("가맹점정보를 해지했습니다");
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// MODAL-UPDATE
//
$(document).on('click', '#m-update', function (event) {
  var pageid = $('#pageid').text();
  switch(pageid) {
  case 'admin-member-search'  : return admin_member_update ();
  case 'admin-user-search'    : return admin_user_update   ();
  case 'admin-coupon-search'  : return admin_coupon_update ();
  case 'admin-event-search'   : return admin_event_update  ();
  case 'admin-notice-search'  : return admin_notice_update ();
  case 'admin-admin-search'   : return admin_admin_update  ();
  case 'admin-class-search'   : return admin_class_update  ();
  case 'admin-group-search'   : return;

  case 'member-coupon-search' : return member_coupon_update ();
  }
});

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-MEMBER-UPDATE

function admin_member_update () {
  console.log (modal_member);
  var params = {
    id:        modal_member.id,
    updater:   userInfo.name,
    name:      $("#m-name").val(),
    owner:     $("#m-owner").val(),
    bzcond:    $("#m-bzcond").val(),
    bztype:    $("#m-bztype").val(),
    bzname:    $("#btn-m-bzname").html(),
    phone:     $("#m-phone").val(),
    date1:     $("#m-date1").val() + ' 00:00:00',
    area1:     $("#btn-m-area1").html(),
    area2:     $("#btn-m-area2").html(),
    addr:      $("#addr").val(),
    lat:       $("#lat").val(),
    lng:       $("#lng").val()
  }
  console.log (params);
  if (params.name == "") {dynamicAlert("가맹점 상호명을 입력해주세요"); return; }
  if (params.bzname == "선택") {dynamicAlert("업종 분류코드를 선택해주세요"); return; }
  if (params.phone == "") {dynamicAlert("연락처를 입력해주세요"); return; }
  if (params.area1 == "선택" || params.area2 == "선택") {dynamicAlert("지역을 선택해주세요"); return; }
  if (params.addr == "") { dynamicAlert("주소를 입력해주세요"); return; }
  if (params.date1 == "") {dynamicAlert("유효기간을 입력해주세요"); return; }
  if (params.date2 == "") {dynamicAlert("유효기간을 입력해주세요"); return; }

  $.postJSON('/json/admin/member/update', params).then(res => {
    console.log(res);
    if(params.name   != modal_member.name) logAdminMember(modal_member.name, modal_member.rcn, "", userInfo.name, getCur(), "수정", "가맹점", `상호명변경: ${modal_member.name} => ${params.name}`);
    if(params.owner  != modal_member.owner) logAdminMember(modal_member.name, modal_member.rcn, "", userInfo.name, getCur(), "수정", "가맹점", `대표자명변경: ${modal_member.owner} => ${params.owner}`);
    if(params.bzname != modal_member.bzname) logAdminMember(modal_member.name, modal_member.rcn, "", userInfo.name, getCur(), "수정", "가맹점", `업종명변경: ${modal_member.bzname} => ${params.bzname}`);
    if(params.phone  != modal_member.phone) logAdminMember(modal_member.name, modal_member.rcn, "", userInfo.name, getCur(), "수정", "가맹점", `연락처변경: ${modal_member.phone} => ${params.phone}`);
    if(params.area1  != modal_member.area1) logAdminMember(modal_member.name, modal_member.rcn, "", userInfo.name, getCur(), "수정", "가맹점", `지역1변경: ${modal_member.area1} => ${params.area1}`);
    if(params.area2  != modal_member.area2) logAdminMember(modal_member.name, modal_member.rcn, "", userInfo.name, getCur(), "수정", "가맹점", `지역2변경: ${modal_member.area2} => ${params.area2}`);
    dynamicAlert("가맹점정보가 정상적으로 변경되었습니다"); 
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-USER-UPDATE

function getCur() {
  return moment().format("YYYY-MM-DD HH:mm:ss")
}

function admin_user_update () {
  console.log (modal_user);
  var params = {
    id:        modal_user.id,
    updater:   userInfo.name,
    status:    $(':radio[name=m-status]').filter(':checked').val(),
    gender:    $("#btn-m-gender").html(),
    date1:     $("#m-date1").val(),
    area1:     $("#btn-m-area1").html(),
    area2:     $("#btn-m-area2").html()
  }
  console.log (params);
  if (params.date1 == "")     {dynamicAlert("생년월일을 입력해주세요"); return; }
  if (params.area2 == "선택") {dynamicAlert("지역을 선택주세요"); return; }

  $.postJSON('/json/admin/user/update', params).then(res => {
    console.log(res);
    var date1 =  modal_user.birth_year + '-' +  modal_user.birth_month + '-' +  modal_user.birth_day;
    if(params.status != modal_user.status) logAdminUser(modal_user.email, userInfo.name, getCur(), "수정", "프로필",     `상태: ${modal_user.status} => ${params.status}`);
    if(params.area1  != modal_user.area1)  logAdminUser(modal_user.email, userInfo.name, getCur(), "수정", "프로필",    `지역1: ${modal_user.area1} => ${params.area1}`);
    if(params.area2  != modal_user.area2)  logAdminUser(modal_user.email, userInfo.name, getCur(), "수정", "프로필",    `지역2: ${modal_user.area2} => ${params.area2}`);
    if(params.gender != modal_user.gender) logAdminUser(modal_user.email, userInfo.name, getCur(), "수정", "프로필",     `성별: ${modal_user.gender} => ${params.gender}`);
    if(params.date1  != date1)             logAdminUser(modal_user.email, userInfo.name, getCur(), "수정", "프로필", `생년월일: ${date1} => ${params.date1}`);
    dynamicAlert("사용자정보가 정상적으로 변경되었습니다");
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-COUPON-UPDATE

function admin_coupon_update () {
  console.log (modal_coupon);
  var params = {
    id:        modal_coupon.id,
    updater:   userInfo.name,
    name:      $("#m-name").val(),
    status:    $(':radio[name=m-status]').filter(':checked').val(),
    date1:     $("#m-date1").val() + ' 00:00:00',
    date2:     $("#m-date2").val() + ' 23:59:59',
    addr:      $("#addr").val(),
    benefit:   $("#m-benefit").val(),
    notice:    $("#m-notice").val()
  }
  console.log (params);
  if (params.name == "") {dynamicAlert("쿠폰명을 입력해주세요"); return; }
  if (params.date1 == "") {dynamicAlert("유효기간을 입력해주세요"); return; }
  if (params.date2 == "") {dynamicAlert("유효기간을 입력해주세요"); return; }
  if (params.benefit == "") { dynamicAlert("혜택을 입력해주세요"); return; }
  if (params.notice == "") { dynamicAlert("유의사항을 입력해주세요"); return; }

  $.postJSON('/json/admin/coupon/update', params).then(res => {
    console.log(res);
    dynamicAlert("쿠폰정보가 정상적으로 변경되었습니다");
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-EVENT-UPDATE

function admin_event_update () {
  console.log (modal_event);

  var id      = modal_event.id;
  var updater = userInfo.name;
  var title   = $("#m-title").val();
  var status  = $("input[name='m-status']:checked").val();
  var fweight = $("#btn-m-fweight").html();
  var fnotice = ($("#fnotice").is(":checked"))? 1 : 0
  var fmain   = ($("#fmain").is(":checked"))?   1 : 0
  var fevent  = ($("#fevent").is(":checked"))?  1 : 0
  var gender  = $("#btn-m-gender").html();
  var age     = $("#btn-m-age").html();
  var area1   = $("#btn-m-area1").html();
  var area2   = $("#btn-m-area2").html();
  var date1   = $("#m-date1").val() + " 00:00:00";
  var date2   = $("#m-date2").val() + " 23:59:59";
  var event   = modal_event.event;
  var main    = modal_event.main;
  var detail  = modal_event.detail;
  var rgb1    = $("#m-rgb1").val();
  var rgb2    = $("#m-rgb2").val();
  var coupon  = ($("#m-btn-admin-coupon1").html() == "선택")? "무":"유";
  var date3   = $("#m-validity1").html();
  var date4   = $("#m-validity2").html();

  if (title   == "") { dynamicAlert("이벤트명을 입력해주세요.");                  return }
  //if (rgb1    == "") { dynamicAlert("상단 네비게이션 컬러를 지정해주세요.");      return }
  //if (rgb2    == "") { dynamicAlert("하단 네비게이션 컬러를 지정해주세요.");      return }

  var formData = new FormData();
  formData.append('id',      id);
  formData.append('updater', updater);
  formData.append('title',   title);
  formData.append('status',  status);
  formData.append('fweight', fweight);
  formData.append('fnotice', fnotice);
  formData.append('fmain',   fmain);
  formData.append('fevent',  fevent);
  formData.append('gender',  gender);
  formData.append('age',     age);
  formData.append('area1',   area1);
  formData.append('area2',   area2);
  formData.append('date1',   date1);
  formData.append('date2',   date2);
  formData.append('event',   event);
  formData.append('file1',   $('#file1')[0].files[0]);
  formData.append('file2',   $('#file2')[0].files[0]);
  formData.append('file3',   $('#file3')[0].files[0]);
  formData.append('main',    main);
  formData.append('file4',   $('#file4')[0].files[0]);
  formData.append('file5',   $('#file5')[0].files[0]);
  formData.append('file6',   $('#file6')[0].files[0]);
  formData.append('detail',  detail);
  formData.append('file7',   $('#file7')[0].files[0]);
  formData.append('file8',   $('#file8')[0].files[0]);
  formData.append('file9',   $('#file9')[0].files[0]);
  formData.append('rgb1',    rgb1);
  formData.append('rgb2',    rgb2);
  formData.append('coupon',  coupon);
  formData.append('date3',   date3);
  formData.append('date4',   date4);
  $.postFORM ('/json/admin/event/update', formData);
  dynamicAlert("이벤트정보가 정상적으로 변경되었습니다");
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-NOTICE-UPDATE

function admin_notice_update () {
  console.log (modal_notice);

  var id     = modal_notice.id;
  var updater= userInfo.name;
  var title  = $("#m-title").val();
  var gender = $("#btn-m-gender").html();
  var age    = $("#btn-m-age").html();
  var area1  = $("#btn-m-area1").html();
  var area2  = $("#btn-m-area2").html();
  var date1  = $("#m-date1").val() + " 00:00:00";
  var date2  = $("#m-date2").val() + " 23:59:59";
  var notice = $("#m-notice").val();
  var detail = modal_notice.detail;
  console.log ("file1", file1);
  console.log ("file2", file2);
  console.log ("file3", file3);
  if (title   == "") { dynamicAlert("공지사항제목을 입력해주세요.");   return }
  if (notice  == "") { dynamicAlert("공지사항 내용을 입력해주세요."); return }

  var formData = new FormData();
  formData.append('id',     id);
  formData.append('title',  title);
  formData.append('gender', gender);
  formData.append('age',    age);
  formData.append('area1',  area1);
  formData.append('area2',  area2);
  formData.append('date1',  date1);
  formData.append('date2',  date2);
  formData.append('notice', notice);
  formData.append('detail', detail);
  formData.append('file1', $('#file1')[0].files[0]);
  formData.append('file2', $('#file2')[0].files[0]);
  formData.append('file3', $('#file3')[0].files[0]);
  $.postFORM ('/json/admin/notice/update', formData);
  dynamicAlert("공지사항 정보가 정상적으로 변경되었습니다");
}

//////////////////////////////////////////////////////////////////////////////////////////
// ADMIN-ADMIN-UPDATE

function admin_admin_update () {
  console.log (modal_admin);

  var params = {
    id      : modal_admin.id,
    updater : userInfo.name,
    email   : $("#m-email").val(),
    name    : $("#m-name").val(),
    mobile1 : $("#m-mobile1").val(),
    mobile2 : $("#m-mobile2").val(),
    mobile3 : $("#m-mobile3").val(),
    phone1  : $("#m-phone1").val(),
    phone2  : $("#m-phone2").val(),
    phone3  : $("#m-phone3").val(),
    grade   : $("#btn-m-grade").html(),
    status  : $("input[name='m-status']:checked").val()
  }
  params.mobile = `${params.mobile1}-${params.mobile2}-${params.mobile3}`;
  params.phone  = `${params.phone1}-${params.phone2}-${params.phone3}`;
  params.phone = (params.phone == "--")? "" : params.phone;

  if (params.name   == "")   { dynamicAlert("관리자이름을 입력해주세요.");  return }
  if (params.mobile1 == "" || params.mobile2 == "" || params.mobile3 == "") { dynamicAlert("휴대폰 번호를 입력해주세요."); return }

  $.postJSON('/json/admin/admin/update', params).then(res => {
    console.log(res);
    dynamicAlert("관리자정보가 정상적으로 변경되었습니다");
  });
}

function admin_class_update () {
  console.log (modal_class);

  var id      = modal_class.id;
  var updater = userInfo.name;
  var icon    = modal_class.icon_path;
  var name    = $("#m-name").val();

  if (name == "") { dynamicAlert("업종명을 입력해주세요.");                  return }

  var formData = new FormData();
  formData.append('id',      id);
  formData.append('name',    name);
  formData.append('updater', updater);
  formData.append('icon',    icon);
  formData.append('file1',   $('#file1')[0].files[0]);
  formData.append('file2',   $('#file2')[0].files[0]);
  formData.append('file3',   $('#file3')[0].files[0]);
  $.postFORM ('/json/admin/class/update', formData);
  dynamicAlert("업종명이 정상적으로 변경되었습니다");
}


//////////////////////////////////////////////////////////////////////////////////////////
// MEMBER-COUPON-UPDATE

function member_coupon_update () {
  var params = {
    id     : $("#m-id").val(),
    updater: userInfo.name,
    status : $("input[name='m-status']:checked").val()
  }
  $.postJSON('/json/member/coupon/update/status', params).then(res => {
    console.log(res);
    dynamicAlert("쿠폰정보가 정상적으로 변경되었습니다");
  });

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// MODAL-PASSWD-UPDATE
//

$(document).on('click', '#m-passwd-update', function (event) {
  var pageid = $('#pageid').text();
  switch(pageid) {
  case 'admin-member-search'  : return admin_member_password_update ();
  case 'admin-user-search'    : return admin_user_password_update   ();
  case 'admin-coupon-search'  : return;
  case 'admin-event-search'   : return;
  case 'admin-notice-search'  : return;
  case 'admin-admin-search'   : return admin_admin_password_update  ();
  case 'admin-class-search'   : return;
  case 'admin-group-search'   : return;
  }
});

function admin_member_password_update () {
  console.log (modal_member);
  var params = {
    id     :   modal_member.id,
    passwd1:   $("#m-password1").val(),
    passwd2:   $("#m-password1").val()
  }
  console.log (params);
  if (params.passwd1 == "") {dynamicAlert("패스워드를 입력해주세요"); return; }
  if (params.passwd2 == "") {dynamicAlert("패스워드를 재입력해주세요"); return; }
  if (params.passwd1 != params.passwd2) {dynamicAlert("패스워드가 상이합니다."); return; }

  $.postJSON('/json/admin/member/update/passwd/', params).then(res => {
    console.log(res);
    logAdminMember(modal_member.name, modal_member.rcn, "", userInfo.name, getCur(), "수정", "가맹점", "패스워드");
    dynamicAlert("패스워드가 정상적으로 변경되었습니다"); 
  });
}

function admin_user_password_update () {
  console.log (modal_user);
  var params = {
    id     :   modal_user.id,
    passwd1:   $("#m-password1").val(),
    passwd2:   $("#m-password1").val()
  }
  console.log (params);
  if (params.passwd1 == "") {dynamicAlert("패스워드를 입력해주세요"); return; }
  if (params.passwd2 == "") {dynamicAlert("패스워드를 재입력해주세요"); return; }
  if (params.passwd1 != params.passwd2) {dynamicAlert("패스워드가 상이합니다."); return; }

  $.postJSON('/json/admin/user/update/passwd/', params).then(res => {
    logAdminUser(modal_user.email, userInfo.name, getCur(), "수정", "프로필", "패스워드");
    dynamicAlert("패스워드가 정상적으로 변경되었습니다");
  });
}

function admin_admin_password_update () {
  console.log (modal_user);
  var params = {
    id     :   modal_admin.id,
    passwd1:   $("#m-password1").val(),
    passwd2:   $("#m-password1").val()
  }
  console.log (params);
  if (params.passwd1 == "") {dynamicAlert("패스워드를 입력해주세요"); return; }
  if (params.passwd2 == "") {dynamicAlert("패스워드를 재입력해주세요"); return; }
  if (params.passwd1 != params.passwd2) {dynamicAlert("패스워드가 상이합니다."); return; }

  $.postJSON('/json/admin/admin/update/passwd/', params).then(res => {
    console.log(res);
    dynamicAlert("패스워드가 정상적으로 변경되었습니다");
  });
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// MODAL-DELETE
//
$(document).on('click', '#m-delete', function (event) {
  var pageid = $('#pageid').text();
  switch(pageid) {
  case 'admin-member-search'  : return;
  case 'admin-user-search'    : return;
  case 'admin-coupon-search'  : return admin_coupon_delete ();
  case 'admin-event-search'   : return admin_event_delete  ();
  case 'admin-notice-search'  : return admin_notice_delete ();
  case 'admin-admin-search'   : return admin_admin_delete  ();
  case 'admin-class-search'   : return admin_class_delete  (); 
  case 'admin-group-search'   : return;

  case 'member-coupon-search' : return member_coupon_delete ();
  }
});

function admin_coupon_delete () {
  console.log (modal_coupon);
  var params = {
    id:   modal_coupon.id
  }
  $.postJSON('/json/admin/coupon/delete/id/', params).then(res => {
    console.log(res);
    dynamicAlert("쿠폰이 정상적으로 삭제되었습니다");
    $("#m-update").prop('disabled', true);
    $("#m-delete").prop('disabled', true);
  });
}

function admin_event_delete () {
  console.log (modal_event);
  var params = {
    id:   modal_event.id
  }
  $.postJSON('/json/admin/event/delete/id/', params).then(res => {
    console.log(res);
    dynamicAlert("이벤트/광고정보가 정상적으로 삭제되었습니다");
    $("#m-update").prop('disabled', true);
    $("#m-delete").prop('disabled', true);
  });
}

function admin_notice_delete () {
  console.log (modal_notice);
  var params = {
    id:   modal_notice.id
  }
  $.postJSON('/json/admin/notice/delete/id/', params).then(res => {
    console.log(res);
    dynamicAlert("공지사항이 정상적으로 삭제되었습니다");
    $("#m-update").prop('disabled', true);
    $("#m-delete").prop('disabled', true);
  });
}

function admin_admin_delete () {
  console.log (modal_admin);
  var params = {
    id:   modal_admin.id
  }
  $.postJSON('/json/admin/admin/delete/id/', params).then(res => {
    console.log(res);
    dynamicAlert("공지사항이 정상적으로 삭제되었습니다");
    $("#m-update").prop('disabled', true);
    $("#m-delete").prop('disabled', true);
  });
}

function admin_class_delete () {
  console.log (modal_class);
  var params = {
    id:   modal_class.id
  }
  $.postJSON('/json/admin/class/delete/id/', params).then(res => {
    console.log(res);
    dynamicAlert("업종명이 정상적으로 삭제되었습니다");
    $("#m-update").prop('disabled', true);
    $("#m-delete").prop('disabled', true);
  });
}

function member_coupon_delete () {
  console.log (memberInfo);
  var params = {
    id:   $("#m-id").val()
  }
  $.postJSON('/json/member/coupon/delete/id/', params).then(res => {
    console.log(res);
    dynamicAlert("쿠폰이 정상적으로 삭제되었습니다");
    $("#m-update").prop('disabled', true);
    $("#m-delete").prop('disabled', true);
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// MODAL-HISTORY
//
$(document).on('click', '#m-user-hist-deal', function (event) {
  console.log (modal_user);
  $("#modal-user-hist-deal").modal('show');
  var params = {
    id   : modal_user.id,
    email: modal_user.email,
    rcn  : $("#m-rcn").val (),
    date1: $("#m-date3").val () + ' 00:00:00',
    date2: $("#m-date4").val () + ' 23:59:59'
  }

  $.postJSON('/json/admin/user/search/deal', params).then(res => {
    console.log(res);
    html = '<div class="table-responsive">';
    html += '<table id="modal-admin-user-hist-deal-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    html += '<th style="text-align: center;">No</th>';
    html += '<th style="text-align: center;">가맹점</th>';
    html += '<th style="text-align: center;">거래금액</th>';
    html += '<th style="text-align: center;">스탬프적립</th>';
    html += '<th style="text-align: center;">리워드쿠폰</th>';
    html += '<th style="text-align: center;">영수증</th>';
    html += '<th style="text-align: center;">거래일시</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    $.each(res, function(i, t) {
      html += '<tr>';
      html += `<td style="text-align: center;"><div class="ropa">${i}</div></td>`;
      html += `<td style="text-align: center;"><div class="ropa">${t.name}</div></td>`;
      html += `<td style="text-align: center;">${t.total}</td>`;
      html += `<td style="text-align: center;">0</td>`;
      html += `<td style="text-align: center;">0</td>`;
      html += `<td style="text-align: center;"><a href="${t.pdf}" target="_blank">조회</a></td>`;
      html += `<td style="text-align: center;"><div class="ropa">${moment(t.registered).format('YYYY-MM-DD HH:mm:ss')}</div></td>`;
    });
    $("#m-deal-results").html(html);
    $('#modal-admin-user-hist-deal-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      "pageLength": pagelength
    });

  });
});

$(document).on('click', '#m-user-hist-coupon', function (event) {
  console.log (modal_user);
  $("#modal-user-hist-coupon").modal('show');
  var params = {
    id   : modal_user.id,
    email: modal_user.email,
    rcn  : $("#m-rcn").val (),
    date1: $("#m-date5").val () + ' 00:00:00',
    date2: $("#m-date6").val () + ' 23:59:59'
  }

  $.postJSON('/json/admin/user/search/coupon', params).then(res => {
    console.log(res);
    html = '<div class="table-responsive">';
    html += '<table id="modal-admin-user-hist-coupon-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    html += '<th style="text-align: center;">No</th>';
    html += '<th style="text-align: center;">가맹점</th>';
    html += '<th style="text-align: center;">쿠폰유형</th>';
    html += '<th style="text-align: center;">쿠폰명</th>';
    html += '<th style="text-align: center;">이력유형</th>';
    html += '<th style="text-align: center;">거래일시</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    $.each(res, function(i, t) {
      html += '<tr>';
      html += `<td style="text-align: center;"><div class="ropa">${i}</div></td>`;
      html += `<td style="text-align: center;"><div class="ropa">${t.member}</div></td>`;
      html += `<td style="text-align: center;"><div class="ropa">${t.ctype}</div></td>`;
      html += `<td style="text-align: center;"><div class="ropa">${t.name}</div></td>`;
      html += `<td style="text-align: center;"><div class="ropa">${t.status}</div></td>`;
      html += `<td style="text-align: center;"><div class="ropa">${moment(t.updated).format('YYYY-MM-DD HH:mm:ss')}</div></td>`;
    });
    $("#m-coupon-results").html(html);
    $('#modal-admin-user-hist-coupon-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      "pageLength": pagelength
    });

  });
});

$(document).on('click', '#m-user-hist-stamp', function (event) {
  console.log (modal_user);
  $("#modal-user-hist-stamp").modal('show');
  var params = {
    id   : modal_user.id,
    email: modal_user.email,
    rcn  : $("#m-rcn").val (),
    date1: $("#m-date7").val () + ' 00:00:00',
    date2: $("#m-date8").val () + ' 23:59:59'
  }

  $.postJSON('/json/admin/user/search/stamp', params).then(res => {
    console.log(res);
    html = '<div class="table-responsive">';
    html += '<table id="modal-admin-user-hist-stamp-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    html += '<th style="text-align: center;">No</th>';
    html += '<th style="text-align: center;">가맹점</th>';
    html += '<th style="text-align: center;">거래금액</th>';
    html += '<th style="text-align: center;">스탬프수량</th>';
    html += '<th style="text-align: center;">이력유형</th>';
    html += '<th style="text-align: center;">거래일시</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    $.each(res, function(i, t) {
      html += '<tr>';
      html += `<td style="text-align: center;"><div class="ropa">${i}</div></td>`;
      html += `<td style="text-align: center;"><div class="ropa">${t.member}</div></td>`;
      html += `<td style="text-align: center;">0</td>`;
      html += `<td style="text-align: center;">${t.stamping}</td>`;
      html += `<td style="text-align: center;"><div class="ropa">${t.status}</div></td>`;
      html += `<td style="text-align: center;"><div class="ropa">${moment(t.registered).format('YYYY-MM-DD HH:mm:ss')}</div></td>`;
    });
    $("#m-stamp-results").html(html);
    $('#modal-admin-user-hist-stamp-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      "pageLength": pagelength
    });

  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// CHECK CONTROL EVENT
//
function elemHide (obj) { $(obj).hide(); }
function elemShow (obj) { $(obj).show(); }


$(':radio').on('change', function (event) {
  console.log('radio', $(this).filter(':checked').val());
});

$(document).on('change', ':checkbox', function (event) {
  var elem = $(this).val();
  console.log(elem);
  switch(elem) {
  case "공지"    :
    break;

  case "메인"    :
    if($(this).is(":checked")) elemShow(".main-banner");
    else                       elemHide(".main-banner");
    break;

  case "이벤트"  :
    if($(this).is(":checked")) elemShow(".event-banner");
    else                       elemHide(".event-banner");
    break;

  case "종료일제한없음":
    if($(this).is(":checked")) { $("#date2").prop('disabled', true);  $("#date2").val('2038-01-18');      elemHide(".date2-area"); }
    else                       { $("#date2").prop('disabled', false); $("#date2").val($("#date1").val()); elemShow(".date2-area");}
    break;

  case "모달종료일제한없음":
    if($(this).is(":checked")) { $("#m-date2").prop('disabled', true);  $("#m-date2").val('2038-01-18');        elemHide(".m-date2-area"); }
    else                       { $("#m-date2").prop('disabled', false); $("#m-date2").val($("#m-date1").val()); elemShow(".m-date2-area");}
    break;

  default        :
    break;
  }
});

if($("#fmain").length) {
  if($("#fmain").is(":checked"))  elemShow(".main-banner");
  else                            elemHide(".main-banner");
}

if($("#fevent").length) {
  if($("#fevent").is(":checked")) elemShow(".event-banner");
  else                            elemHide(".event-banner");
}



/*
function user_join_search () {
  var params = {
    area1 : ($("#btn-area1").html() == "전체")? "all":$("#btn-area1").html(),
    area2 : ($("#btn-area2").html() == "전체")? "all":$("#btn-area2").html(),
  }
  $.postJSON('/json/user/search', params).then(res => {
  });
}
*/

function user_join_search () {
  var params = {
    area1 : ($("#btn-area1").html() == "전체")? "all":$("#btn-area1").html(),
    area2 : ($("#btn-area2").html() == "전체")? "all":$("#btn-area2").html(),
  }
  $.postJSON('/json/user/join/search', params).then(res => {
    html = '<div class="table-responsive">';
    html += '<table id="admin-member-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    html += '<th style="text-align: center;">No</th>';
    html += '<th style="text-align: center;">일자</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">강원</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">경기</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">경남</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">경북</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">광주</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">대구</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">대전</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">부산</th>';
    html += '<th style="text-align: center;">서울</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">울산</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">인천</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">전남</th>';
    html += '<th style="text-align: center;">전북</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">제주</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">충남</th>';
    if (width > shrink)
    html += '<th style="text-align: center;">충북</th>';
    html += '<th style="text-align: center;">가입</th>';
    html += '<th style="text-align: center;">해지</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    $.each(res, function(i, t) {
      html += '<tr>';
      if (width > shrink)
      html += `<td style="text-align: center;">${i}</td>`;
      html += `<td style="text-align: left;">${t.date}</td>`;
      html += `<td style="text-align: left;">${t.area["강원"]}</td>`;
      html += `<td style="text-align: left;">${t.area["경기"]}</td>`;
      html += `<td style="text-align: left;">${t.area["경남"]}</td>`;
      html += `<td style="text-align: left;">${t.area["경북"]}</td>`;
      html += `<td style="text-align: left;">${t.area["광주"]}</td>`;
      html += `<td style="text-align: left;">${t.area["대구"]}</td>`;
      html += `<td style="text-align: left;">${t.area["대전"]}</td>`;
      html += `<td style="text-align: left;">${t.area["부산"]}</td>`;
      html += `<td style="text-align: left;">${t.area["서울"]}</td>`;
      html += `<td style="text-align: left;">${t.area["울산"]}</td>`;
      html += `<td style="text-align: left;">${t.area["인천"]}</td>`;
      html += `<td style="text-align: left;">${t.area["전남"]}</td>`;
      html += `<td style="text-align: left;">${t.area["전북"]}</td>`;
      html += `<td style="text-align: left;">${t.area["제주"]}</td>`;
      html += `<td style="text-align: left;">${t.area["충남"]}</td>`;
      html += `<td style="text-align: left;">${t.area["충북"]}</td>`;
      html += `<td style="text-align: left;">${t.join}</td>`;
      html += `<td style="text-align: left;">${t.leave}</td>`;
    });
    $("#results").html(html);
    $('#admin-member-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      "pageLength": pagelength
    });
  });
}

function user_age_search () {
}

function user_gender_search () {
}

function user_area_search () {
}

let modal_data = [];

function member_dashbaord_search () {

  var params = {
    rcn  : memberInfo.rcn,
    cond : $("input[name=cond-search]:checked").val(),
    date1: $("#date1").val(),
    date2: $("#date2").val()
  }
  $.postJSON('/json/member/dashboard/search', params).then(res => {
    console.log(res);
    html = '<div class="table-responsive">';
    html += '<table id="admin-member-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    html += '<th style="text-align: center;" rowspan=2>일자</th>';
    html += '<th style="text-align: center;" rowspan=2>거래금액</th>';
    html += '<th style="text-align: center;" colspan=3>쿠폰사용</th>';
    html += '<th style="text-align: center;" colspan=4>스탬프</th>';
    html += '</tr>';
    html += '<tr>';
    html += '<th style="text-align: center;">프로모션</th>';
    html += '<th style="text-align: center;">스탬프</th>';
    html += '<th style="text-align: center;">리워드</th>';
    html += '<th style="text-align: center;">적립</th>';
    html += '<th style="text-align: center;">교환/사용</th>';
    html += '<th style="text-align: center;">삭제</th>';
    html += '<th style="text-align: center;">만료</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    modal_data = res.data;
    $.each(res, function(i, t) {
      html += '<tr>';
      html += `<td style="text-align: center;">${t.day}</td>`;
      html += `<td style="text-align: center;"><a id="item-member-dashboard" maxid="${t.maxid}" minid="${t.minid}" href="javascript:void(0);">${numberWithCommas(t.total)}</a></td>`;
      html += `<td style="text-align: center;">0</td>`;
      html += `<td style="text-align: center;">0</td>`;
      html += `<td style="text-align: center;">0</td>`;
      html += `<td style="text-align: center;">0</td>`;
      html += `<td style="text-align: center;">0</td>`;
      html += `<td style="text-align: center;">0</td>`;
      html += `<td style="text-align: center;">0</td>`;
      html += '</tr>';
    });
    $("#results").html(html);
    $('#admin-member-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      "pageLength": pagelength
    });
  });
}

function member_coupon_search () {

  var params = {
    rcn   : memberInfo.rcn,
    ctype : ($("#btn-ctype").html() == "전체")? "%%":"%"+$("#btn-ctype").html()+"%",
    name  : ($("#name").val() == "")? "%%":"%"+$("#name").val()+"%",
    status: ($("#btn-status").html() == "전체")? "%%":"%"+$("#btn-status").html()+"%",
    date1 : $("#date1").val() + ' 00:00:00',
    date2 : $("#date2").val() + ' 23:59:59'
  }
  $.postJSON('/json/member/coupon/search', params).then(res => {
    console.log(res);
    html = '<div class="table-responsive">';
    html += '<table id="admin-member-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    html += '<th style="text-align: center;">순번</th>';
    html += '<th style="text-align: center;">쿠폰종류</th>';
    html += '<th style="text-align: center;">쿠폰명</th>';
    html += '<th style="text-align: center;">상태</th>';
    html += '<th style="text-align: center;">수정자</th>';
    html += '<th style="text-align: center;">수정일</th>';
    html += '<th style="text-align: center;">등록자</th>';
    html += '<th style="text-align: center;">등록일</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    //modal_data = data.data;
    $.each(res, function(i, t) {
console.log(t);
      html += '<tr>';
      html += `<td style="text-align: center;">${i}</td>`;
      html += `<td style="text-align: center;">${t.ctype}</td>`;
      html += `<td style="text-align: center;"><a id="item-member-coupon" modal-id="${t.id}" href="javascript:void(0);">${t.name}</a></td>`;
      html += `<td style="text-align: center;">${t.status}</td>`;
      html += `<td style="text-align: center;">${t.updater}</td>`;
      html += `<td style="text-align: center;">${moment(t.updated).format('YYYY-MM-DD HH:mm:ss')}</td>`;
      html += `<td style="text-align: center;">${t.register}</td>`;
      html += `<td style="text-align: center;">${moment(t.registered).format('YYYY-MM-DD HH:mm:ss')}</td>`;
      html += '</tr>';
    });
    $("#results").html(html);
    $('#admin-member-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      "pageLength": pagelength
    });
  });
}

function member_stamp_search () {
  var params = {
    rcn   : memberInfo.rcn
  }
  $.postJSON('/json/member/stamp/search', params).then(res => {
    console.log("search", res);
    if(res.status == '사용') $("#status1").prop('checked', true);
    else $("#status2").prop('checked', true);
    $("#btn-stamp").html(res.stamp);
    $("#limits").val(res.limits);
    $("#btn-overagain").html(res.overagain);
    $("#benefit").html(res.benefit);
    $("#notice").html(res.notice);
  });
}

function member_event_search () {
  var params = {
    rcn   : memberInfo.rcn
  }
  $.postJSON('/json/member/event/search', params).then(res => {
    console.log(res);

    if(res.leaflet) {
    $("#img1").attr("src", res.leaflet + ".png");
    $("#img2").attr("src", res.leaflet + "@2x.png");
    $("#img3").attr("src", res.leaflet + "@3x.png");
    }
    if(res.leaflet_sub1 != "" && res.leaflet_sub1 != null) {
    $("#img4").attr("src", res.leaflet_sub1 + ".png");
    $("#img5").attr("src", res.leaflet_sub1 + "@2x.png");
    $("#img6").attr("src", res.leaflet_sub1 + "@3x.png");
    }
    if(res.leaflet_sub2 != "" && res.leaflet_sub2 != null) {
    $("#img7").attr("src", res.leaflet_sub2 + ".png");
    $("#img8").attr("src", res.leaflet_sub2 + "@2x.png");
    $("#img9").attr("src", res.leaflet_sub2 + "@3x.png");
    }
    if(res.leaflet_sub3 != "" && res.leaflet_sub3 != null) {
    $("#img10").attr("src", res.leaflet_sub3 + ".png");
    $("#img11").attr("src", res.leaflet_sub3 + "@2x.png");
    $("#img12").attr("src", res.leaflet_sub3 + "@3x.png");
    }

  });
}

function member_detail_search () {
  var params = {
    rcn   : memberInfo.rcn
  }
  $.postJSON('/json/member/detail/search', params).then(res => {
    console.log(res);
    $("#member-id").val(res.id);
    $("#img1").attr("src", res.logo + ".png");
    $("#img2").attr("src", res.logo + "@2x.png");
    $("#img3").attr("src", res.logo + "@3x.png");
    $("#intro").val(res.intro);
    $("#btn-offduty1").html(res.offduty1);
    $("#btn-offduty2").html(res.offduty2);
    $("#opentime").val (res.opentime);
    $("#closetime").val(res.closetime);
    $("#resp-name").val(res.resp_name);
    $("#resp-phone").val(res.resp_phone);
    $("#resp-email").val(res.resp_email);
  });
}

/////////////////////////////////////////////////////////////////////////////////////////////


$(document).on('click', '#modal-search', function (event) {
  var pageid = $('#modal-pageid').text();
  console.log('Page: ', pageid);

  switch(pageid) {
  case 'modal-dashoard-deal' : return modal_dash_board_deal ();
  }
});

$(".dropdown-toggle").dropdown();

$(document).on('click', '.dropdown-item', function (event) {
  $(this).parents(".dropdown-menu").prev().text($(this).text());
  $(this).parents(".dropdown-menu").prev().val($(this).text());
});

function getArea2 (area1) {
  $.getJSON(`/json/city/search/${area1}`, function(res) {
    html = '<a class="dropdown-item">전체</a><div role="separator" class="dropdown-divider"></div>';
    $.each(res, function(i, t) {
      html += `<a class="dropdown-item">${t.sigungu_nm}</a>`;
    });
    $("#area2").html(html);
  });
}

function getModalArea2 (area1) {
  $.getJSON(`/json/city/search/${area1}`, function(res) {
    html = '';
    $.each(res, function(i, t) {
      html += `<a class="dropdown-item">${t.sigungu_nm}</a>`;
    });
    $("#m-area2").html(html);
  });
}

$(document).on('click', '#item-member-dashboard', function (event) {
  $("#modal-member-dashboard").modal('show');

  var params = {
    rcn  : memberInfo.rcn,
    maxid: $(this).attr('maxid'),
    minid: $(this).attr('minid')
  }
  $.postJSON('/json/member/dashboard/search/range', params).then(res => {
    console.log(res);
    html = '<div class="table-responsive">';
    html += '<table id="dashboard-deal-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    html += '<th style="text-align: center;">순번</th>';
    html += '<th style="text-align: center;">사용자</th>';
    html += '<th style="text-align: center;">금액</th>';
    html += '<th style="text-align: center;">영수증</th>';
    html += '<th style="text-align: center;">쿠폰</th>';
    html += '<th style="text-align: center;">스탬프</th>';
    html += '<th style="text-align: center;">거래일시</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';

    $.each(res, function(i, t) {
      html += '<tr>';
      html += `<td style="text-align: center;">${i}</td>`;
      html += `<td style="text-align: left;">${t.email}</td>`;
      html += `<td style="text-align: center;">${numberWithCommas(t.total)}</td>`;
      html += `<td style="text-align: center;"><a href="${t.pdf}" target="_blank">조회</a></td>`;
      html += `<td style="text-align: center;">발급</td>`;
      html += `<td style="text-align: center;">적립</td>`;
      html += `<td style="text-align: center;">${moment(t.ts).format('YYYY-MM-DD HH:mm')}</td>`;
      html += '</tr>';
    });
    $("#modal-results").html(html);
    $('#dashboard-deal-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      "pageLength": pagelength
    });
  });
});

$(document).on('click', '#item-member-coupon', function (event) {
  $("#modal-member-coupon").modal('show');

  var params = {
    id: $(this).attr('modal-id')
  }
  $.postJSON('/json/member/coupon/search/id', params).then(res => {
    console.log(res);
    $("#m-id").val (res.id); 
    $("#m-ctype").val (res.ctype); 
    $("#m-name").val (res.name); 
    if(res.status == '사용') $("#m-status1").prop('checked', true);
    else $("#m-status2").prop('checked', true);
    $("#m-date").val (`${moment(res.date1).format('YYYY-MM-DD')} - ${moment(res.date2).format('YYYY-MM-DD')}`); 
    switch (res.ctype) {
    case '리워드': $("#m-cond").val (`${res.cash} 원 이상`); break;
    case '스탬프': $("#m-cond").val (`스탬프 ${res.stamp} 개`); break;
    default      : break;
    }
    $("#m-benefit").val (res.benefit); 
    $("#m-notice").val (res.notice); 
    $("#m-qr").attr("src", res.qr);
  });
});

/*
$(document).on('click', '#item-member-dashboard', function (event) {
  var pattern = $(this).attr('pattern');

  $("#dashboard-deal").modal('show');
  $(".modal-title").html('Hi');
    html = '<div class="table-responsive">';
    html += '<table id="dashboard-deal-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    html += '<th style="text-align: center;">일자</th>';
    html += '<th style="text-align: center;">사용자</th>';
    html += '<th style="text-align: center;">금액</th>';
    html += '<th style="text-align: center;">영수증</th>';
    html += '<th style="text-align: center;">쿠폰발급</th>';
    html += '<th style="text-align: center;">스탬프적립</th>';
    html += '<th style="text-align: center;">거래일시</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';

    $.each(modal_data, function(i, t) {
      console.log(pattern, t.pattern);
      if(pattern == t.pattern) {
      html += '<tr>';
      html += `<td style="text-align: center;">${moment(t.ts).format('YYYY-MM-DD')}</td>`;
      html += `<td style="text-align: center;">${t.email}</td>`;
      html += `<td style="text-align: center;">${t.total}</td>`;
      html += `<td style="text-align: center;"><a href="${t.pdf}" target="_new">조회</a></td>`;
      html += `<td style="text-align: center;">Y</td>`;
      html += `<td style="text-align: center;">1</td>`;
      html += `<td style="text-align: center;">${moment(t.ts).format('YYYY-MM-DD HH:mm:ss')}</td>`;
      html += '</tr>';
      }
    });
    $("#modal-results").html(html);
    $('#dashboard-deal-table').DataTable({
      "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
      "order": [[ 0, "desc" ]],
      "searching": false,
      "pageLength": pagelength
    });
});
*/

/////////////////////////////////////////////////////////////////////////////////////////////

function pos_sign_up () {
  var params = {
    Email:    $("#email").val(),
    Mac:      $("#mac").val(),
    Rcn:      $("#rcn").val()
  }
  $ .postJSON('/pos/sign-up', params).then(res => {
    alert("정상적으로 등록했습니다.");
  });
}

function admin_admin_register_checkup (params) {
  console.log (params);
  if (params.email == "" || params.valid == "0") { dynamicAlert("유효한 이메일을 입력해주세요"); return false; }
  if (params.password1 == "" || params.password2 == "" ) { dynamicAlert("비밀번호를 입력해주세요"); return false; }
  if (params.password1 != params.password2) { dynamicAlert("비밀번호가 다릅니다. 비밀번호를 다시 입력해주세요"); return false; }
  if (params.name == "") {dynamicAlert("관리자 이름을 입력해주세요"); return false; }
  if (params.mobile1 == "" || params.mobile2 == "" || params.mobile3 == "") {dynamicAlert("휴대폰 전화번호를 입력해주세요."); return false; }
  if (params.role == "선택") { dynamicAlert("관리자 권한을 선택해주세요."); return false; }

  if (params.phone == "--") params.phone = "";

  return true;
}

function admin_admin_register_complete () {
  $("#rcn").val("");
  $("#rcn-valid").val("0");
  $("#password1").val("");
  $("#password2").val("");
  $("#name").val("");
  $("#owner").val("");
  $("#bzcond").val("");
  $("#bztype").val("");
  $("#btn-bzname").html("");
  $("#phone").val("");
  $("#date1").val("");
  $("#btn-area1").html("");
  $("#btn-area2").html("");
  $("#addr").val("");
  dynamicAlert("관리자 정보가 정상적으로 등록되었습니다.");
  return true;
}

function admin_admin_register () {
  var params = {
    email:    $("#admin-email").val(),
    valid:    $("#admin-email-valid").val(),
    password: $("#password1").val(),
    password1:$("#password1").val(),
    password2:$("#password2").val(),
    name:     $("#name").val(),
    mobile:   $("#mobile1").val() + "-" + $("#mobile2").val() + "-" + $("#mobile3").val(),
    mobile1:  $("#mobile1").val(),
    mobile2:  $("#mobile3").val(),
    mobile3:  $("#mobile3").val(),
    phone:    $("#phone1").val() + "-" + $("#phone2").val() + "-" + $("#phone3").val(),
    phone1:   $("#phone1").val(),
    phone2:   $("#phone2").val(),
    phone3:   $("#phone3").val(),
    role:     $("#btn-role").html(),
    status:   $('input[name="status"]:checked').val()
  }
  if(admin_admin_register_checkup (params) != true) return;

  $ .postJSON('/json/admin/admin/register', params).then(res => {
    console.log(res);
    admin_admin_register_complete();
  });
}

function admin_profile_register () {
  var params = {
    name  : $("#name").val(),
    mobile : $("#mobile").val(),
    phone  : $("#phone").val(),
  }
  if (params.name == "" | params.mobile == "") { dynamicAlert("공란을 채워주세요"); return }
  //lib.mysql.updAdminUser ([name, mobile, phone]);
  $.postJSON('/json/admin/profile/update', params).then(res => {
    console.log(res);
  });
}


$(document).on('click', '#pdf-viewer', function(event) {
  var link = $(this).attr('href');
  var iframe = `<div class="iframe-container"><iframe src="${link}"></iframe></div>`;
  $.createModal({ title:'', message: iframe, closeButton:false, scrollable:true });
  return false;        
});    

$(document).on('click', '.area1-item', function (event) {
  console.log($(this).text());
  getArea2($(this).text());
  $('#btn-area2').text("전체");
});

$(document).on('click', '.modal-area1-item', function (event) {
  console.log($(this).text());
  getModalArea2($(this).text());
  $('#btn-m-area2').text("선택");
});

$(document).on('click', '#member', function (event) {
  $("#modal").modal('show');
});

function dynamicAlert (body) {
  $("#alert-body").html(body);
  $("#modal-alert").modal('show');
}

$(document).on('click', '#logout', function (event) {
  location.href = '/logout';
});

function rcnValid () {
  var rcn = $("#rcn").val().replace(/-/gi,'');
  $.getJSON (`/json/rcn-check/${rcn}`, function (res) {
    $("#rcn-comment").text(res.trtCntn[0]);
    if(res.trtCntn[0].search("일반과세자") >= 0) {
       $("#rcn-valid").val("1");
    }
    else {
       $("#rcn-valid").val("0");
    }
  });
}

$(document).on('click', '#rcn-check', function (event) {
  rcnValid ();
});

$(document).on('focus', '#rcn', function (event) {
  $("#rcn-comment").text("");
});

$(document).on('change', '#rcn', function (event) {
  rcnValid ();
});

/////////////////////////////////////////////////////////////////////////////////////////
//
// modal handle
//
$(document).on('click', '#passwd-change', function (event) {
  $("#modal-passwd-change").modal('show');
  //$("#modal-login-fail").modal('show');
});

$(document).on('click', '#modal-passwd-register', function (event) {
  pass  = $("#passwd").val();
  pass2 = $("#passwd2").val();
  pass3 = $("#passwd3").val();

  $.getJSON(`/admin/passwd/change/${pass}/${pass2}/${pass3}`, function (res) {
    dynamicAlert (res);
  });
});

//$(document).on('click', '#modal-register', function (event) {
//  $("#modal-login-fail").modal('show');
//});



$('.modal').on('show.bs.modal', function(event) {
    var idx = $('.modal:visible').length;
    $(this).css('z-index', 1040 + (10 * idx));
});
$('.modal').on('shown.bs.modal', function(event) {
    var idx = ($('.modal:visible').length) -1; // raise backdrop after animation.
    $('.modal-backdrop').not('.stacked').css('z-index', 1039 + (10 * idx));
    $('.modal-backdrop').not('.stacked').addClass('stacked');
});

$('input[type=radio][name=status]').change(function() {
  console.log (this.value);
});

$('#coupon-generate').on('click', function(event) {
  console.log ('coupon generate');
});

$(document).on('click', '#useit', function (event) {
  var pageid = $('#pageid').text();

  switch(pageid) {
  case 'coupon-view':
    var cpcode = $("#couponid").html();
    $.getJSON (`/use/coupon/${cpcode}`, function (res) {
      alert(res.message);
      $("#useit").attr('disabled','disabled');
    });
  }
});

$(document).on('change', '#password2', function (event) {
  var password1 = $('#password1').val();
  var password2 = $('#password2').val();
  if(password1 != password2) $("#password-comment").text("비밀번호가 같지 않습니다.");
  else $("#password-comment").text("");
});

$(document).on('change', '#m-password2', function (event) {
  var password1 = $('#m-password1').val();
  var password2 = $('#m-password2').val();
  if(password1 != password2) $("#m-password-comment").text("비밀번호가 같지 않습니다.");
  else $("#m-password-comment").text("");
});

$(document).on('change', '#addr', function (event) {
  var params = {
    addr  : $("#addr").val()
  }
  $.postJSON('/json/geocode', params).then(res => {
    console.log(res.addr, res.addr.length);
    if(res.addr.length <10) $("#addr").val(res.formattedAddress);
    $("#lat").val(res.lat);
    $("#lng").val(res.lng);
    drawMarker(res.lat, res.lng);
    console.log(res);
  });
});

var modal_member = {};

$(document).on('click', '#member-detail', function (event) {
  var id = $(this).attr("modal-id");

  $("#modal-member-detail").modal('show');
  $.getJSON(`/json/admin/member/search/id/${id}`, function (res) {
    modal_member = res;
    logAdminMember(modal_member.name, modal_member.rcn, "", userInfo.name, getCur(), "조회", "가맹점", "가맹점 상세조회");
    console.log (res);
    $("#m-rcn").val (res.rcn);
    $("#m-name").val (res.name);
    $("#m-owner").val (res.owner);
    $("#m-bzcond").val (res.bzcond);
    $("#m-bztype").val (res.bztype);
    $("#btn-m-bzname").html (res.bzname);
    $("#m-phone").val (res.phone);
    $("#m-date1").val (moment(res.opening).format('YYYY-MM-DD'));
    $("#btn-m-area1").html (res.area1);
    $("#btn-m-area2").html (res.area2);
    $("#addr").val (res.address);
    $("#lat").val (res.lat);
    $("#lng").val (res.lng);

    drawMarker (res.lat, res.lng);
  });

});

var modal_coupon = {};

$(document).on('click', '#coupon-detail', function (event) {
  var id = $(this).attr("modal-id");

  $("#modal-coupon-detail").modal('show');
  $.getJSON(`/json/admin/coupon/search/id/${id}`, function (res) {
    modal_coupon = res;
    console.log (res);
    if(res.status == '사용') $("#m-status1").prop('checked', true);
    else $("#m-status2").prop('checked', true);
    $("#m-cpcode").val (res.cpcode);
    $("#m-name").val (res.name);
    $("#m-benefit").val (res.benefit);
    $("#m-notice").val (res.notice);
    $("#btn-m-member1").html (res.member);
    $("#m-date1").val (moment(res.date1).format('YYYY-MM-DD'));
    $("#m-date2").val (moment(res.date2).format('YYYY-MM-DD'));
console.log($("#m-date2").val());
    if($("#m-date2").val() == '2038-01-18') { $("#m-no-date2").prop('checked', true);  elemHide(".m-date2-area"); }
    else                                    { $("#m-no-date2").prop('checked', false); elemShow(".m-date2-area"); }
  });

});

var modal_user = {};

$(document).on('click', '#user-detail', function (event) {
  var id = $(this).attr("modal-id");

  $("#modal-user-detail").modal('show');
  $.getJSON(`/json/admin/user/search/id/${id}`, function (res) {
    modal_user = res;
    logAdminUser(modal_user.email, userInfo.name, getCur(), "조회", "프로필", "프로필 상세조회");

    console.log (res);
    $("#m-email").val (res.email);
    $("#m-os").val (res.os);
    $("#btn-m-gender").html (res.gender);
    if(res.birth_year != null && res.birth_month != null && res.birth_day != null) { 
      $("#m-date1").val (moment(new Date(parseInt(res.birth_year), parseInt(res.birth_month), parseInt(res.birth_day))).format('YYYY-MM-DD'));
    }
    else {
      $("#m-date1").val ("");
    }
    $("#btn-m-area1").html (res.area1);
    $("#btn-m-area2").html (res.area2);

    if(res.status == '가입') $("#m-status1").prop('checked', true);
    else                     $("#m-status2").prop('checked', true);
    $("#m-updated").val (moment(res.updated).format('YYYY-MM-DD HH:mm:ss'));
    $("#m-registered").val (moment(res.registered).format('YYYY-MM-DD HH:mm:ss'));
  });

});

var modal_event = {};

$(document).on('click', '#event-detail', function (event) {
  var id = $(this).attr("modal-id");

  $("#modal-event-detail").modal('show');
  $.getJSON(`/json/admin/event/search/id/${id}`, function (res) {
    console.log (res);
    modal_event = res;
    $("#m-title").val (res.title);
    $("#btn-m-fweight").html (res.fweight);
    $("#btn-m-gender").html (res.gender);
    $("#btn-m-age").html (res.age);
    $("#btn-m-area1").html (res.area1);
    $("#btn-m-area2").html (res.area2);
    $("#m-rgb1").val (res.rgb);
    $("#m-rgb2").val (res.rgb2);
    $("#m-rgb1").css("background-color", $("#m-rgb1").val());
    $("#m-rgb2").css("background-color", $("#m-rgb2").val());
    if(res.fnotice) $("#fnotice").prop('checked', true);
    if(res.fmain)   $("#fmain").prop('checked', true);
    if(res.fevent)  $("#fevent").prop('checked', true);
    if(res.fmain)  elemShow(".main-banner");
    else            elemHide(".main-banner");
    if(res.fevent) elemShow(".event-banner");
    else            elemHide(".event-banner");

    if(res.status == '사용') $("#m-status1").prop('checked', true);
    else $("#m-status2").prop('checked', true);
    $("#m-validity1").html(moment(res.date3).format('YYYY-MM-DD'));
    $("#m-validity2").html(moment(res.date4).format('YYYY-MM-DD'));

    $("#m-img1").attr("src", "");
    $("#m-img2").attr("src", "");
    $("#m-img3").attr("src", "");
    if(res.event != null && res.event != "") {
    $("#m-prefix1").val(res.event.split("/").pop());
    $("#m-img1").attr("src", res.event + ".png");
    $("#m-img2").attr("src", res.event + "@2x.png");
    $("#m-img3").attr("src", res.event + "@3x.png");
    }

    $("#m-img4").attr("src", "");
    $("#m-img5").attr("src", "");
    $("#m-img6").attr("src", "");
    if(res.main != null && res.main != "") {
    $("#m-prefix2").val(res.main.split("/").pop());
    $("#m-img4").attr("src", res.main + ".png");
    $("#m-img5").attr("src", res.main + "@2x.png");
    $("#m-img6").attr("src", res.main + "@3x.png");
    }

    $("#m-img7").attr("src", "");
    $("#m-img8").attr("src", "");
    $("#m-img9").attr("src", "");
    if(res.detail != null && res.detail != "") {
    $("#m-prefix3").val(res.detail.split("/").pop());
    $("#m-img7").attr("src", res.detail + ".png");
    $("#m-img8").attr("src", res.detail + "@2x.png");
    $("#m-img9").attr("src", res.detail + "@3x.png");
    }
  });
});

var modal_notice = {};

$(document).on('click', '#notice-detail', function (event) {
  var id = $(this).attr("modal-id");

  $("#modal-notice-detail").modal('show');
  $.getJSON(`/json/admin/notice/search/id/${id}`, function (res) {
    modal_notice = res;
    console.log (res);
    $("#m-title").val (res.title);
    $("#btn-m-age").html (res.age);
    $("#btn-m-gender").html (res.gender);
    $("#btn-m-area1").html (res.area1);
    $("#btn-m-area1").html (res.area1);
    $("#btn-m-area2").html (res.area2);
    $("#m-date1").val (moment(res.date1).format('YYYY-MM-DD'));
    $("#m-date2").val (moment(res.date2).format('YYYY-MM-DD'));
    if($("#m-date2").val() == '2038-01-18') { $("#m-no-date2").prop('checked', true);  elemHide(".m-date2-area"); }
    else                                    { $("#m-no-date2").prop('checked', false); elemShow(".m-date2-area"); }
    $("#m-notice").val (res.description);
    if(res.detail) {
    $("#img1").attr("src", res.detail + ".png");
    $("#img2").attr("src", res.detail + "@2x.png");
    $("#img3").attr("src", res.detail + "@3x.png");
    }

    //$("#m-prefix1").val(res.detail.split("/").pop());
  });
});

var modal_class = {};

$(document).on('click', '#class-detail', function (event) {
  var id = $(this).attr("modal-id");

  $("#modal-class-detail").modal('show');
  $.getJSON(`/json/admin/class/search/id/${id}`, function (res) {
    modal_class = res;
    console.log (res);
    $("#m-name").val (res.name);
    if(res.icon_path) {
    $("#img1").attr("src", res.icon_path + ".png");
    $("#img2").attr("src", res.icon_path + "@2x.png");
    $("#img3").attr("src", res.icon_path + "@3x.png");
    }
  });
});

var modal_admin = {};

$(document).on('click', '#admin-detail', function (event) {
  var id = $(this).attr("modal-id");

  $("#modal-admin-detail").modal('show');
  $.getJSON(`/json/admin/admin/search/id/${id}`, function (res) {
    modal_admin = res;
    console.log (res);
    $("#m-email").val (res.email);
    $("#m-name").val (res.name);
    if(res.mobile != null) {
    var mobile = res.mobile.split("-");
    $("#m-mobile1").val (mobile[0]);
    $("#m-mobile2").val (mobile[1]);
    $("#m-mobile3").val (mobile[2]);
    }
    if(res.phone != null) {
    var phone = res.phone.split("-");
    $("#m-phone1").val (phone[0]);
    $("#m-phone2").val (phone[1]);
    $("#m-phone3").val (phone[2]);
    }
    $("#btn-m-grade").html (res.grade);
    if(res.status == '사용') $("#m-status1").prop('checked', true);
    else                     $("#m-status2").prop('checked', true);
  });
});


$(document).on('click', '#m-password', function (event) {
  $("#modal-password-change").modal('show');
});

$(document).on('click', '.cptype-item', function (event) {
  var field = $(this).text();
  console.log(field);

  $("#if_reward").css("display", "none");
  $("#if_stamp").css("display", "none");
  $("#if_promotion").css("display", "none");

  switch (field) {
  case '리워드':   $("#if_reward").css("display", "none"); break;
  case '스탬프':   $("#if_stamp").css("display", "none"); break;
  case '프로모션': $("#if_promotion").css("display", "none"); break;
  }
});

function couponCheckUp (cpcode) {
  if (cpcode == "") dynamicAlert("쿠폰코드를 입력해주세요");
  $.getJSON(`/json/admin/member/coupon/checkup/C${cpcode}`, function (res) {
    console.log (res);
    console.log (res.length);
    if(res.length > 0) {
      $("#cpcode-valid-comment").html(`이미 등록된 쿠폰코드(${cpcode})입니다.`);
      $("#cpcode-valid").html("0");
    }
    else {
      $("#cpcode-valid-comment").html (`등록가능한 쿠폰코드(${cpcode})입니다.`);
      $("#cpcode-valid").html("1");
    }
  });
}

$(document).on('click', '#coupon-generate', function (event) {
  var r = (Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1);
  $("#cpcode").val(r);
  couponCheckUp ($("#cpcode").val());
});

$(document).on('click', '#coupon-checkup', function (event) {
  couponCheckUp ($("#cpcode").val());
});

$(document).on('change', '#cpcode', function (event) {
  couponCheckUp ($("#cpcode").val());
});

$(document).on('change', '#cpcode', function (event) {
  console.log ("changed");
});

$(document).on('click', '.member1-item', function (event) {
  var rcn = $(this).attr("rcn");
  var bzcode = $(this).attr("bzcode");
  console.log(rcn);
  $("#member1-rcn").html (rcn);
  $("#member1-bzcode").html (bzcode);
});

function adminEmailValid () {
  var email = $("#admin-email").val();
  $.getJSON (`/json/admin/email-check/${email}`, function (res) {
    if(res.length > 0) {
      $("#admin-email-comment").text("이미 등록된 이메일 주소입니다.");
       $("#admin-email-valid").val("0");
    }
    else {
      $("#admin-email-comment").text("등록 가능한 이메일 주소입니다.");
       $("#admin-email-valid").val("1");
    }
  });
}

$(document).on('click', '#admin-email-check', function (event) {
  adminEmailValid ();
});

$(document).on('focus', '#admin-email', function (event) {
  $("#admin-email-comment").text("");
});

$(document).on('change', '#admin-email', function (event) {
  adminEmailValid ();
});

$(document).on('change', '#rgb1', function (event) {
  $(this).css("background-color", $(this).val());
});

$(document).on('change', '#rgb2', function (event) {
  $(this).css("background-color", $(this).val());
});

$(document).on('change', '#m-rgb1', function (event) {
  $(this).css("background-color", $(this).val());
});

$(document).on('change', '#m-rgb2', function (event) {
  $(this).css("background-color", $(this).val());
});

$(document).on('change', '#btn-member-ctype', function (event) {
  console.log ("change", $("#btn-member-ctype").html());
});
$(document).on('click', '.ctype-item', function (event) {
  var ctype = $(this).html ();
  console.log (ctype);
  switch (ctype) {
  case "리워드"  : 
    elemShow(".cond-reward-coupon");
    elemHide(".cond-stamp-coupon");
    elemHide(".cond-promotion-coupon");
    $("stamp").val("");
    break;
  case "스탬프"  : 
    elemHide(".cond-reward-coupon");
    elemShow(".cond-stamp-coupon");
    elemHide(".cond-promotion-coupon");
    $("cash").val("");
    break;
  case "프로모션": 
    elemHide(".cond-reward-coupon");
    elemHide(".cond-stamp-coupon");
    elemShow(".cond-promotion-coupon");
    break;
  default        : 
    elemHide(".cond-reward-coupon");
    elemHide(".cond-stamp-coupon");
    elemHide(".cond-promotion-coupon");
    break;
  }
});


$(document).on('click', '.admin-coupon1-item', function (event) {
  var data  = $(this).attr("data");
  var date1 = $(this).attr("date1");
  var date2 = $(this).attr("date2");
  console.log (data);
  console.log (date1, date2);
  $("#validity1").html (date1);
  $("#validity2").html (date2);
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

///////////////////////////////////////////////////////////////////////////////////////
//
// MODAL CLOSING
//
$("#modal-member-detail").on('hide.bs.modal', function () {
  location.reload();
});
$("#modal-coupon-detail").on('hide.bs.modal', function () {
  location.reload();
});
$("#modal-user-detail").on('hide.bs.modal', function () {
  location.reload();
});
$("#modal-event-detail").on('hide.bs.modal', function () {
  location.reload();
});
$("#modal-notice-detail").on('hide.bs.modal', function () {
  location.reload();
});
$("#modal-admin-detail").on('hide.bs.modal', function () {
  location.reload();
});
$("#modal-class-detail").on('hide.bs.modal', function () {
  location.reload();
});
$("#modal-member-coupon").on('hide.bs.modal', function () {
  location.reload();
});

/////////////////////////////////////////////////////////////////////////////////////
//
// LOG
//
function logAdminUser(email, updater, updated, done, division, description) {
  var formData = new FormData();
  formData.append('email',       email);
  formData.append('updater',     updater);
  formData.append('updated',     updated);
  formData.append('done',        done);
  formData.append('division',    division);
  formData.append('description', description);
  $.postFORM ('/json/admin/users/history/register', formData);
}

function logAdminMember(name, rcn, menu, updater, updated, done, division, description) {
  var formData = new FormData();
  formData.append('name',        name);
  formData.append('rcn',         rcn);
  formData.append('menu',        menu);
  formData.append('updater',     updater);
  formData.append('updated',     updated);
  formData.append('done',        done);
  formData.append('division',    division);
  formData.append('description', description);
  $.postFORM ('/json/admin/member/history/register', formData);
}

/*
$(document).on('click', '#exporttable', function(event) {
console.log('event');
  var table = $('#exporttable').attr('target');
  if(table && table.length){
console.log ('table exist');
    $(table).table2excel({
      exclude: ".noExl",
      name: "Excel Document Name",
      filename: "BBBootstrap" + new Date().toISOString().replace(/[\-\:\.]/g, "") + ".xls",
      fileext: ".xls",
      exclude_img: true,
      exclude_links: true,
      exclude_inputs: true,
      preserveColors: false
    });
  }
});
*/
