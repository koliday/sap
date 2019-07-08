$(document).ready(function() {

    //cp
    var clid;
    var cp_name;
    var cp_contact;
    var cp_address;
    var vip=1;
    var dep_no=1;
    var callfreq=1;
    var cp_function=1;

    $("#back_btn").click(function () {
        $("#cp_ref_table").show();
        $("#create_contact_person_content").hide();

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
        $("#submit").hide();



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
                    $("#submit").show();
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.statusText);
            }
        });

    });
    $(document).on("click","#create_another_contact_person",function(){
        $("#success_alert").hide();
        if($("input").hasClass("is-invalid")||$("input").hasClass("is-valid")){
            $("input").attr("class","form-control");
        }
        $("input").removeAttr("disabled");
        $("input").val("");
        $("select").removeAttr("disabled");
        $("select").val(1);
        $("#submit").show();
    });
    $(document).on("click","#create_contact_person_btn",function(){
        $("#cp_ref_table").hide();
        var selectedrow=$(this).parent().parent().parent();
        clid=selectedrow.children("td:eq(0)").text();
        clno=selectedrow.children("td:eq(1)").text();
      $("#create_contact_person_title").text("Create Contact Person For Client "+clno);
      $("#create_contact_person_content").show();
    });





});


var clid=0;
var clno=0;
var datatable;
var KTDatatableDataLocalDemo = function() {
    // Private functions

    // demo initializer
    var demo = function() {

        datatable = $('.kt-datatable').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: 'http://localhost:8080/getAllClients',
                    },
                },
                pageSize: 10,
            },

            // layout definition
            layout: {
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                // height: 450, // datatable's body's fixed height
                footer: false, // display/hide footer
            },

            // column sorting
            sortable: true,

            pagination: true,

            search: {
                input: $('#generalSearch'),
            },

            // columns definition
            columns: [
                {
                    field: 'clid',
                    title: 'clid',
                    sortable: false,
                    width: 0,
                    type: 'number',
                    textAlign: 'center',
                },
                {
                    field: 'clno',
                    title: 'Client No.',
                    textAlign: 'center',
                    visible:false
                }, {
                    field: 'clname',
                    title: 'Name',
                    textAlign: 'center',
                }, {
                    field: 'creator',
                    title: 'Creator',
                    textAlign: 'center',
                },
                {
                    field: 'createtime',
                    title: 'Create Time',
                    type: 'date',
                    format: 'MM/DD/YYYY',
                    textAlign: 'center',
                }, {
                    field: 'Actions',
                    title: 'Actions',
                    sortable: false,
                    width: 110,
                    overflow: 'visible',
                    textAlign: 'center',
                    autoHide: false,
                    template: function() {
                        return '\
						<a id="create_contact_person_btn" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Create Contact Person">\
							<i class="la la-plus"></i>\
						</a>\
					';
                    },
                }],

        });

        // $('#kt_form_status').on('change', function() {
        // 	datatable.search($(this).val().toLowerCase(), 'Status');
        // });
        //
        // $('#kt_form_type').on('change', function() {
        // 	datatable.search($(this).val().toLowerCase(), 'Type');
        // });

        // $('#kt_form_status,#kt_form_type').selectpicker();

    };

    return {
        // Public functions
        init: function() {
            // init dmeo
            demo();
        },
    };
}();

jQuery(document).ready(function() {
    KTDatatableDataLocalDemo.init();
});