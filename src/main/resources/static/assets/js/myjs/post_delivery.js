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
                            url: 'http://localhost:8080/getUnpostedDelivery',
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
						<a id="post_delivery_btn" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Post Delivery">\
							<i class="la la-exchange"></i>\
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

    KTDatatableDataLocalDemo.init();


    $(document).on("click","#post_delivery_btn",function(){
        var selectedrow=$(this).parent().parent().parent();
        var deid=selectedrow.children("td:eq(0)").text();
        var deno=selectedrow.children("td:eq(1)").text();
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/postDelivery",
            data:{
               deid:deid
            },
            dataType: "json",
            success: function (data) {
                if(data==1){
                    $("#success_text").text("Post success for delivery No. "+deno);
                    $("#success_alert").show();
                    datatable.reload();
                }else{
                    $("#fail_text").text("Error when posting delivery No. "+deno);
                    $("#fail_alert").show();
                }
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

