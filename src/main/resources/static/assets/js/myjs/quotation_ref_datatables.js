var KTDatatableDataLocalDemo = function() {
    // Private functions
    var datatable;
    // demo initializer
    var demo = function() {

        datatable = $('#quo_ref_datatable').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: 'http://localhost:8080/getQuotaionRefInquiry',
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
						<a id="create_quotation_btn" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit Contact Person">\
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
jQuery(document).ready(function () {
    KTDatatableDataLocalDemo.init();
});
