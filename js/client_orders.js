function statusInfo(color, icon) {
  return { color: color, icon: icon };
}
function reviewInfo(orderId, quality, price) {
  return { orderId: orderId, quality: quality, price: price };
}
var statusMap = [ statusInfo("555555", "clock"), statusInfo("6aa84f", "check"), statusInfo("cc0000", "times"), statusInfo("000000", "truck") ];
var currentReview = reviewInfo(null, null, null);
var orders;

function getDateFromUTC(utc) {
    var date = new Date();
    date.setTime(utc * 1000);
    return date.toLocaleString();
}
function getCurrentOrderId(e) {
  return e.parentsUntil(".instance-current-orders").find(".order-id").text();
}
function getPastOrderId(e) {
  return e.parentsUntil(".instance-past-orders").find(".order-id").text();
}

$(function() {
  $.post("php/client_orders/getData.php", { request: "orders" }, function(output) {
    if(output["error"]["class"] == "SERVER" && output["error"]["source"] == "QUERY") {
      $(".instance-current-orders").html(output["error"]["description"]);
      return;
    }
    var current_template = retrieveTemplate("template-current-orders");
    var past_template = retrieveTemplate("template-past-orders");
    var current_html_code = "";
    var past_html_code = "";
    orders = output["orders"];
    for(key in orders) {
      var order = orders[key];
      if (order.idStato <= 2)
        current_html_code += bindArgs(current_template, order.nominativo, ("00000" + order.ordine).slice(-6),
                                                        getDateFromUTC(order.oraConsegna), order.aula, order.costo,
                                                        statusMap[order.idStato - 1].color, statusMap[order.idStato - 1].icon, order.stato);
      else
        past_html_code += bindArgs(past_template, order.nominativo, ("00000" + order.ordine).slice(-6),
                                                  getDateFromUTC(order.oraConsegna), order.aula, order.costo,
                                                  statusMap[order.idStato - 1].color, statusMap[order.idStato - 1].icon, order.stato);
    }
    $(".title-current-orders").toggle(current_html_code != "");
    $(".instance-current-orders").html(current_html_code);
    $(".title-past-orders").toggle(past_html_code != "");
    $(".instance-past-orders").html(past_html_code);
  }, "json");

  $(".instance-current-orders").on("click", ".text-info", function() {
    $.post("php/client_orders/getData.php", { request: "dishes_in_order", orderId: getCurrentOrderId($(this)) }, function(output) {
      if(output["error"]["class"] == "SERVER" && output["error"]["source"] == "QUERY") {
        $(".instance-details").html(output["error"]["description"]);
        return;
      }
      var html_code = "";
      var template = retrieveTemplate("template-details");
      for(key in output["dishes"])
        html_code += bindArgs(template, output["dishes"][i]["pietanza"]);
      $(".instance-details").html(html_code);
   }, "json");
 });

  $(".instance-past-orders").on("click", ".review", function() {
    var id = getPastOrderId($(this));
    $("#voteButton").prop('disabled', true);
    $.post("php/client_orders/getData.php", { request: "getReview", orderId: id }, function(output) {
      var review = output["review"];
      if (review.rec_qualita == null && review.rec_prezzo == null) {
        currentReview = reviewInfo(id, null, null);
        $("i.quality").css("color", "#000000");
        $("i.price").css("color", "#000000");
      }
      else {
        currentReview = reviewInfo(null, review.rec_qualita, review.rec_prezzo);
        $("i.quality").css("color", "#555555");
        $("i.price").css("color", "#555555");
        $("i.quality").filter(function() {
          return $(this).data("value") == currentReview.quality;
        }).css("color", "#f1c232");
        $("i.price").filter(function() {
          return $(this).data("value") == currentReview.price;
        }).css("color", "#6aa84f");
      }
    }, "json");
  });

  $("i.quality").click(function() {
    if (currentReview.orderId == null)
      return;
    $("i.quality").css("color", "#000000");
    $(this).css("color", "#f1c232");
    $("#voteButton").prop('disabled', currentReview.price == null);
    currentReview.quality = $(this).data("value");
  });

  $("i.price").click(function() {
    if (currentReview.orderId == null)
      return;
    $("i.price").css("color", "#000000");
    $(this).css("color", "#6aa84f");
    $("#voteButton").prop('disabled', currentReview.quality == null);
    currentReview.price = $(this).data("value");
  });

  $("#voteButton").click(function() {
    var input = {
      request: "setReview",
      orderId: currentReview.orderId,
      quality: currentReview.quality,
      price: currentReview.price
    };
    $.post("php/client_orders/getData.php", input, function() {
      $("#vote").modal("hide");
    });
  });

  $(".instance-past-orders").on("click", ".order-again", function() {
    var page = "html/checkout.html";
    $("#pageContainer").load(page, function(responseTxt, statusTxt, xhr) {
      if(statusTxt === "error" && page !== "html/exit.html")
        $("#pageContainer").html("<h1>ERROR 404</h1><br/><h4>page " + page + " not found</h4>");
    });
  });
});