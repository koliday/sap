'use strict';
// Class definition


var KTDatatableDataLocalDemo = function() {
    // Private functions

    // demo initializer
    var demo = function() {
        var dataJSONArray = JSON.parse('[' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike"},\n' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike"},\n' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike"},\n' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike"},\n' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike"},\n' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike"},\n' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike"},\n' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike"},\n' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike"}]');

        var datatable = $('#quotation_item_table').KTDatatable({
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

            // column sorting
            sortable: false,

            pagination: true,

            search: {
                input: $('#generalSearch'),
            },

            // columns definition
            columns: [
                {
                    field: 'RecordID',
                    title: '#',
                    sortable: false,
                    width: 20,
                    type: 'number',
                    textAlign: 'center',
                }, {
                    field: 'ItemID',
                    title: 'ItemID',
                    textAlign: 'center',
                }, {
                    field: 'Product',
                    title: 'Product',
                    textAlign: 'center',
                }, {
                    field: 'Quantity',
                    title: 'Quantity',
                    textAlign: 'center',
                },{
                    field: 'Net Value',
                    title: 'Net Value',
                    textAlign: 'center',
                },{
                    field: 'Probability',
                    title: 'Probability',
                    textAlign: 'center',
                },{
                    field: 'Expected Profit',
                    title: 'Expected Profit',
                    textAlign: 'center',
                },
                 {
                    field: 'Discount',
                    title: 'Discount',
                    sortable: false,
                    width: 110,
                    overflow: 'visible',
                    textAlign: 'center',
                    autoHide: false,
                    template: function() {
                        return '\
						<a href="#" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit details">\
							<i class="la la-plus"></i>\
						</a>\
					';
                    },
                }],
        });

        $('#kt_form_status').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        $('#kt_form_type').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#kt_form_status,#kt_form_type').selectpicker();

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