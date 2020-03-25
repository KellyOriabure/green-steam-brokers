$(document).ready(function () {
  $(function () {
    $(".range").on("input change", function () {
      $(".slider-purchase-amount").html(this.value);
      $("#offer_input").val(this.value);
    });
  });
});

$(document).ready(function () {
  $(function () {
    $(".percentage-range").on("input change", function () {
      $(".slider-downpayment-percentage").html(this.value);
      var base_price = parseInt($(".detail-price-text").text().split('₦')[1]);
      $('#dpamount').text('N' + base_price * this.value / 100);
    });
  });
});

$(document).ready(function () {
  $("#lightSlider").lightSlider({
    gallery: true,
    item: 1,
    loop: true,
    slideMargin: 0,
    thumbItem: 6,
    //   responsive : [
    //     {
    //         breakpoint:400,
    //         settings: {
    //             item:3,
    //             slideMove:1,
    //             slideMargin:6,
    //           }
    //     },
    //     {
    //         breakpoint:480,
    //         settings: {
    //             item:2,
    //             slideMove:1
    //           }
    //     }
    // ]
  });
});


$(document).ready(function () {
  $('input[name="map"]').click(function () {
    if ($(this).prop("checked") == true) {
      $(".map-card-row").animate({
        width: '60%'
      })
      $("#map-view").animate({
        width: '40%'
      })
    }
    else if ($(this).prop("checked") == false) {
      $(".map-card-row").animate({
        width: '100%'
      })
      $("#map-view").animate({
        width: '0px'
      })
    }
  });
});

$(document).ready(function () {

  var base_price = parseInt($(".detail-price-text").text().split('₦')[1]);

  $('#duration .bt-single').on('click', function () {
    $('#duration').find('.bt-active').removeClass('bt-active');
    $(this).addClass('bt-active');

    var interest_rate = $("#interestrate option:selected").val() / 100;

    var dpayment = parseInt($('#dpamount').text().split('N')[1]);
    console.log(dpayment);

    var years = parseInt($(this).text().split(' ')[0]) * 12;
    console.log(years);

    var loanAmount = base_price - dpayment
    $('#loanamount').text('N' + Math.ceil(loanAmount).toLocaleString());

    var x = Math.pow(1 + (interest_rate / 12), years);
    var monthly_payment = (loanAmount * x * (interest_rate / 12) ) / (x - 1);
    $("#repayment").text("N" + Math.ceil(monthly_payment).toLocaleString());
  });

  $("#dpcategory .bt-single").on("click", function () {
    $('#dpcategory').find(".bt-active").removeClass("bt-active");
    $(this).addClass('bt-active');

    var dp_category_percent;

    if ($(this).text() === "Formal") {
      dp_category_percent = 20 / 100;
      $("#dpslider").val(20);
      $(".slider-downpayment-percentage").html("20");
    } else if ($(this).text() === "Informal") {
      dp_category_percent = 30 / 100;
      $("#dpslider").val(30);
      $(".slider-downpayment-percentage").html("30");
    } else if ($(this).text() === "Diaspora") {
      dp_category_percent = 40 / 100;
      $("#dpslider").val(40);
      $(".slider-downpayment-percentage").html("40");
    }

    var dp = base_price * dp_category_percent;
    console.log(dp);

    $("#dpbycategory").text($(this).text() + "category down payment: N" + dp + "m");
    $('#dpamount').text('N' + Math.ceil(dp).toLocaleString());

    var loanAmount = base_price - parseInt($('#dpamount').text().split('N')[1]);
    $('#loanamount').text('N' + Math.ceil(loanAmount).toLocaleString());

    var interest_rate = $("#interestrate option:selected").val() / 100;
    var yrs = parseInt($('#duration').find('.bt-active').text().split(' ')[0]) * 12;
    var x = Math.pow(1 + (interest_rate / 12), yrs);
    var monthly_payment = (loanAmount * x * (interest_rate / 12) ) / (x - 1);
    $("#repayment").text("N" + Math.ceil(monthly_payment).toLocaleString());
  });


  $("#offer_input").on("keyup", function () {
    var offer = $(this).val();
    // $(".detail-price-text").text('₦' + offer);
  });

  $("#interestrate").on("change", function(){
    var loanAmount = base_price - parseInt($('#dpamount').text().split('N')[1]);
    var interest_rate = $(this).val() / 100;
    var yrs = parseInt($('#duration').find('.bt-active').text().split(' ')[0]) * 12;
    var x = Math.pow(1 + (interest_rate / 12), yrs);
    var monthly_payment = (loanAmount * x * (interest_rate / 12) ) / (x - 1);
    $("#repayment").text("N" + Math.ceil(monthly_payment).toLocaleString());
  });

  $("#mortgage_calculater button").on("click", function() {
    var price = $("#price").val();
    console.log(price);
    var dpayment = $("#dpayment option:selected").val() / 100;
    console.log(dpayment);
    var duration = $("#duration option:selected").val() * 12;
    console.log(duration);
    var bankrate = $("#bankrate option:selected").val() / 100;
    console.log(bankrate);

    var x = Math.pow(1 + (bankrate / 12), duration);
    var repayment = (price * x * (bankrate / 12) ) / (x - 1);
    console.log(Math.ceil(repayment).toLocaleString());

    var downPayment = price * dpayment;
    console.log("Down Payment: ", downPayment);

    var loanAmount = price - downPayment;
    console.log("Loan Ammount: ", loanAmount);

    var html = `<p>
                  <strong>Loan Amount </strong>- N${loanAmount}&nbsp;
                  <strong>Down Payment </strong>-&nbsp; N${downPayment}, 
                  <strong>Monthly Repayment</strong> - N${Math.ceil(repayment).toLocaleString()}
                </p>`
    $("#mortgage-result").html(html).show();

  });
});
