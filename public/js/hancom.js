$(function(){
  $(".dropdown-toggle").dropdown();

  $("#dropCoupon").on('click', "a", function(){
    console.log($(this).text());
    $("#btnCoupon").text($(this).text());
  });
  $("#dropUsed").on('click', "a", function(){
    console.log($(this).text());
    $("#btnUsed").text($(this).text());
  });

  var pagelength = 10;

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $("#search").on('click', function(){
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
  });

  $(".nav-parent").on('click', function(){
    //console.log($(this).text());
    $(".nav-parent").removeClass("active");
    $(".nav-item").removeClass("menu-is-opening");
    $(".nav-item").removeClass("menu-open");
    $(".nav-treeview").css("display", "none");
    $(this).toggleClass("active");
  });
  $(".nav-child").on('click', function(){
    //console.log($(this).text());
    $(".nav-child").removeClass("active");
    $(this).toggleClass("active");
  });

});

