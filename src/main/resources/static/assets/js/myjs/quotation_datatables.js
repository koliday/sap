'use strict';
// Class definition
var KTDatatableChildDataLocalDemo = function() {
    // Private functions






    var subTableInit = function(e) {
        $('<div/>').attr('id', 'inquiry_to_quotation_table_' + e.data.RecordID).appendTo(e.detailCell).KTDatatable({
            data: {
                type: 'local',
                source: e.data.Inquiries,
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

            // columns definition
            columns: [
                 {
                    field: 'ItemID',
                    title: 'ItemID',
                }, {
                    field: 'Product',
                    title: 'Product',
                }, {
                    field: 'Quantity',
                    title: 'Quantity',
                }, {
                    field: 'Net Value',
                    title: 'Net Value',
                },
                {
                    field: 'Probability',
                    title: 'Probability',
                },
                {
                    field: 'Expected Profit',
                    title: 'Expected Profit',
                },
                {
                    field: 'Description',
                    title: 'Description',
                },
            ],
        });
    };

    // demo initializer
    var mainTableInit = function() {

        var dataJSONArray = JSON.parse(
            '[{"RecordID":1,"InquiryID":"10001","Client":"Pee","Creator":"cc","Time":"2019-7-4 20:21","Actions":null,"Inquiries":[{"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike"}]}]');

        var datatable = $('#inquiry_to_quotation_table').KTDatatable({
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
                }, {
                    field: 'InquiryID',
                    title: 'InquiryID',
                }, {
                    field: 'Client',
                    title: 'Client',
                }, {
                    field: 'Creator',
                    title: 'Creator',
                }, {
                    field: 'Time',
                    title: 'Time',
                },  {
                    field: 'Actions',
                    width: 130,
                    title: 'Actions',
                    sortable: false,
                    overflow: 'visible',
                    template: function() {
                        return '\
		                  <button class="btn btn-primary">Create</button>\
		                  \
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
            mainTableInit();
        },
    };
}();

jQuery(document).ready(function() {
    KTDatatableChildDataLocalDemo.init();

});