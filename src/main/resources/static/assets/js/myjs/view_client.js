$(document).ready(function () {
   $("input").not("#create_contact_person_form input").attr("disabled","disabled");
   $("#edit_client_btn").click(function () {
       $("input").removeAttr("disabled");
       $(this).hide();
       $("#save_edit_btn").show();
   });
    $("#save_edit_btn").click(function () {
        $(this).hide();
        $("input").not("#create_contact_person_form input").attr("disabled","disabled");
        $("#edit_client_btn").show();
    });

});