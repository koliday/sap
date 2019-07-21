$(document).ready(function() {

    //client
    var clid;
    var clno;
    var client_name;
    var office_tel;
    var city_select;
    var postal_code;
    var address;

    $("#back_btn").click(function () {
        $("#edit_client_ref_table").show();
        $("#edit_client_content").hide();
        $("#success_alert").hide();
    });
    $("#submit").click(function () {
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




        // $("input").attr("disabled","disabled");
        // $("select").attr("disabled",true);
        $("#submit").hide();



        $.ajax({
            type: "POST",
            url: "http://localhost:8080/editclient",
            data:{
                clid:clid,
                clname:client_name,
                contact:office_tel,
                address:address,
                city:city_select,
                postcode:postal_code
            },
            dataType: "json",
            success: function (data) {
                if(data==1){
                    $("#success_text").text("Save Success!");
                    $("#success_alert").slideDown();
                }else{
                    $("#fail_text").text("Error when saving client!Please retry!");
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
        clno=selectedrow.children("td:eq(1)").text();
        //根据clid查询client信息
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/getclientbyclid",
            data:{
                clid:clid
            },
            dataType: "json",
            success: function (data) {
                if(data!=null){
                    $("#client_name").val(data.clname);
                    $("#office_tel").val(data.clcontact);
                    $("#city_select").val(data.city);
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

      $("#edit_client_title").text("Edit Client No. "+clno);
      $("#edit_client_content").show();
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
                        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                        // var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                        // var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) ;
                        return Y+M+D;
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
						<a id="edit_client_btn" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Create Contact Person">\
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