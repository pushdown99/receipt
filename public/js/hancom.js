$(window).on( "load", function() {
  console.log( "window loaded" );
});

function clicked(event) {
  console.log(event);
  console.log(this.id);
}

$(function() {
  console.log( "document ready" );

  var page = $('#description').text();

  $(".dropdown-toggle").dropdown();
  if($("#openingDate").length) $("#openingDate").inputmask("9999-99-99");
  if($("#openingTime").length) $("#openingTime").inputmask("99:99");
  if($("#closingTime").length) $("#closingTime").inputmask("99:99");

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Modal
  //
  $("#search-juso").on('click', function(){
    var keyword = $("#input-search-juso").val();
    if(keyword == "") { $("#search-juso-message").text("주소검색을 위한 키워드를 입력하세요"); return; }
    
    console.log($("#input-search-juso").val());

    $.getJSON('/utils/juso/'+keyword, function (data) {
      console.log(data);
      var info  = document.getElementById("search-juso-result");

      html = '<div class="table-responsive">';
      html += '<table id="juso-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
      html += '<thead>';
      html += '<tr>';
      html += '<th>우편번호</th>';
      html += '<th>도로명주소</th>';
      html += '</tr>';
      html += '</thead>';
      html += '<tbody>';
      $.each(data.results.juso, function(i, t) {
        html += '<tr>';
        html += '<td><a href="javascript:void(0)">' + t.zipNo + '</a></td>';
        html += '<td><a href="javascript:void(0)">' + t.roadAddr + '</a></td>';
      });
      info.innerHTML = html;

      $('#juso-table').DataTable({
        "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
        "order": [[ 0, "desc" ]],
        "searching": false,
        "pageLength": pagelength
      });

      $("#juso-table tbody tr").on('click', function() {
        console.log ("selected");
      });
    });
  });


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Sidebar
  //
//  $(".nav-parent").on('click', function(){
//    $(".nav-parent").removeClass("active");
//    $(".nav-item").removeClass("menu-is-opening");
//    $(".nav-item").removeClass("menu-open");
//    $(".nav-treeview").css("display", "none");
//    $(this).toggleClass("active");
//  });

//  $(".nav-child").on('click', function(){
//    $(".nav-child").removeClass("active");
//    $(this).toggleClass("active");
//  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Dropdown
  //
  $("#dropdown-coupon-type").on('click', "a", function(){
    $("#button-coupon-type").text($(this).text());
  });
  $("#dropdown-coupon-used").on('click', "a", function(){
    $("#button-coupon-used").text($(this).text());
  });
  $("#dropOffDuty").on('click', "a", function(){
    $("#btnOffDuty").text($(this).text());
  });
  $("#drop-member-user-auth").on('click', "a", function(){
    $("#btn-member-user-auth").text($(this).text());
  });
  $("#drop-member-user-use").on('click', "a", function(){
    $("#btn-member-user-use").text($(this).text());
  });

  var pagelength = 10;

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Search
  //
  $("#button-search").on('click', function(){
    console.log("clicked");

    switch(page) {
    case 'page-member-coupon-search':
      $.getJSON("/admin/member/get-coupon", function(data) {
        console.log(data);
        blocks = data;
        var info  = document.getElementById("result");
        var w = $(document).width();

        html = '<div class="table-responsive">';
        html += '<table id="receipt-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
        html += '<thead>';
        html += '<tr>';
        html += '<th>No</th>';
        html += '<th>가맹점ID</th>';
        html += '<th>가맹점상호</th>';
        html += '<th>쿠폰종류</th>';
        html += '<th>쿠폰명</th>';
        html += '<th>발급조건</th>';
        html += '<th>사용</th>';
        html += '<th>시작일</th>';
        html += '<th>종료일</th>';
        html += '<th>등록일</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        $.each(data, function(i, t) {
          html += '<tr>';
          html += '<td>' + (i + 1) + '</td>';
          html += '<td></td>';
          html += '<td>' + t.name + '</td>';
          html += '<td></td>';
          html += '<td>' + t.title + '</td>';
          html += '<td></td>';
          html += '<td>' + t.pause + '</td>';
          html += '<td>' + moment(t.begins).format('yy.MM.DD') + '</td>';
          html += '<td>' + moment(t.ends).format('yy.MM.DD') + '</td>';
          html += '<td></td>';
          html += '</tr>';
        });
        html += '</tbody>';
        html += '</table>';
        html += '</div>';

        //////////////////////////////////////////////////////////////////////////////////////
        info.innerHTML = html;
        $('#receipt-table').DataTable({
          "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
          "order": [[ 0, "desc" ]],
          "searching": false,
          "pageLength": pagelength
        });
      });
      break;

    case 'page-member-user-search':
      $.getJSON("/json/admin/member/search", function(data) {
        console.log(data);
        blocks = data;
        var info  = document.getElementById("result");
        var w = $(document).width();

        html = '<div class="table-responsive">';
        html += '<table id="receipt-table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">';
        html += '<thead>';
        html += '<tr>';
        html += '<th>id</th>';
        html += '<th>email</th>';
        html += '<th>name</th>';
        html += '<th>used</th>';
        html += '<th>tel</th>';
        html += '<th>register</th>';
        html += '<th>ts</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        $.each(data, function(i, t) {
          html += '<tr>';
          html += '<td>' + t.id + '</td>';
          html += '<td>' + t.email + '</td>';
          html += '<td>' + t.name + '</td>';
          html += '<td>' + t.used + '</td>';
          html += '<td>' + t.tel + '</td>';
          html += '<td>' + t.register + '</td>';
          html += '<td>' + moment(t.ts).format('yy/MM/DD') + '</td>';
          html += '</tr>';
        });
        html += '</tbody>';
        html += '</table>';
        html += '</div>';

        //////////////////////////////////////////////////////////////////////////////////////
        info.innerHTML = html;
        $('#receipt-table').DataTable({
          "pagingType": "numbers", // "simple" option for 'Previous' and 'Next' buttons only
          "order": [[ 0, "desc" ]],
          "searching": false,
          "pageLength": pagelength
        });
      });
      break;

    default: 
      break;
    }
  });


  //Date range picker
  $('#reservationdate').datetimepicker({
    format: 'YYYY.MM.DD'
  });
  $("#coupon-begin-date").datetimepicker({
    format: 'YYYY.MM.DD'
  });
  $("#coupon-end-date").datetimepicker({
    format: 'YYYY.MM.DD'
  });

  // page navigation
  switch(page) {
  case 'page-member-coupon-register':
    console.log ('page-member-coupon-register');
    $('#sidebar-page-member-coupon').click();
    $('#sidebar-page-member-coupon-register').click();
    //$('#sidebar-page-member-coupon').addClass("menu-is-opening");
    //$('#sidebar-page-member-coupon').addClass("menu-open");
    //$('#sidebar-page-member-coupon-register').addClass("active");
    break;

  case 'page-member-coupon-search'  :
    $('#sidebar-page-member-coupon').click();
    $('#sidebar-page-member-coupon-search').click();
    console.log ('page-member-coupon-search');
    break;
  
  case 'page-member-user-search'  :
    $('#sidebar-page-member-user').click();
    $('#sidebar-page-member-user-search').click();
    console.log ('page-member-user-search');
    break;
  
  case 'page-member-user-register'  :
    $('#sidebar-page-member-user').click();
    $('#sidebar-page-member-user-register').click();
    console.log ('page-member-user-register');
    break;
  
  }

  $("#logout").off().on('click', function (event) {
    console.log ("logout");
    location.href = '/logout';
  });

  $(".nav-item > a").off().on('click', function (event) {
    //console.log ("nav-item clicked");
    if(this.id != '') {
      console.log (this.id);
      $(this).parent().addClass("active");
      //$(".nav-child").removeClass("active");
      //$(this).parent().toggleClass("active");
    }
    var sb = document.getElementById("main-sidebar");
    ///console.log (sb.innerHTML);
  });

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

});

