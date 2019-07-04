$(document).ready(function() {
    $("#create_contact_person_content").hide();
    $("#success_alert").hide();

    var customer_type;
    var customer_name;
    var office_tel;
    var countrycity;
    var postal_code;
    var address;
    var last_name;
    var first_name;
    var vip;
    var dep_no;
    var tel;
    var cp_function;
    var cp_address;
    $("#goto_contact_person_content_btn").click(function () {

        customer_type=$("input[name='customer_type_radio']:checked").val();
        customer_name=$("#customer_name").val();
        office_tel=$("#office_tel").val();
        countrycity=$("#countrycity").val();
        postal_code=$("#postal_code").val();
        address=$("#address").val();
        $("#create_customer_content").hide();
        $("#create_contact_person_content").show(500);
        $("#last_name").val(last_name);
        $("#first_name").val(first_name);
        $("#vip").val(vip);
        $("#dep_no").val(dep_no);
        $("#phone").val(tel);
        $("#func").val( cp_function);
        $("#cp_address").val(cp_address);

    });
    $("#goto_customer_content_btn").click(function () {

        last_name=$("#last_name").val();
        first_name=$("#first_name").val();
        vip=$("#vip").val();
        dep_no=$("#dep_no").val();
        tel=$("#phone").val();
        cp_function=$("#func").val();
        cp_address=$("#cp_address").val();

        $("#create_contact_person_content").hide();
        $("#create_customer_content").show(500);
        if(customer_type=="1"){
            $("#individual_radio").removeAttr("checked");
            $("#company_radio").attr("checked","checked");
        }

        $("#customer_name").val(customer_name);
        $("#office_tel").val(office_tel);
        $("#countrycity").val(countrycity);
        $("#postal_code").val(postal_code);
        $("#address").val(address);

    });
    $("#submit").click(function () {
       // $("#create_success_modal").modal() ;

        $("input").attr("disabled","disabled");
        $("#goto_customer_content_btn").hide();
        $("#submit").hide();
        $("#content").prepend("<div id=\"success_alert\" class=\"alert alert-success fade show\" role=\"alert\">\n" +
            "\t\t\t\t\t\t\t\t\t<div class=\"alert-icon\"><i class=\"flaticon2-check-mark\"></i></div>\n" +
            "\t\t\t\t\t\t\t\t\t<div class=\"alert-text\">Create customer and contact person success&nbsp;\n" +
            "\t\t\t\t\t\t\t\t\t\t<a href=\"#\"  id=\"create_another_contact_person\" style=\"text-decoration: underline;\">\n" +
            "\t\t\t\t\t\t\t\t\t\t\tCreate another contact person\n" +
            "\t\t\t\t\t\t\t\t\t\t</a>\n" +
            "\t\t\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t\t\t\t<div class=\"alert-close\">\n" +
            "\t\t\t\t\t\t\t\t\t\t<button id=\"view_created_customer\" type=\"button\" class=\"btn btn-success\"  aria-label=\"Close\">\n" +
            "\t\t\t\t\t\t\t\t\t\t\tClick To View\n" +
            "\t\t\t\t\t\t\t\t\t\t</button>\n" +
            "\t\t\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t\t\t</div>");
        $("#success_alert").slideDown(200);
    });
    $(document).on("click","#create_another_contact_person",function(){
        $("#success_alert").remove();
        $("input").removeAttr("disabled");
        $("input").val("");
        $("#submit").show();
    });
    $(document).on("click","#view_created_customer",function(){
        window.location.href="view_client.html";
    });


});