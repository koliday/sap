$(document).ready(function() {

    //cp
    var cpid;
    var cp_name;
    var cp_contact;
    var cp_address;
    var vip;
    var dep_no;
    var callfreq;
    var cp_function;

    $(".back_btn").click(function () {
        $("#edit_client_ref_table").show();
        $("#contact_person_list").hide();
        $("#success_alert").hide();
    });
    $(".submit").click(function () {
        cpid=$(this).data("cpid");
        cp_name=$("#cp_name"+cpid).val();
        cp_contact=$("#cp_contact"+cpid).val();
        vip=$("#vip"+cpid).val();
        dep_no=$("#dep_no"+cpid).val();
        cp_function=$("#cp_function"+cpid).val();
        cp_address=$("#cp_address"+cpid).val();
        callfreq=$("#callfreq"+cpid).val();


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



        // $("input").attr("disabled","disabled");
        // $("select").attr("disabled",true);
        // $("#submit").hide();



        $.ajax({
            type: "POST",
            url: "http://localhost:8080/editcontactperson",
            data:{
                cpid:cpid,
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
                    $("#success_text").text("Save success!");
                    $("#success_alert").slideDown();
                }else{
                    $("#fail_text").text("Error when updating contact person!Please retry!");
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
    $(document).on("click","#edit_client_btn",function(){
        $("#edit_client_ref_table").hide();
        var selectedrow=$(this).parent().parent().parent();
        clid=selectedrow.children("td:eq(0)").text();
        // clno=selectedrow.children("td:eq(1)").text();
        //根据clid查询client信息
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/getcontactperson",
            data:{
                clid:clid
            },
            dataType: "html",
            success: function (data) {
                $("#contact_person_list").html(data);
                $.getScript("/assets/js/myjs/edit_contact_person.js");
                $.getScript("/assets/js/myjs/localdata_select.js");
                $.getScript("/assets/vendors/general/bootstrap-select/dist/js/bootstrap-select.js");
                $("#contact_person_list").show();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.statusText);
            }
        });

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
                    textAlign: 'center',
                    template: function (row) {

                        var date = new Date(row.createtime);//如果date为13位不需要乘1000
                        var Y = date.getFullYear() + '-';
                        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
                        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) ;
                        return Y+M+D+h+m;
                    }

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
						<a id="edit_client_btn" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit Contact Person">\
							<i class="la la-edit"></i>\
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