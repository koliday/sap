$(document).ready(function () {
   $("#create_client_btn").click(function () {
        window.location.href="/createclient";
   });

   $("#back_btn").click(function () {
       $("#client_table_content").show();
       $("#view_client_client").hide();
       $("#view_client_cp").hide();
       $("input").removeAttr("disabled");
       $("select").removeAttr("disabled");
   });
    $(document).on("click","#view_client",function(){
        $("#client_table_content").hide();
        var selectedrow=$(this).parent().parent().parent();
        var clid=selectedrow.children("td:eq(0)").text();
        var clno=selectedrow.children("td:eq(1)").text();
        //加载client
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/getclientbyclid",
            data:{
                clid:clid
            },
            dataType: "json",
            success: function (data) {
                if(data!=null){
                    $("#city").val(data.citystr);
                    $("#client_name").val(data.clname);
                    $("#office_tel").val(data.clcontact);
                    $("#postal_code").val(data.postcode);
                    $("#address").val(data.claddress);

                }else{
                    $("#fail_text").text("Error when getting client information!Please retry!");
                    $("#fail_alert").slideDown();
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.statusText);
            }
        });

        $("#edit_client_title").text("View Client No. "+clno);
        $("#view_client_client").show();




        //加载cp
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/getcpoverview",
            async:false,
            data:{
                clid:clid
            },
            dataType: "html",
            success: function (data) {
                $("#view_client_cp").html(data);

                $.getScript("/assets/js/myjs/localdata_select.js");
                $.getScript("/assets/vendors/general/bootstrap-select/dist/js/bootstrap-select.js");
                $("#view_client_cp").show();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.statusText);
            }
        });

        $("input").attr("disabled","disabled");
        $("select").attr("disabled",true);
    });
});