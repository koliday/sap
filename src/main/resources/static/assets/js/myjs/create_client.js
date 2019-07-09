$(document).ready(function() {
    $("#create_contact_person_content").hide();

    //client
    var clid;
    var clno;
    var client_name;
    var office_tel;
    var city_select;
    var postal_code;
    var address;
    //cp
    var cp_name;
    var cp_contact;
    var cp_address;
    var vip=1;
    var dep_no=1;
    var callfreq=1;
    var cp_function=1;
    $("#goto_contact_person_content_btn").click(function () {

        client_name=$("#client_name").val();
        office_tel=$("#office_tel").val();
        city_select=$("#city_select").val();
        postal_code=$("#postal_code").val();
        address=$("#address").val();

        if($("input").hasClass("is-invalid")||$("input").hasClass("is-valid")){
            $("input").attr("class","form-control");
        }
        var invalidcount=0;
        if(client_name == "" || $("#client_name").length>30){
            $("#client_name").addClass("is-invalid");
            invalidcount++;
        }else{
            $("#client_name").addClass("is-valid");
        }
        if(office_tel == "" || $("#office_tel").length>11){
            $("#office_tel").addClass("is-invalid");
            invalidcount++;
        }else{
            $("#office_tel").addClass("is-valid");
        }
        if(postal_code == "" || $("#postal_code").length>10){
            $("#postal_code").addClass("is-invalid");
            invalidcount++;
        }else{
            $("#postal_code").addClass("is-valid");
        }
        if(address == "" || $("#address").length>100){
            $("#address").addClass("is-invalid");
            invalidcount++;
        }else{
            $("#address").addClass("is-valid");
        }

        if(invalidcount>0){

            $("#client_name").val(client_name);
            $("#office_tel").val(office_tel);
            $("#city_select").val(city_select);
            $("#postal_code").val(postal_code);
            $("#address").val(address);
            return;
        }



        $("#create_customer_content").hide();
        $("#create_contact_person_content").show(500);

        $("#cp_name").val(cp_name);
        $("#cp_contact").val(cp_contact);
        $("#vip").val(vip);
        $("#dep_no").val(dep_no);
        $("#cp_function").val(cp_function);
        $("#cp_address").val(cp_address);
        $("#callfreq").val(callfreq);

    });
    $("#goto_customer_content_btn").click(function () {

        cp_name=$("#cp_name").val();
        cp_contact=$("#cp_contact").val();
        vip=$("#vip").val();
        dep_no=$("#dep_no").val();
        cp_function=$("#cp_function").val();
        cp_address=$("#cp_address").val();
        callfreq=$("#callfreq").val();

        if($("input").hasClass("is-invalid")||$("input").hasClass("is-valid")){
            $("input").attr("class","form-control");
        }
        var invalidcount=0;
        if(cp_name == "" || $("#cp_name").length>20){
            $("#cp_name").addClass("is-invalid");
            invalidcount++;
        }else{
            $("#cp_name").addClass("is-valid");
        }
        if(cp_contact == "" || $("#cp_contact").length>11){
            $("#cp_contact").addClass("is-invalid");
            invalidcount++;
        }else{
            $("#cp_contact").addClass("is-valid");
        }

        if(cp_address == "" || $("#cp_address").length>100){
            $("#cp_address").addClass("is-invalid");
            invalidcount++;
        }else{
            $("#cp_address").addClass("is-valid");
        }
        if(invalidcount>0){
            $("#cp_name").val(cp_name);
            $("#cp_contact").val(cp_contact);
            $("#vip").val(vip);
            $("#dep_no").val(dep_no);
            $("#cp_function").val(cp_function);
            $("#cp_address").val(cp_address);
            $("#callfreq").val(callfreq);
            return;
        }



        $("#create_contact_person_content").hide();
        $("#create_customer_content").show(500);




        $("#client_name").val(client_name);
        $("#office_tel").val(office_tel);
        $("#city_select").val(city_select);
        $("#postal_code").val(postal_code);
        $("#address").val(address);

    });
    $("#submit").click(function () {
        cp_name=$("#cp_name").val();
        cp_contact=$("#cp_contact").val();
        vip=$("#vip").val();
        dep_no=$("#dep_no").val();
        cp_function=$("#cp_function").val();
        cp_address=$("#cp_address").val();
        callfreq=$("#callfreq").val();


        if($("input").hasClass("is-invalid")||$("input").hasClass("is-valid")){
            $("input").attr("class","form-control");
        }
        var invalidcount=0;
        if(cp_name == "" || $("#cp_name").length>20){
            $("#cp_name").addClass("is-invalid");
            invalidcount++;
        }else{
            $("#cp_name").addClass("is-valid");
        }
        if(cp_contact == "" || $("#cp_contact").length>11){
            $("#cp_contact").addClass("is-invalid");
            invalidcount++;
        }else{
            $("#cp_contact").addClass("is-valid");
        }
        if(cp_address == "" || $("#cp_address").length>100){
            $("#cp_address").addClass("is-invalid");
            invalidcount++;
        }else{
            $("#cp_address").addClass("is-valid");
        }

        if(invalidcount>0){
            $("#cp_name").val(cp_name);
            $("#cp_contact").val(cp_contact);
            $("#vip").val(vip);
            $("#dep_no").val(dep_no);
            $("#cp_function").val(cp_function);
            $("#cp_address").val(cp_address);
            $("#callfreq").val(callfreq);
            return;
        }



        $("input").attr("disabled","disabled");
        $("select").attr("disabled",true);
        $("#goto_customer_content_btn").hide();
        $("#submit").hide();



        $.ajax({
            type: "POST",
            url: "http://localhost:8080/createclient",
            data:{
                clname:client_name,
                contact:office_tel,
                address:address,
                city:city_select,
                postcode:postal_code,

                cpname:cp_name,
                cp_contact:cp_contact,
                cp_address:cp_address,
                deptno:dep_no,
                func:cp_function,
                vip:vip,
                callfreq:callfreq
            },
            dataType: "json",
            success: function (data) {
                if(data>=1){
                    clid=data;
                    var clidString=data+"";
                    var result="CL";
                    for(var i=0;i<6-clidString.length;i++){
                        result+="0";
                    }
                    result+=clidString;
                    clno=result;
                    $("#success_text").text("Client "+result+" has been created!")
                    $("#success_alert").slideDown();
                }else{
                    $("#fail_text").text("Error when creating new client!Please retry");
                    $("#fail_alert").slideDown();
                    $("input").removeAttr("disabled");
                    $("select").removeAttr("disabled");
                    $("#goto_customer_content_btn").show();
                    $("#submit").show();
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.statusText);
            }
        });

    });
    $("#submitcp").click(function () {
        cp_name=$("#cp_name").val();
        cp_contact=$("#cp_contact").val();
        vip=$("#vip").val();
        dep_no=$("#dep_no").val();
        cp_function=$("#cp_function").val();
        cp_address=$("#cp_address").val();
        callfreq=$("#callfreq").val();


        if($("input").hasClass("is-invalid")||$("input").hasClass("is-valid")){
            $("input").attr("class","form-control");
        }
        var invalidcount=0;
        if(cp_name == "" || $("#cp_name").length>20){
            $("#cp_name").addClass("is-invalid");
            invalidcount++;
        }else{
            $("#cp_name").addClass("is-valid");
        }
        if(cp_contact == "" || $("#cp_contact").length>11){
            $("#cp_contact").addClass("is-invalid");
            invalidcount++;
        }else{
            $("#cp_contact").addClass("is-valid");
        }
        if(cp_address == "" || $("#cp_address").length>100){
            $("#cp_address").addClass("is-invalid");
            invalidcount++;
        }else{
            $("#cp_address").addClass("is-valid");
        }

        if(invalidcount>0){
            $("#cp_name").val(cp_name);
            $("#cp_contact").val(cp_contact);
            $("#vip").val(vip);
            $("#dep_no").val(dep_no);
            $("#cp_function").val(cp_function);
            $("#cp_address").val(cp_address);
            $("#callfreq").val(callfreq);
            return;
        }



        $("input").attr("disabled","disabled");
        $("select").attr("disabled",true);
        $("#submitcpdiv").hide();



        $.ajax({
            type: "POST",
            url: "http://localhost:8080/createcontactperson",
            data:{
                clid:clid,
                cpname:cp_name,
                cp_contact:cp_contact,
                cp_address:cp_address,
                deptno:dep_no,
                func:cp_function,
                vip:vip,
                callfreq:callfreq
            },
            dataType: "json",
            success: function (data) {
                if(data==1){
                    $("#success_text").text("Contact Person has been created for Client "+clno+" !");
                    $("#success_alert").slideDown();
                }else{
                    $("#fail_text").text("Error when creating contact person!Please retry!");
                    $("#fail_alert").slideDown();
                    $("input").removeAttr("disabled");
                    $("select").removeAttr("disabled");
                    $("#submitcp").show();
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.statusText);
            }
        });

    })
    $(document).on("click","#create_another_contact_person",function(){
        if($("input").hasClass("is-invalid")||$("input").hasClass("is-valid")){
            $("input").attr("class","form-control");
        }
        $("#success_alert").hide();
        $("input").removeAttr("disabled");
        $("input").val("");
        $("select").removeAttr("disabled");
        $("select").val(1);
        $("#submitcpdiv").show();
    });
    $(document).on("click","#view_created_customer",function(){
        // window.location.href="view_client.html";
    });



});