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
                            url: 'http://localhost:8080/getAllDelivery',
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
                        field: 'deid',
                        title: 'deid',
                        sortable: false,
                        width: 0,
                        type: 'number',
                        textAlign: 'center',
                    },
                    {
                        field: 'deno',
                        title: 'Delivery No.',
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
						<a id="view_delivery_btn" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Create Delivery">\
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
                    },{
                        field: 'quantity',
                        title: 'Quantity',
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                    }, {
                        field: 'quantity',
                        title: 'Picking Quantity',
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                    },{
                        field: 'plant',
                        title: 'Plant',
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                    },{
                        field: 'warehouse',
                        title: 'Warehouse',
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                    },
                ],
            });


        };

        return {
            // Public functions
            init: function() {
                // init dmeo
                demo1();
            },
        };
    }();
    KTDatatableDataLocalDemo.init();
    KTDatatableData.init();

    $(document).on("click","#view_delivery_btn",function(){
        $("#quotation_table").hide();
        var selectedrow=$(this).parent().parent().parent();
        var deid=selectedrow.children("td:eq(0)").text();
        var deno=selectedrow.children("td:eq(1)").text();
        //根据inid得到inquiry基本信息
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/displayDelivery",
            data:{
                deid:deid
            },
            dataType: "json",
            success: function (data) {
                $("#del_no").val(data.deliveryDTO.deno);
                $("#clno").val(data.deliveryDTO.client);
                $("#destination").val(data.deliveryDTO.destination);
                $("#created_by").val(data.deliveryDTO.creator);
                $("#create_date").val(parseDate(data.deliveryDTO.createdate));
                $("#pick_status").val(0);
                $("#del_date").val(parseDate(data.deliveryDTO.deldate));
                $("#picking_date").val(parseDate(data.deliveryDTO.pickdate));
                $("#create_salesOrder_portlet_title").text("Display Delivery No. "+deno);
                var itemlistjson=data.deliveryItemDTOList;
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
    $("#back_btn").click(function () {
        $("#quotation_table").show();
        $("#view_quotation_portlet").hide();
    });
    function parseDate(timestamp) {

        var date = new Date(timestamp);//如果date为13位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        return Y+M+D;
    }



});

