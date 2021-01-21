$.extend({
    postJSON: function(url, body) {
        return $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(body),
            contentType: "application/json",
            dataType: 'json'
        });
    }
});

(function (a) {
  a.createModal = function (b) {
    defaults = { title: "", message: "Your Message Goes Here!", closeButton: true, scrollable: false };
    var b = a.extend({}, defaults, b);
    var c = b.scrollable === true ? 'style="max-height: 820px;overflow-y: auto;"' : "";
    html = '<div class="modal fade" id="myModal">';
    html += '<div class="modal-dialog" style="z-index: 500;">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
    if (b.title.length > 0) {
      html += '<h4 class="modal-title">' + b.title + "</h4>";
    }
    html += "</div>";
    html += '<div class="modal-body" ' + c + ">";
    html += b.message;
    html += "</div>";
    html += '<div class="modal-footer">';
    if (b.closeButton === true) {
      html += '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>';
    }
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    a("body").prepend(html);
    a("#myModal").modal().on("hidden.bs.modal", function () { a(this).remove(); });
  };
})(jQuery);

var popUpObj;

function showModalPopUp(link) {
var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    w = win.innerWidth || docElem.clientWidth || body.clientWidth,
    h = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
    g = 100;

  popUpObj = window.open(link, "ModalPopUp",
    "toolbar=no,scrollbars=no,location=no,statusbar=no,menubar=no,resizable=0,width=" + (w - 2*g) + ",height=" + (h - 2*g) + ",left=" + g + ",top=" + g
  );
  popUpObj.focus();
  LoadModalDiv();
}

function LoadModalDiv(target) {
   var bcgDiv = document.getElementById("divBackground");
   bcgDiv.style.display = "block";
}

function HideModalDiv() {
  var bcgDiv = document.getElementById("divBackground");
  bcgDiv.style.display = "none";
}

const shrink     = 640;
const width  = (window.innerWidth > 0) ? window.innerWidth : screen.width;
const height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
const today  = new Date().toJSON().slice(0,10).replace(/-/g,'-');
const before = moment().subtract(1, 'months').format('YYYY-MM-DD');

  console.log ("width x height", width, height);

$(function() {

  if ($("#date1").length) { $("#date1").datetimepicker({ format: 'YYYY-MM-DD' }); $("#date1").val(before); }
  if ($("#date2").length) { $("#date2").datetimepicker({ format: 'YYYY-MM-DD' }); $("#date2").val(today); }
  if ($("#date3").length) { $("#date3").datetimepicker({ format: 'YYYY-MM-DD' }); $("#date3").val(before); }
  if ($("#date4").length) { $("#date4").datetimepicker({ format: 'YYYY-MM-DD' }); $("#date4").val(today); }

  if ($("#modal-date1").length) { $("#modal-date1").datetimepicker({ format: 'YYYY-MM-DD' }); }
  if ($("#modal-date2").length) { $("#modal-date2").datetimepicker({ format: 'YYYY-MM-DD' }); }
  if ($("#modal-date3").length) { $("#modal-date3").datetimepicker({ format: 'YYYY-MM-DD' }); }
  if ($("#modal-date4").length) { $("#modal-date4").datetimepicker({ format: 'YYYY-MM-DD' }); }

  if ($("#color1").length) { $("#color1").colorpicker() }
  if ($("#color2").length) { $("#color2").colorpicker() }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  function getArea1 () {
    $.getJSON(`/json/city/search`, function(data) {
      html = '<a class="dropdown-item">전체</a><div role="separator" class="dropdown-divider"></div>';
      $.each(data, function(i, t) {
        html += `<a class="dropdown-item area1-item">${t.sido_nm}</a>`;
      });
      $("#area1").html(html);
    });
  }

  if ($("#area1").length) getArea1 (); 

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

  clock();
  setInterval(clock, 1000);

  if ($("#search").length) $( "#search" ).trigger( "click" );
});





let pagelength = 10;

function admin_member_search () {
/*
  var rcn   = ($("#rcn").val() == "")? "all": $("#rcn").val();
  var stat  = ($("#stat").text() == "전체")? "all":$("#stat").text();
  var area1 = ($("#btn-area1").html() == "전체")? "all":$("#btn-area1").html();
  var area2 = ($("#btn-area2").html() == "전체")? "all":$("#btn-area2").html();
  var date1 = $("#date1").val() + ' 00:00:00';
  var date2 = $("#date2").val() + ' 23:59:59';
*/
  

  var params = {
    rcn   : ($("#rcn").val() == "")? "all": $("#rcn").val(),
    stat  : ($("#stat").text() == "전체")? "all":$("#stat").text(),
    area1 : ($("#btn-area1").html() == "전체")? "all":$("#btn-area1").html(),
    area2 : ($("#btn-area2").html() == "전체")? "all":$("#btn-area2").html(),
    date1 : $("#date1").val() + ' 00:00:00',
    date2 : $("#date2").val() + ' 23:59:59'
  }
  $.postJSON('/json/member/search', params).then(data => {

/*
  $.getJSON(`/json/member/search/${rcn}/${stat}/${area1}/${area2}/${date1}/${date2}`, function(data) {
*/
    html = '<div class="table-responsive">';
    html += '<table id="admin-member-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
    html += '<thead>';
    html += '<tr>';
    if (width > shrink) 
    html += '<th style="text-align: center;">No</th>';
    html += '<th style="text-align: center;">사업자번호</th>';
    html += '<th style="text-align: center;">가맹점상호</th>';
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
      html += `<td style="text-align: center;">${i}</td>`;
      html += `<td style="text-align: left;">${t.rcn}</td>`;
      html += `<td style="text-align: left;">${t.name}</td>`;
      html += `<td style="text-align: center;">${t.status}</td>`;
      if (width > shrink) 
      html += `<td style="text-align: center;">${t.phone}</td>`;
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
  var name  = ($("#name").val() == "")? "all": $("#name").val();
  var date1 = $("#date1").val();
  var date2 = $("#date2").val();
  $.getJSON(`/json/group/search/${name}/${date1}/${date2}`, function(data) {
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
  var name  = ($("#name").val() == "")? "all": $("#name").val();
  var grade = ($("#grade").text() == "전체")? "all": $("#grade").text();
  var stat  = ($("#stat").text() == "전체")? "all": $("#stat").text();
  var date1 = $("#date1").val() + " 00:00:00";
  var date2 = $("#date2").val() + " 23:59:59";

  $.getJSON(`/json/admin/search/${name}/${grade}/${stat}/${date1}/${date2}`, function(data) {
console.log (data);
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
  case 'admin-member-search' : return admin_member_search ();
  case 'admin-group-search'  : return admin_group_search () ;
  case 'admin-coupon-search' : return admin_coupon_search ();
  case 'admin-admin-search'  : return admin_admin_search ();

  case 'member-dashboard-search' : return member_dashbaord_search ();
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

function admin_admin_register () {
  var data = {
    email:    $("#email").val(),
    password: $("#password1").val(),
    name:     $("#name").val(),
    mobile:   $("#mobile1").val() + "-" + $("#mobile2").val() + "-" + $("#mobile3").val(),
    phone:    $("#phone1").val() + "-" + $("#phone2").val() + "-" + $("#phone3").val(),
    name:     $("#name").val(),
    grade:    $("#grade").val(),
    stat:     $('input[name="stat"]:checked').val()
  }
  $ .postJSON('/json/admin/admin/register', data).then(res => {
    $("#exampleModal").modal('show');
    console.log("result", res);
  });
}

function admin_member_register () {
  var data = {
    rcn:      $("#rcn").val(),
    passwd:   $("#password1").val(),
    name:     $("#name").val(),
    owner:    $("#owner").val(),
    bzcond:   $("#bzcond").val(),
    bztype:   $("#bztype").val(),
    bzname:   $("#btn-bzname").html(),
    phone:    $("#phone").val(),
    date1:    $("#date1").val(),
    area1:    $("#btn-area1").html(),
    area2:    $("#btn-area2").html(),
    addr:     $("#addr").val()
  }
  $.postJSON('/json/admin/member/register', data).then(res => {
    console.log(res);
  });
}

/////////////////////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#register', function (event) {
  var pageid = $('#pageid').text();
  console.log('Page: ', pageid);

  switch(pageid) {
  case 'admin-admin-register' : return admin_admin_register ();
  case 'admin-admin-search'   : $(location).attr('href', '/admin/admin/register');
  case 'admin-member-search'  : $(location).attr('href', '/admin/member/register');
  case 'admin-member-register': return admin_member_register ();
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#list', function (event) {
  var pageid = $('#pageid').text();
  console.log('Page: ', pageid);

  switch(pageid) {
  case 'admin-admin-register' : $(location).attr('href', '/admin/admin/search');
  }
});

$(document).on('click', '#pdf-viewer', function(event) {
  var link = $(this).attr('href');
  var iframe = `<div class="iframe-container"><iframe src="${link}"></iframe></div>`;
  $.createModal({ title:'', message: iframe, closeButton:false, scrollable:true });
  return false;        
});    

$(document).on('click', '.area1-item', function (event) {
  getArea2($(this).text());
  $('#btn-area2').text("전체");
});

$(document).on('click', '#member', function (event) {
  $("#modal").modal('show');
});

$(document).on('click', '#logout', function (event) {
  location.href = '/logout';
});

$(document).on('click', '#rcn-check', function (event) {
  var rcn = $("#rcn").val().replace(/-/gi,'');

  console.log(rcn);

  $.getJSON (`/json/rcn-check/${rcn}`, function (data) {
    $("#rcn-check-result").text(data.trtCntn[0]);
  });
});


