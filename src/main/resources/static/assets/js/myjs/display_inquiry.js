$(document).ready(function() {



    var datatable;
    var KTDatatableDataLocalDemo = function() {
        // Private functions

        // demo initializer
        var demo = function() {

            datatable = $('#all_inquiry_table').KTDatatable({
                // datasource definition
                data: {
                    type: 'remote',
                    source: {
                        read: {
                            url: 'http://localhost:8080/getAllInquiry',
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
                        field: 'inid',
                        title: 'inid',
                        sortable: false,
                        width: 0,
                        type: 'number',
                        textAlign: 'center',
                    },
                    {
                        field: 'inno',
                        title: 'Inquiry No.',
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
						<a id="view_inquiry_btn" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit Contact Person">\
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
                        field: 'net_value',
                        title: 'Net Value',
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                        template:'${{net_value}}'
                    },{
                        field: 'prob',
                        title: 'Probability',
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                        template:'{{prob}}%'
                    },{
                        field: 'exp_profit',
                        title: 'Expected Profit',
                        textAlign: 'center',
                        overflow: 'visible',
                        autoHide: false,
                        template:'${{exp_profit}}'
                    },
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

    var inid;

    $("#back_btn").click(function () {
        $("#inquiry_table").show();
        $("#view_inquiry_portlet").hide();
    });

    $(document).on("click","#view_inquiry_btn",function(){
        $("#inquiry_table").hide();
        var selectedrow=$(this).parent().parent().parent();
        inid=selectedrow.children("td:eq(0)").text();
        // clno=selectedrow.children("td:eq(1)").text();
        //根据inid得到inquiry基本信息
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/getInquiry",
            data:{
               inid:inid
            },
            dataType: "json",
            success: function (data) {
                $("#inquiry_no").val(data.inquiryDTO.inno);
                $("#clno").val(data.inquiryDTO.client);
                $("#created_by").val(data.inquiryDTO.creator);
                $("#create_date").val(parseDate(data.inquiryDTO.createdate));
                $("#net_value").val("$"+data.inquiryDTO.netvalue);
                $("#expect_value").val("$"+data.inquiryDTO.expectprofit);
                $("#valid_from").val(parseDate(data.inquiryDTO.validfrom));
                $("#valid_to").val(parseDate(data.inquiryDTO.validto));
                $("#create_inquiry_portlet_title").text("Display Inquiry NO. "+data.inquiryDTO.inno);
                var itemlistjson=data.inquiryItemDTOList;

                $.each(itemlistjson,function(index,item){
                    item.item_id=index+1;
                });
                itemtable.originalDataSet=itemlistjson;
                itemtable.reload();
                $("#view_inquiry_portlet").show();
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

