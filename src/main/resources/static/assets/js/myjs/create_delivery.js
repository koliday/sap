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
                            url: 'http://localhost:8080/getDeliveryRef',
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
						<a id="create_delivery_btn" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Create Delivery">\
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
                    },{
                        field: 'actions',
                        title: 'Actions',
                        sortable: false,
                        width: 110,
                        overflow: 'visible',
                        textAlign: 'center',
                        autoHide: false,
                        template: function() {
                            return '\
						<a id="change_item_btn" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Change">\
							<i class="la la-plus"></i>\
						</a>\
					';
                        },
                    }
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
    jQuery(document).ready(function() {
        KTDatatableDataLocalDemo.init();
        KTDatatableData.init();
    });

    var orid;

    $("#back_btn").click(function () {
        $("#quotation_table").show();
        $("#view_quotation_portlet").hide();
    });

    $(document).on("click","#change_item_btn",function(){

        $("#change_item_modal").modal('show');
        var selectedrow=$(this).parent().parent().parent();
        itemid=selectedrow.children("td:eq(0)").text();
        warehouseselect();
    });

    function warehouseselect(){
        var whid=$("#warehouse_select").val();
        var pid=0;
        var quantity=0;
        $.each(itemlistjson,function(index,item){
            if(item.item_id==itemid){
                pid=item.pid;
                quantity=item.quantity;
            }
        });
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/getQuantity",
            data:{
                pid:pid,
                whid:whid
            },
            dataType: "json",
            success: function (data) {
                if(data==null){
                    $("#available").val("此仓库无该商品！");
                    $("#change_warehouse_for_item").attr("disabled","disabled");
                } else {
                    $("#available").val(data);
                    if(quantity>parseInt(data)){
                        $("#change_warehouse_for_item").attr("disabled","disabled");
                    }else{
                        $("#change_warehouse_for_item").removeAttr("disabled");
                    }
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.statusText);
            }
        });
    }

    $("#warehouse_select").change(function () {
       warehouseselect();
    });

    $("#change_warehouse_for_item").click(function () {
        var plantwh=$("#warehouse_select").find("option:selected").text();
        var plantname=plantwh.split("(",2)[1];
        plantname=plantname.substring(0,plantname.length-1);
        var warehousename=plantwh.split("(",2)[0];
        var warehouseid=$("#warehouse_select").val();
        $.each(itemlistjson,function(index,item){
            if(item.item_id==itemid){
                item.plant=plantname;
                item.warehouse=warehousename;
                item.whid=warehouseid;
            }
        });
        itemtable.originalDataSet=itemlistjson;
        itemtable.reload();

        $("#change_item_modal").modal('hide');
    });
    var itemlistjson;
    var itemid;
    $(document).on("click","#create_delivery_btn",function(){
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

                $("#clno").val(data.salesOrderDTO.client);
                $("#destination").val(data.salesOrderDTO.destination);
                $("#created_by").val(data.salesOrderDTO.creator);
                var date = new Date();//如果date为13位不需要乘1000
                var Y = date.getFullYear();
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                $("#create_date").val(M+"/"+D+"/"+Y);
                $("#pick_status").val(0);

                $("#create_salesOrder_portlet_title").text("Create Delivery For Order "+data.salesOrderDTO.orno);
                itemlistjson=data.salesOrderItemDTOList;

                $.each(itemlistjson,function(index,item){
                    item.item_id=index+1;
                    item.plant='Unknown';
                    item.warehouse='Unknown';
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
    $("#add_new_delivery_btn").click(function () {
        var createdate=$("#create_date").val()
        var deldate=$("#del_date").val();
        var pickdate=$("#picking_date").val();
        var overallpickingstatus=$("#pick_status").val();
        var destination=$("#destination").val();
        $("input").attr("disabled","disabled");
        $(".kt-datatable a").hide();
        $(this).hide();
        $("#back_btn").hide();
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/createDelivery",
            data:{
                orid:orid,
                createdate:createdate,
                deldate:deldate,
                pickdate:pickdate,
                pickingstatus:overallpickingstatus,
                destination:destination,
                itemlistjson:JSON.stringify(itemlistjson)
            },
            dataType: "json",
            success: function (data) {
                if(data>=1){
                    var oridString=data+"";
                    var result="DE";
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



});

