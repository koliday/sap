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
                            url: 'http://localhost:8080/getAllInvoice',
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
                        field: 'ivid',
                        title: 'ivid',
                        sortable: false,
                        width: 0,
                        type: 'number',
                        textAlign: 'center',
                    },
                    {
                        field: 'ivno',
                        title: 'Invoice No.',
                        textAlign: 'center',
                        visible:false
                    }, {
                        field: 'payer',
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
						<a id="view_invoice_btn" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="View Invoice">\
							<i class="la la-info"></i>\
						</a>\
						<a id="preview_invoice_btn" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Preview Invoice">\
						    <i class="la la-info"></i>\
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
                        field: 'price',
                        title: 'Price',
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                    },{
                        field: 'quantity',
                        title: 'Quantity',
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                    },{
                        field: 'discount',
                        title: 'Discount',
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                        template:'${{discount}}'
                    },{
                        field: 'orderdiscount',
                        title: 'Order Discount',
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                        template:'{{orderdiscount}}%'
                    },{
                        field: 'finalvalue',
                        title: 'Net Value',
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                        template:'${{finalvalue}}'
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
    KTDatatableDataLocalDemo.init();
    KTDatatableData.init();

    $(document).on("click","#view_invoice_btn",function(){
        $("#quotation_table").hide();
        var selectedrow=$(this).parent().parent().parent();
        var ivid=selectedrow.children("td:eq(0)").text();
        var ivno=selectedrow.children("td:eq(1)").text();
        //根据inid得到inquiry基本信息
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/displayInvoice",
            data:{
                ivid:ivid
            },
            dataType: "json",
            success: function (data) {
                $("#inv_no").val(data.invoiceDTO.ivno);
                $("#clno").val(data.invoiceDTO.payer);
                $("#created_by").val(data.invoiceDTO.creator);
                $("#create_date").val(parseDate(data.invoiceDTO.createdate));
                $("#billing_date").val(parseDate(data.invoiceDTO.billingdate));
                $("#net_value").val(data.invoiceDTO.netvalue);
                $("#create_salesOrder_portlet_title").text("Display Invoice No. "+data.invoiceDTO.ivno)
                var itemlistjson=data.salesOrderItemDTOList;

                $.each(itemlistjson,function(index,item){
                    item.item_id=index+1;
                    item.finalvalue=((parseFloat(item.netvalue)-parseFloat(item.discount))*(1-parseInt(item.orderdiscount)/100)).toFixed(2);
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

    $(document).on("click","#preview_invoice_btn",function(){
        var selectedrow=$(this).parent().parent().parent();
        var ivid=selectedrow.children("td:eq(0)").text();
        // window.open("http://localhost:8080/previewInvoice?ivid="+ivid,"blank");
        //根据inid得到inquiry基本信息
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/previewInvoice",
            data:{
                ivid:ivid
            },
            dataType: "html",
            success: function (data) {
                var newWin = window.open('', '_blank');
                newWin.document.write(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.statusText);
            }
        });

    });

    $("#back_btn").click(function () {
        $("#view_quotation_portlet").hide();
        $("#quotation_table").show();
    });
    function parseDate(timestamp) {

        var date = new Date(timestamp);//如果date为13位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        return Y+M+D;
    }



});

