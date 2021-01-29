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

(function (a) {
  var pageid = $('#pageid').text();
  console.log (pageid);
  switch(pageid) {
  case 'admin-member-search':
  case 'admin-member-register':
    $("#sb-member").addClass("menu-is-opening menu-open");
    break;
  case 'user-search':
  case 'user-join-search':
  case 'user-age-search':
  case 'user-gender-search':
  case 'user-area-search':
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
  }
})(jQuery);

const shrink = 640;
const width  = (window.innerWidth > 0) ? window.innerWidth : screen.width;
const height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
const today  = new Date().toJSON().slice(0,10).replace(/-/g,'-');
const before = moment().subtract(1, 'months').format('YYYY-MM-DD');

  console.log ("width x height", width, height);

$(function() {

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

  if ($("#modal-date1").length) { $("#modal-date1").datetimepicker({ format: 'YYYY-MM-DD' }); }
  if ($("#modal-date2").length) { $("#modal-date2").datetimepicker({ format: 'YYYY-MM-DD' }); }
  if ($("#modal-date3").length) { $("#modal-date3").datetimepicker({ format: 'YYYY-MM-DD' }); }
  if ($("#modal-date4").length) { $("#modal-date4").datetimepicker({ format: 'YYYY-MM-DD' }); }

  if ($("#color1").length) { $("#color1").colorpicker() }
  if ($("#color2").length) { $("#color2").colorpicker() }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    $.getJSON(`/json/admin/member/search`, function(data) {
      html = '';
      $.each(data, function(i, t) {
        html += `<a class="dropdown-item member1-item" rcn="${t.rcn}" bzcode="${t.bzname}">${t.name}</a>`;
      });
      $("#member1").html(html);
    });
  }
  if ($("#member1").length) getMember1 (); 

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
  if ($("#search").length) $( "#search" ).trigger( "click" );
});





let pagelength = 10;

function admin_member_search () {
  var params = {
    rcn   : ($("#rcn").val() == "")? "all": '%' + $("#rcn").val() +'%',
    stat  : ($("#stat").text() == "전체")? "all":$("#stat").text(),
    area1 : ($("#btn-area1").html() == "전체")? "all":$("#btn-area1").html(),
    area2 : ($("#btn-area2").html() == "전체")? "all":$("#btn-area2").html(),
    date1 : $("#date1").val() + ' 00:00:00',
    date2 : $("#date2").val() + ' 23:59:59'
  }
  $.postJSON('/json/member/search', params).then(data => {
    html = '<div class="table-responsive">';
    html += '<table id="admin-member-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    if (width > shrink)
    html += '<th style="text-align: center;">No</th>';
    html += '<th style="text-align: center;">사업자번호</th>';
    html += '<th style="text-align: center;"></th>';
    html += '<th style="text-align: center;">가맹점상호</th>';
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
    $.each(data, function(i, t) {
      html += '<tr>';
      if (width > shrink)
      html += `<td style="text-align: center;"><div class="ropa">${i}</div></td>`;
      html += `<td style="text-align: center;"><a id="member-detail" rcn="${t.rcn}" href="javascript:void(0);"><div class="ropa">${t.rcn}</div></a></td>`;
      html += `<td style="text-align: center;"><a id="member-history" rcn="${t.rcn}" href="javascript:void(0);"><i class="fas fa-history fa-sm"></i></a></td>`;
      html += `<td style="text-align: center;"><a id="member-detail" rcn="${t.rcn}" href="javascript:void(0);">${t.name}</a></td>`;
      if (width > shrink)
      html += `<td style="text-align: center;">${t.status}</td>`;
      if (width > shrink)
      html += `<td style="text-align: center;"><div class="ropa">${t.phone}</div></td>`;
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

function admin_coupon_search () {
  var params = {
    name  : ($("#name").val() == "")? "all": $("#name").val(),
    stat  : ($("#stat").text() == "전체")? "all":$("#stat").text(),
    date1 : $("#date1").val() + ' 00:00:00',
    date2 : $("#date2").val() + ' 23:59:59'
  }
  $.postJSON('/json/coupon/search', params).then(data => {
    html = '<div class="table-responsive">';
    html += '<table id="admin-member-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    if (width > shrink) 
    html += '<th style="text-align: center;">No</th>';
    html += '<th style="text-align: center;">쿠폰종류</th>';
    html += '<th style="text-align: center;">쿠폰명</th>';
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
      html += `<td style="text-align: left;">${t.name}</td>`;
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

function admin_group_search () {
  var params = {
    name  : ($("#name").val() == "")? "all": $("#name").val(),
    date1 : $("#date1").val(),
    date2 : $("#date2").val()
  }
  $.postJSON('/json/group/search', params).then(data => {
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
    $.each(data, function(i, t) {
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

function admin_admin_search () {
  var params = {
    name  : ($("#name").val() == "")? "all": $("#name").val(),
    grade : ($("#grade").text() == "전체")? "all": $("#grade").text(),
    stat  : ($("#stat").text() == "전체")? "all": $("#stat").text(),
    date1 : $("#date1").val() + " 00:00:00",
    date2 : $("#date2").val() + " 23:59:59" 
  }

  $.postJSON('/json/admin/search', params).then(data => {
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
    $.each(data, function(i, t) {
      html += '<tr>';
      if (width > shrink)
      html += `<td style="text-align: center;">${i}</td>`;
      html += `<td style="text-align: left;">${t.email}</td>`;
      html += `<td style="text-align: left;">${t.name}</td>`;
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

  $.postJSON('/json/notice/search', params).then(data => {
console.log (data);
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
    $.each(data, function(i, t) {
      html += '<tr>';
      if (width > shrink)
      html += `<td style="text-align: center;">${i}</td>`;
      html += `<td style="text-align: left;">${t.title}</td>`;
      if (width > shrink)
      html += `<td style="text-align: left;">${t.gender}</td>`;
      if (width > shrink)
      html += `<td style="text-align: left;">${t.age}</td>`;
      if (width > shrink)
      html += `<td style="text-align: left;">${t.area1}</td>`;
      html += `<td style="text-align: center;">${moment(t.date1).format('YYYY-MM-DD HH:mm:ss')}</td>`;
      html += `<td style="text-align: center;">${moment(t.date2).format('YYYY-MM-DD HH:mm:ss')}</td>`;
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

function admin_class_search () {
  var params = {
    date1 :  $("#date1").val() + " 00:00:00",
    date2 :  $("#date2").val() + " 23:59:59",
    bizname: ($("#bizname").text() == "")? "all": $("#bizname").val()
  }

  $.postJSON('/json/class/search', params).then(data => {
console.log (data);
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
    $.each(data, function(i, t) {
      html += '<tr>';
      html += `<td style="text-align: center;">${i}</td>`;
      html += `<td style="text-align: left;">${t.name}</td>`;
      html += `<td style="text-align: left;"><img src='https://tric.kr${t.icon_path}@2x.png'></td>`;
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

function admin_event_search () {
  var params = {
    status: ($("#btn-status").html() == "전체")? "all": $("#btn-status").html(),
    coupon: ($("#btn-coupon").html() == "전체")? "all": $("#btn-coupon").html(),
    date1 : $("#date1").val() + " 00:00:00",
    date2 : $("#date2").val() + " 23:59:59",
  }

  $.postJSON('/json/admin/event/search', params).then(data => {
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
    $.each(data, function(i, t) {
      var fnotice = (t.fnotice)? 'Y':'N';
      var fmain   = (t.fmain)? 'Y':'N';
      var fevent  = (t.fevent)? 'Y':'N';
      html += '<tr>';
      if (width > shrink)
      html += `<td style="text-align: center;">${i}</td>`;
      html += `<td style="text-align: left;">${t.title}</td>`;
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

function user_join_search () {
  var params = {
    area1 : ($("#btn-area1").html() == "전체")? "all":$("#btn-area1").html(),
    area2 : ($("#btn-area2").html() == "전체")? "all":$("#btn-area2").html(),
  }
  $.postJSON('/json/user/search', params).then(data => {
  });
}

function user_join_search () {
  var params = {
    area1 : ($("#btn-area1").html() == "전체")? "all":$("#btn-area1").html(),
    area2 : ($("#btn-area2").html() == "전체")? "all":$("#btn-area2").html(),
  }
  $.postJSON('/json/user/join/search', params).then(data => {
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
    $.each(data, function(i, t) {
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
  var per_date  = $("input[name=per_date]:checked").val();
  var date1 = $("#date1").val();
  var date2 = $("#date2").val();

  $("#modal-date1").val(date1);
  $("#modal-date2").val(date2);

  console.log(per_date, date1, date2);
  $.getJSON(`/json/member/dashboard/${per_date}/${date1}/${date2}`, function(data) {
    console.log(data);
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
    modal_data = data.data;
    $.each(data.summary, function(i, t) {
      html += '<tr>';
      html += `<td style="text-align: center;">${t.day}</td>`;
      html += `<td style="text-align: center;"><a id="item-member-dashboard" pattern="${t.pattern}" href="javascript:void(0);">${t.total}</a></td>`;
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

/////////////////////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#search', function (event) {
  var pageid = $('#pageid').text();
  console.log('Page: ', pageid);

  switch(pageid) {
  case 'admin-member-search'     : return admin_member_search ();
  case 'admin-coupon-search'     : return admin_coupon_search ();
  case 'admin-group-search'      : return admin_group_search () ;
  case 'admin-admin-search'      : return admin_admin_search ();
  case 'admin-notice-search'     : return admin_notice_search ();
  case 'admin-class-search'      : return admin_class_search ();
  case 'admin-event-search'      : return admin_event_search ();

  case 'user-search'             : return user_search ();
  case 'user-join-search'        : return user_join_search ();
  case 'user-age-search'         : return user_age_search ();
  case 'user-gender-search'      : return user_gender_search ();
  case 'user-area-search'        : return user_area_search ();

  case 'member-dashboard-search' : return member_dashbaord_search ();
  case 'member-coupon-search'    : return member_coupon_search ();
  }
});

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
  $.getJSON(`/json/city/search/${area1}`, function(data) {
    html = '<a class="dropdown-item">전체</a><div role="separator" class="dropdown-divider"></div>';
    $.each(data, function(i, t) {
      html += `<a class="dropdown-item">${t.sigungu_nm}</a>`;
    });
    $("#area2").html(html);
  });
}

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

/////////////////////////////////////////////////////////////////////////////////////////////

function pos_sign_up () {
  var data = {
    Email:    $("#email").val(),
    Mac:      $("#mac").val(),
    Rcn:      $("#rcn").val()
  }
  $ .postJSON('/pos/sign-up', data).then(res => {
    alert("정상적으로 등록했습니다.");
  });
}

function admin_admin_register_checkup (data) {
  console.log (data);
  if (data.email == "" || data.valid == "0") { dynamicAlert("유효한 이메일을 입력해주세요"); return false; }
  if (data.password1 == "" || data.password2 == "" ) { dynamicAlert("비밀번호를 입력해주세요"); return false; }
  if (data.password1 != data.password2) { dynamicAlert("비밀번호가 다릅니다. 비밀번호를 다시 입력해주세요"); return false; }
  if (data.name == "") {dynamicAlert("관리자 이름을 입력해주세요"); return false; }
  if (data.mobile1 == "" || data.mobile2 == "" || data.mobile3 == "") {dynamicAlert("휴대폰 전화번호를 입력해주세요."); return false; }
  if (data.role == "선택") { dynamicAlert("관리자 권한을 선택해주세요."); return false; }

  if (data.phone == "--") data.phone = "";

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
  var data = {
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
  if(admin_admin_register_checkup (data) != true) return;

  $ .postJSON('/json/admin/admin/register', data).then(res => {
    console.log(res);
    admin_admin_register_complete();
  });
}

function admin_member_register_checkup (data) {
  console.log (data);
  if (data.rcn == "" || data.rcnvalid == "0") { dynamicAlert("유효한 사업자등록번호를 입력해주세요"); return false; }
  if (data.password1 == "" || data.password2 == "" ) { dynamicAlert("비밀번호를 입력해주세요"); return false; }
  if (data.password1 != data.password2) { dynamicAlert("비밀번호가 다릅니다. 비밀번호를 다시 입력해주세요"); return false; }
  if (data.name == "") {dynamicAlert("가맹점 상호명을 입력해주세요"); return false; }
  if (data.bzname == "선택") {dynamicAlert("업종 분류코드를 선택해주세요"); return false; }
  if (data.phone == "") {dynamicAlert("연락처를 입력해주세요"); return false; }
  if (data.area1 == "선택" || data.area2 == "선택") {dynamicAlert("지역을 선택해주세요"); return false; }
  if (data.addr == "") { dynamicAlert("주소를 입력해주세요"); return false; }

  return true;
}

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
  var data = {
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

  if(admin_member_register_checkup (data) != true) return;

  $.postJSON('/json/admin/member/register', data).then(res => {
    console.log(res);
    admin_member_register_complete();
  });
}

function admin_grop_register () {
}

function admin_class_register () {
  var name  = $("#name").val() ;
  var icon  = $("#icon").val() ;
  var file1 = $("#file1").val();
  var file2 = $("#file2").val();
  var file3 = $("#file3").val();
  if (name == "")  { dynamicAlert("업종명을 입력해주세요"); return }
  if (icon == "")  { dynamicAlert("업종 아이콘 파일이름을 입력해주세요"); return }
  if (file1 == "") { dynamicAlert("1x 이미지 파일을 지정해주세요"); return }
  if (file2 == "") { dynamicAlert("2x 이미지 파일을 지정해주세요"); return }
  if (file3 == "") { dynamicAlert("3x 이미지 파일을 지정해주세요"); return }

  var formData = new FormData();
  formData.append('name',  name);
  formData.append('icon',  icon);
  formData.append( 'file1', $('#file1')[0].files[0]);
  formData.append( 'file2', $('#file2')[0].files[0]);
  formData.append( 'file3', $('#file3')[0].files[0]);
  $.postFORM ('/json/admin/class/register', formData);
}

function admin_coupon_register_complete () {
  $("#cpcode").val("");
  $("#cpcode-valid").val("0");
  $("#cpname").val("");
  $("#btn-member1").html("선택");
  $("#benefit").val("");
  $("#notice").val("");
  dynamicAlert("쿠폰 정보가 정상적으로 등록되었습니다.");
  return true;
}

function admin_coupon_register () {
  var data = {
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
  if (data.cpcode == "")     { dynamicAlert("쿠폰코드를 입력해주세요"); return }
  if (data.valid == "0")     { dynamicAlert("사용가능한 쿠폰코드를 입력해주세요."); return }
  if (data.cpname == "")     { dynamicAlert("쿠폰명을 입력해주세요."); return }
  if (data.member == "선택") { dynamicAlert("교환가능한 가맹점을 선택해주세요."); return }
  if (data.benefit == "")    { dynamicAlert("쿠폰혜택을 입력해주세요."); return }
  if (data.notice == "")     { dynamicAlert("유의사항을 입력해주세요."); return }

  console.log (data);
  $.postJSON('/json/admin/coupon/register', data).then(res => {
    admin_coupon_register_complete();
  });
}

function admin_notice_register () {
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


/////////////////////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#register', function (event) {
  var pageid = $('#pageid').text();
  console.log('Page: ', pageid);

  switch(pageid) {
  case 'admin-admin-register' : return admin_admin_register ();
  case 'admin-member-register': return admin_member_register ();
  case 'admin-grop-register'  : return admin_grop_register ();
  case 'admin-class-register' : return admin_class_register ();
  case 'admin-coupon-register': return admin_coupon_register ();
  case 'admin-notice-register': return admin_notice_register ();
  case 'admin-profile'        : return admin_profile_register ();

  case 'admin-admin-search'   : return $(location).attr('href', '/admin/admin/register');
  case 'admin-member-search'  : return $(location).attr('href', '/admin/member/register');
  case 'admin-group-search'   : return $(location).attr('href', '/admin/group/register');
  case 'admin-class-search'   : return $(location).attr('href', '/admin/class/register');
  case 'admin-coupon-search'  : return $(location).attr('href', '/admin/coupon/register');
  case 'admin-notice-search'  : return $(location).attr('href', '/admin/notice/register');

  case 'pos-sign-up'          : return pos_sign_up ();
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#list', function (event) {
  var pageid = $('#pageid').text();
  console.log('#list Page: ', pageid);

  switch(pageid) {
  case 'admin-admin-register' : return $(location).attr('href', '/admin/admin/search');
  case 'admin-member-register': return $(location).attr('href', '/admin/member/search');
  case 'admin-group-register' : return $(location).attr('href', '/admin/group/search');
  case 'admin-class-register' : return $(location).attr('href', '/admin/class/search');
  case 'admin-coupon-register': return $(location).attr('href', '/admin/coupon/search');
  case 'admin-notice-register': return $(location).attr('href', '/admin/notice/search');
  }
});

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
  $.getJSON (`/json/rcn-check/${rcn}`, function (data) {
    $("#rcn-comment").text(data.trtCntn[0]);
    if(data.trtCntn[0].search("일반과세자") >= 0) {
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

  $.getJSON(`/admin/passwd/change/${pass}/${pass2}/${pass3}`, function (data) {
    dynamicAlert (data);
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

$('#no-date2').click(function() {
  if($("#no-date2").is(':checked')) { $("#date2").prop('disabled', true); $("#date2").val('2038-01-18'); $(".date2-area").css("display", "none"); }
  else { $("#date2").prop('disabled', false); $("#date2").val($("#date1").val()); $(".date2-area").css("display", "block");}
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
    $.getJSON (`/use/coupon/${cpcode}`, function (data) {
      alert(data.message);
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
  $.postJSON('/json/geocode', params).then(data => {
    console.log(data.addr, data.addr.length);
    if(data.addr.length <10) $("#addr").val(data.formattedAddress);
    $("#lat").val(data.lat);
    $("#lng").val(data.lng);
    console.log(data);
  });
});

$(document).on('click', '#member-detail', function (event) {
  var rcn = $(this).attr("rcn");
  console.log(rcn);

  $("#modal-member-detail").modal('show');
  $.getJSON(`/json/admin/member/search/rcn/${rcn}`, function (data) {
    console.log (data);
    $("#m-rcn").val (data.rcn);
    $("#m-name").val (data.name);
    $("#m-owner").val (data.owner);
    $("#m-bzcond").val (data.bzcond);
    $("#m-bztype").val (data.bztype);
    $("#btn-m-bzname").html (data.bzname);
    $("#m-phone").val (data.phone);
    $("#m-date1").val (data.openingF);
    $("#btn-m-area1").html (data.area1);
    $("#btn-m-area2").html (data.area2);
    $("#m-addr").val (data.address);
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
  $.getJSON(`/json/admin/member/coupon/checkup/C${cpcode}`, function (data) {
    console.log (data);
    console.log (data.length);
    if(data.length > 0) {
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
  $.getJSON (`/json/admin/email-check/${email}`, function (data) {
    if(data.length > 0) {
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


