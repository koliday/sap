$(document).ready(function() {



    var datatable;
    var KTDatatableDataLocalDemo = function() {
        // Private functions

        // demo initializer
        var demo = function() {

            datatable = $('#all_quotation_table').KTDatatable({
                // datasource definition
                data: {
                    type: 'remote',
                    source: {
                        read: {
                            url: 'http://localhost:8080/getSalesOrderRefQuotation',
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
                        field: 'quid',
                        title: 'quid',
                        sortable: false,
                        width: 0,
                        type: 'number',
                        textAlign: 'center',
                    },
                    {
                        field: 'quno',
                        title: 'Quotation No.',
                        textAlign: 'center',
                        visible:false
                    }, {
                        field: 'client',
                        title: 'Client',
                        textAlign: 'center',
                    }, {
                        field: 'creator',
                        title: 'Creator',
                        textAlign: 'center',
                    },
                    {
                        field: 'createdate',
                        title: 'Create Date',
                        type: 'date',
                        textAlign: 'center',
                        template: function (row) {

                            var date = new Date(row.createdate);//如果date为13位不需要乘1000
                            var Y = date.getFullYear() + '-';
                            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                            var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
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
						<a id="view_quotation_btn" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit Contact Person">\
							<i class="la la-plus"></i>\
						</a>\
					';
                        },
                    }],

            });


        };

        return {
            // Public functions
            init: function() {
                // init dmeo
                demo();
            },
        };
    }();

    var itemtable;
    var KTDatatableData = function() {
        // Private functions

        // demo initializer
        var demo1 = function() {

            var dataJSONArray = JSON.parse('[]');


            itemtable = $('#item_datatable').KTDatatable({
                // datasource definition
                data: {
                    type: 'local',
                    source: dataJSONArray,
                    pageSize: 10,
                },

                // layout definition
                layout: {
                    scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                    // height: 450, // datatable's body's fixed height
                    footer: false, // display/hide footer
                },
                noRecords: 'No items added',
                // column sorting
                sortable: false,

                pagination: true,

                search: {
                    input: $('#generalSearch'),
                },

                // columns definition
                columns: [
                    {
                        field: 'item_id',
                        title: '#',
                        width:50,
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                    }, {
                        field: 'itemno',
                        title: 'Item No.',
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                    },{
                        field: 'pname',
                        title: 'Product',
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                    }, {
                        field: 'quantity',
                        title: 'Quantity',
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                    },{
                        field: 'netvalue',
                        title: 'Net Value',
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                        template:'${{netvalue}}'
                    },{
                        field: 'discount',
                        title: 'Discount',
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                        template:'${{discount}}'
                    }
                    ],
            });

            // $('#kt_form_status').on('change', function() {
            //     datatable.search($(this).val().toLowerCase(), 'Status');
            // });
            //
            // $('#kt_form_type').on('change', function() {
            //     datatable.search($(this).val().toLowerCase(), 'Type');
            // });
            //
            // $('#kt_form_status,#kt_form_type').selectpicker();

        };

        return {
            // Public functions
            init: function() {
                // init dmeo
                demo1();
            },
        };
    }();
    jQuery(document).ready(function() {
        KTDatatableDataLocalDemo.init();
        KTDatatableData.init();
    });

    var quid;

    $("#back_btn").click(function () {
        $("#quotation_table").show();
        $("#view_quotation_portlet").hide();
    });

    $("#add_new_salesorder_btn").click(function () {
        var createdate=$("#create_date").val()
        var validfrom=$("#valid_from").val();
        var validto=$("#valid_to").val();
        var reqdate=$("#req_date").val();
        $("input").attr("disabled","disabled");
        $(".kt-datatable a").hide();
        $("#discount_from_net_slider").attr("disabled","disabled");
        $(this).hide();
        $("#back_btn").hide();
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/createSalesOrder",
            data:{
                quid:quid,
                createdate:createdate,
                validfrom:validfrom,
                validto:validto,
                reqdate:reqdate
            },
            dataType: "json",
            success: function (data) {
                if(data>=1){
                    var oridString=data+"";
                    var result="OR";
                    for(var i=0;i<6-oridString.length;i++){
                        result+="0";
                    }
                    result+=oridString;
                    var orno=result;
                    $("#salesorder_no").val(orno);
                    $("#success_text").text("Sales Order No. "+orno+" has been created !");
                    $("#success_alert").slideDown();
                }else{
                    $("#fail_text").text("Error when creating sales order!Please retry!");
                    $("#fail_alert").slideDown();
                    $("input").removeAttr("disabled");
                    $("select").removeAttr("disabled");
                    $(".kt-datatable a").show();
                    $("#add_new_salesorder_btn").show();
                    $("#back_btn").show();
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.statusText);
            }
        });
    });
    $(document).on("click","#view_quotation_btn",function(){
        $("#quotation_table").hide();
        var selectedrow=$(this).parent().parent().parent();
        quid=selectedrow.children("td:eq(0)").text();
        // clno=selectedrow.children("td:eq(1)").text();
        //根据inid得到inquiry基本信息
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/getQuotation",
            data:{
               quid:quid
            },
            dataType: "json",
            success: function (data) {
                $("#clno").val(data.quotationDTO.client);
                $("#created_by").val(data.quotationDTO.creator);
                var date = new Date();//如果date为13位不需要乘1000
                var Y = date.getFullYear();
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                $("#create_date").val(M+"/"+D+"/"+Y);
                $("#net_value").val("$"+data.quotationDTO.expectvalue);
                // $("#expect_value").val(data.quotationDTO.expectvalue);
                // $("#valid_from").val(parseDate(data.quotationDTO.validfrom));
                // $("#valid_to").val(parseDate(data.quotationDTO.validto));
                // $("#req_date").val(parseDate(data.quotationDTO.reqdate));
                $("#discount_from_net").val(data.quotationDTO.discount+"%");
                $("#agg_discount_item").val("$"+data.quotationDTO.itemdiscount);
                $("#agg_discount_net").val("$"+data.quotationDTO.netdiscount);
                $("#create_quotation_portlet_title").text("Create SalesOrder For Quotation "+data.quotationDTO.quno);
                var itemlistjson=data.quotationItemDTOList;

                $.each(itemlistjson,function(index,item){
                    item.item_id=index+1;
                });
                itemtable.originalDataSet=itemlistjson;
                itemtable.reload();
                $("#view_quotation_portlet").show();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.statusText);
            }
        });

    });

    function parseDate(timestamp) {

        var date = new Date(timestamp);//如果date为13位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        return Y+M+D;
    }




});

