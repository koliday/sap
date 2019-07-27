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
                            url: 'http://localhost:8080/getAllSalesOrder',
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
                        field: 'orid',
                        title: 'orid',
                        sortable: false,
                        width: 0,
                        type: 'number',
                        textAlign: 'center',
                    },
                    {
                        field: 'orno',
                        title: 'Order No.',
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
							<i class="la la-info-circle"></i>\
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

    var orid;

    $("#back_btn").click(function () {
        $("#quotation_table").show();
        $("#view_quotation_portlet").hide();
    });

    $(document).on("click","#view_quotation_btn",function(){
        $("#quotation_table").hide();
        var selectedrow=$(this).parent().parent().parent();
        orid=selectedrow.children("td:eq(0)").text();
        // clno=selectedrow.children("td:eq(1)").text();
        //根据inid得到inquiry基本信息
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/getSalesOrder",
            data:{
               orid:orid
            },
            dataType: "json",
            success: function (data) {
                $("#order_no").val(data.salesOrderDTO.orno);
                $("#clno").val(data.salesOrderDTO.client);
                $("#created_by").val(data.salesOrderDTO.creator);
                $("#create_date").val(parseDate(data.salesOrderDTO.createdate));
                $("#net_value").val("$"+data.salesOrderDTO.netvalue);
                $("#valid_from").val(parseDate(data.salesOrderDTO.validfrom));
                $("#valid_to").val(parseDate(data.salesOrderDTO.validto));
                $("#req_date").val(parseDate(data.salesOrderDTO.reqdate));
                $("#discount_from_net").val(data.salesOrderDTO.discount+"%");
                $("#agg_discount_item").val("$"+data.salesOrderDTO.itemdiscount);
                $("#agg_discount_net").val("$"+data.salesOrderDTO.netdiscount);
                $("#create_salesOrder_portlet_title").text("Display Quotation NO. "+data.salesOrderDTO.orno);
                var itemlistjson=data.salesOrderItemDTOList;

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

