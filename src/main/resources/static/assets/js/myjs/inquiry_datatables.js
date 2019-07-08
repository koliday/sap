'use strict';
// Class definition
var datatable;
var KTDatatableDataLocalDemo = function() {
    // Private functions

    // demo initializer
    var demo = function() {
        var dataJSONArray = JSON.parse('[' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike","Actions":null},\n' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike","Actions":null},\n' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike","Actions":null},\n' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike","Actions":null},\n' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike","Actions":null},\n' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike","Actions":null},\n' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike","Actions":null},\n' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike","Actions":null},\n' +
            '{"RecordID":1,"ItemID":"0374-5070","Product":"DXTR1220","Quantity":"10","Net Value":"$50","Probability":"75%","Expected Profit":"$10","Description":"For Deluxe Touring Bike","Actions":null}]');

        datatable = $('.kt-datatable').KTDatatable({
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
                    selector: {class: 'kt-checkbox--solid'},
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
                    field: 'Description',
                    title: 'Description',
                    textAlign: 'center',
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
						<a id="test_info" href="#" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit details">\
							<i class="la la-info-circle"></i>\
						</a>\
						<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Delete">\
							<i class="la la-trash"></i>\
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
$(document).ready(function () {
    $(".kt-datatable").on("click","#test_info",function(){
        alert($(this).attr("class"));
        var selected=$(this).parent().parent().parent().children("td:eq(2)").text();
        alert(selected);
        // $("#create_contact_person_title").text("Create Contact Person For Client "+);
        // $("#create_contact_person_content").show();
    });
})