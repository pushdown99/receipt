$(function(){

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
  $(".nav-parent").on('click', function(){
    $(".nav-parent").removeClass("active");
    $(".nav-item").removeClass("menu-is-opening");
    $(".nav-item").removeClass("menu-open");
    $(".nav-treeview").css("display", "none");
    $(this).toggleClass("active");
  });

  $(".nav-child").on('click', function(){
    $(".nav-child").removeClass("active");
    $(this).toggleClass("active");
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Dropdown
  //
  $("#dropCoupon").on('click', "a", function(){
    $("#btnCoupon").text($(this).text());
  });
  $("#dropUsed").on('click', "a", function(){
    $("#btnUsed").text($(this).text());
  });
  $("#dropOffDuty").on('click', "a", function(){
    $("#btnOffDuty").text($(this).text());
  });

  var pagelength = 10;

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Search
  //
  $("#search").on('click', function(){
    var page = $('#description').text();

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
        html += '<th>id</th>';
        html += '<th>name</th>';
        html += '<th>title</th>';
        html += '<th>pause</th>';
        html += '<th>limits</th>';
        html += '<th>publish</th>';
        html += '<th>begins</th>';
        html += '<th>ends</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        $.each(data, function(i, t) {
          html += '<tr>';
          html += '<td>' + t.id + '</td>';
          html += '<td>' + t.name + '</td>';
          html += '<td>' + t.title + '</td>';
          html += '<td>' + t.pause + '</td>';
          html += '<td>' + t.limits + '</td>';
          html += '<td>' + t.publish + '</td>';
          html += '<td>' + moment(t.begins).format('yy/MM/DD') + '</td>';
          html += '<td>' + moment(t.ends).format('yy/MM/DD') + '</td>';
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

    case 'page-member-search':
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
      format: 'YYYY-MM-DD'
    });

});

