'use strict';
// Class definition

var KTDatatableDataLocalDemo = function() {
	// Private functions

	// demo initializer
	var demo = function() {

		var datatable = $('.kt-datatable').KTDatatable({
			// datasource definition
			data: {
				type: 'remote',
                source: {
                    read: {
                        url: 'http://localhost:8080/getAllClients',
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
                    field: 'clid',
                    title: 'clid',
                    sortable: false,
                    width: 0,
                    type: 'number',
                    textAlign: 'center',
                },
				{
					field: 'clno',
					title: 'Client No.',
                    textAlign: 'center',
				}, {
					field: 'clname',
					title: 'Name',
                    textAlign: 'center',
				}, {
                    field: 'creator',
                    title: 'Creator',
                    textAlign: 'center',
                },
				{
					field: 'createtime',
					title: 'Create Time',
					type: 'date',
                    textAlign: 'center',
                    template: function (row) {

                        var date = new Date(row.createtime);
                        var Y = date.getFullYear() + '-';
                        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) ;
                        // var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                        // var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) ;
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
						<a href="javascript:;" id="view_client" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit details">\
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