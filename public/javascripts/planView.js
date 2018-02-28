$(document).ready(function () {
    $("#plans-side").addClass('active');
    $("#planView").hide();
    $("#planDetail").hide();
    var tableDetails = "",
        plans = "";
    for (i = 1; i <= 4; i++) {
       var plan1 = "<li class='item row'>" +
            "<div class='col-md-9 col-xs-9'>" +
            "<a href='#' class='product-title'>Plan Name" +
            "</a>" +
            "<span class='product-description'>25 January 2018 "+25000+"-Monthly-12" +
            "</span>" +
            "</div>" +
            "<div class='col-md-3 col-xs-3'>" +
            "<button type='button' id='viewPlan' class='btn btn-circle pull-right'>" +
            "<i class='glyphicon glyphicon-plus'></i>" +
            "</button>" +
            " </div>" +
            "</li>";


            var plan2 = "<li class='item row'>" +
            "<div class='col-md-9 col-xs-9'>" +
            "<a href='#' class='product-title'>Plan Name" +
            "</a>" +
            "<span class='product-description'>25 January 2018 "+25000+"-Monthly-24" +
            "</span>" +
            "</div>" +
            "<div class='col-md-3 col-xs-3'>" +
            "<button type='button' id='viewPlan' class='btn btn-circle pull-right'>" +
            "<i class='glyphicon glyphicon-plus'></i>" +
            "</button>" +
            " </div>" +
            "</li>";

            var plan3 = "<li class='item row'>" +
            "<div class='col-md-9 col-xs-9'>" +
            "<a href='#' class='product-title'>Plan Name" +
            "</a>" +
            "<span class='product-description'>25 January 2018 "+15000+"-Monthly-36" +
            "</span>" +
            "</div>" +
            "<div class='col-md-3 col-xs-3'>" +
            "<button type='button' id='viewPlan' class='btn btn-circle pull-right'>" +
            "<i class='glyphicon glyphicon-plus'></i>" +
            "</button>" +
            " </div>" +
            "</li>";

            var plan4 = "<li class='item row'>" +
            "<div class='col-md-9 col-xs-9'>" +
            "<a href='#' class='product-title'>Plan Name" +
            "</a>" +
            "<span class='product-description'>25 January 2018 "+25000+"-Monthly-12" +
            "</span>" +
            "</div>" +
            "<div class='col-md-3 col-xs-3'>" +
            "<button type='button' id='viewPlan' class='btn btn-circle pull-right'>" +
            "<i class='glyphicon glyphicon-plus'></i>" +
            "</button>" +
            " </div>" +
            "</li>";
   }

   plans = plan1+plan2+plan3;
    $("#plans").html(plans);
    for (i = 1; i <= 4; i++) {


    var tr = "<tr><td>T1</td><td>Paid</td><td><i class='fa fa-dollar'></i>25000</td><td>20/01/18</td></tr>"+"<tr><td>T2</td><td>Paid</td><td><i class='fa fa-dollar'></i>25000</td><td>20/02/18</td></tr>"+"<tr><td>T3</td><td>Paid</td><td><i class='fa fa-dollar'></i>25000</td><td>20/03/18</td></tr>";
        tableDetails = tableDetails + tr;
   }
    $("#tableDetails").html(tableDetails);
    $("#viewPlan").click(function () {
        viewPlans();
    });
    $("#viewPlan2").click(function () {
        viewPlans();
    });
    $("#viewPlan3").click(function () {
        viewPlans();
    });
    $("#viewPlan4").click(function () {
        viewPlans();
    });
    $("#detailPlan").click(function () {
        viewPlansDetails();
    });
    $("#back-button").click(function () {
        viewPlansBack();
    });
});

function viewPlans() {
    $("#Planlist").hide();
    $("#planView").show();
}

function viewPlansList() {    
    $("#planView").hide();
    $("#planlist").show();
}

function viewPlansBack() {    
    $("#planView").show();
    $("#planDetail").hide();
}
function viewPlansDetails() {
    $("#planView").hide();
    $("#planDetail").show();
}
