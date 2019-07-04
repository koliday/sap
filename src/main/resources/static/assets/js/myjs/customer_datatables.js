'use strict';
// Class definition

var KTDatatableDataLocalDemo = function() {
	// Private functions

	// demo initializer
	var demo = function() {
		var dataJSONArray = JSON.parse('[' +
			'{"RecordID":1,"CustomerID":"0374-5070","Type":"Individual","Name":"cc","Date":"3/28/1998","Actions":null},\n' +
            '{"RecordID":1,"CustomerID":"0374-5070","Type":"Company","Name":"cc","Date":"3/28/1998","Actions":null},\n' +
            '{"RecordID":1,"CustomerID":"0374-5070","Type":"Individual","Name":"cc","Date":"3/28/1998","Actions":null},\n' +
            '{"RecordID":1,"CustomerID":"0374-5070","Type":"Company","Name":"cc","Date":"3/28/1998","Actions":null},\n' +
            '{"RecordID":1,"CustomerID":"0374-5070","Type":"Individual","Name":"cc","Date":"3/28/1998","Actions":null},\n' +
            '{"RecordID":1,"CustomerID":"0374-5070","Type":"Individual","Name":"cc","Date":"3/28/1998","Actions":null}]');

		var datatable = $('.kt-datatable').KTDatatable({
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
			sortable: true,

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
					field: 'CustomerID',
					title: 'CustomerID',
                    textAlign: 'center',
				}, {
					field: 'Type',
					title: 'Type',
                    textAlign: 'center',
				}, {
                    field: 'Name',
                    title: 'Name',
                    textAlign: 'center',
                },
				{
					field: 'Date',
					title: 'Date',
					type: 'date',
					format: 'MM/DD/YYYY',
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
						<a href="view_client.html" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit details">\
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