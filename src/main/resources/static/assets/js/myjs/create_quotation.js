$(document).ready(function () {
    $("#quotation_reference_portlet").on("click","#create_quotation_btn",function(event){
        $("#create_quotation_portlet").show();
        $("#quotation_reference_portlet").hide();
    });
});