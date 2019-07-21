$(document).ready(function() {



    var subTableInit;
    var plantdatatable;
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
                            url: 'http://localhost:8080/getAllPlant',
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
                        field: 'plid',
                        title: 'plid',
                        sortable: false,
                        width: 0,
                        type: 'number',
                        textAlign: 'center',
                    },
                    {
                        field: 'plno',
                        title: 'Plant No.',
                        textAlign: 'center',
                        visible:false
                    }, {
                        field: 'plname',
                        title: 'Name',
                        textAlign: 'center',
                    }, {
                        field: 'pladdress',
                        title: 'Address',
                        textAlign: 'center',
                    },{
                        field: 'Actions',
                        title: 'Actions',
                        sortable: false,
                        width: 110,
                        overflow: 'visible',
                        textAlign: 'center',
                        autoHide: false,
                        template: function() {
                            return '\
						<a id="view_plant_btn" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="View Plant">\
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

    var KTDatatableChildDataLocalDemo = function() {
        // Private functions



       subTableInit = function(e) {
            $('<div/>').attr('id', 'plant_datatable_' + e.data.RecordID).appendTo(e.detailCell).KTDatatable({
                data: {
                    type: 'local',
                    source: e.data.inventoryDTOList,
                    pageSize: 10,
                },

                // layout definition
                layout: {
                    scroll: true,
                    height: 300,
                    footer: false,

                    // enable/disable datatable spinner.
                    spinner: {
                        type: 1,
                        theme: 'default',
                    },
                },

                sortable: true,
                detail: {
                    title: 'Load sub table',
                },
                // columns definition
                columns: [
                    {
                        field: 'pno',
                        title: 'Product No.',
                    }, {
                        field: 'pname',
                        title: 'Name',
                    }, {
                        field: 'price',
                        title: 'Price',
                    }, {
                        field: 'cost',
                        title: 'Cost',
                    },
                    {
                        field: 'available',
                        title: 'Available',
                    },
                    {
                        field: 'waittodelivery',
                        title: 'Wait-To-Delivery',
                    },
                ],
            });
        };

        // demo initializer
        var mainTableInit = function() {

            var dataJSONArray = JSON.parse('[]');

            plantdatatable = $('#plant_datatable').KTDatatable({
                // datasource definition
                data: {
                    type: 'local',
                    source: dataJSONArray,
                    pageSize: 10, // display 20 records per page
                },

                // layout definition
                layout: {
                    scroll: false,
                    height: null,
                    footer: false,
                },

                sortable: true,

                filterable: false,

                pagination: true,

                detail: {
                    title: 'Load sub table',
                    content: subTableInit,
                },

                search: {
                    input: $('#generalSearch'),
                },

                // columns definition
                columns: [
                    {
                        field: 'RecordID',
                        title: '',
                        sortable: false,
                        width: 30,
                        textAlign: 'center',
                    },  {
                        field: 'whno',
                        title: 'Warehouse No.',
                    }, {
                        field: 'whname',
                        title: 'Name',
                    }, {
                        field: 'whaddress',
                        title: 'Address',
                    },
                ],
            });


        };

        return {
            // Public functions
            init: function() {
                // init dmeo
                mainTableInit();
            },
        };
    }();
    KTDatatableDataLocalDemo.init();
    KTDatatableChildDataLocalDemo.init();

    $(document).on("click","#view_plant_btn",function(){
        $("#quotation_table").hide();
        var selectedrow=$(this).parent().parent().parent();
        var plid=selectedrow.children("td:eq(0)").text();
        var plno=selectedrow.children("td:eq(1)").text();
        //根据inid得到inquiry基本信息
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/getPlant",
            data:{
                plid:plid
            },
            dataType: "json",
            success: function (data) {
                var itemlistjson=data;

                $.each(itemlistjson,function(index,item){
                    item.RecordID=index+1;
                   });
                plantdatatable.originalDataSet=itemlistjson;
                plantdatatable.reload();
                // subTableInit.originalDataSet=itemlistjson.inventoryDTOList;
                // subTableInit.reload();
                $("#inventory_title").text("Product For Plant No. "+plno);
                $("#view_quotation_portlet").show();
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

