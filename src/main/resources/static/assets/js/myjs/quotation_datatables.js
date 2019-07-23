'use strict';
// Class definition
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
                },{
                    field: 'itemno',
                    title: 'Item No.',
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
                    field: 'discount',
                    title: 'Discount',
                    textAlign: 'center',
                    overflow: 'visible',
                    autoHide: false,
                    template:'${{discount}}'
                },
                {
                    field: 'actions',
                    title: 'Actions',
                    sortable: false,
                    width: 110,
                    overflow: 'visible',
                    textAlign: 'center',
                    autoHide: false,
                    template: function() {
                        return '\
						<a id="add_discount_btn" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Delete">\
							<i class="la la-plus"></i>\
						</a>\
					';
                    },
                }],
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

    KTDatatableData.init();


    var itemlistjson=[];
    var itemid=0;
    $("#add_discount_to_item").click(function () {

        var item_discount=$("#item_discount").val();

        item_discount=parseInt(item_discount.substring(1));
        $.each(itemlistjson,function(index,item){
            if(item.item_id==itemid){
                item.discount=item_discount;
            }
        });
        itemtable.originalDataSet=itemlistjson;
        itemtable.reload();
        updateagg();
        $("#add_discount_modal").modal("hide");
    })
    $(document).on("click","#add_discount_btn",function(){

        var selectedrow=$(this).parent().parent().parent();
        itemid=selectedrow.children("td:eq(0)").text();
        var netvalue=0;
        $.each(itemlistjson,function(index,item){
            if(item.item_id==itemid){
                netvalue=item.net_value;
            }
        });
        var netvalue=parseInt(netvalue);
        $("#add_discount_modal").modal('show');
        //初始化slider范围
        var ItemDiscountSlider = function() {
            var item = function() {
                // init slider
                itemslider = document.getElementById('item_discount_slider');
                noUiSlider.create(itemslider, {
                    start: [ 0 ],
                    connect: [true, false],
                    step: 1,
                    range: {
                        'min': 0 ,
                        'max': netvalue
                    },
                    format: wNumb({
                        decimals: 0,
                        prefix: '$',
                    })
                });


                // init slider input
                var itemsliderInput = document.getElementById('item_discount');

                itemslider.noUiSlider.on('update', function( values, handle ) {
                    itemsliderInput.value = values[handle];
                });

                itemsliderInput.addEventListener('change', function(){
                    itemslider.noUiSlider.set(this.value);
                });
            }
            return {
                // public functions
                init: function() {
                    item();
                }
            };
        }();
        ItemDiscountSlider.init();
        itemslider.noUiSlider.updateOptions({
            range: {
                'min': 0,
                'max': netvalue
            }
        });

    });

    function updateagg() {
        var aggitem=updateaggitem();
        var aggnet=updateaggnet();

        var expect_profit=(netvalue-aggitem-aggnet).toFixed(2);
        $("#expect_value").val("$"+expect_profit);
    }

    function updateaggitem() {
        var aggitem=0;
        $.each(itemlistjson,function(index,item){
            aggitem+=parseFloat(item.discount);
        });
        aggitem=aggitem.toFixed(2);
        $("#agg_discount_item").val('$'+aggitem);
        return aggitem;
    }
    function updateaggnet() {
        var aggnet=0;
        var discountfromnet=$("#discount_from_net").val();
        discountfromnet=parseInt(discountfromnet.substring(0,discountfromnet.length));
        $.each(itemlistjson,function(index,item){
            aggnet+=parseFloat(item.net_value)-parseFloat(item.discount);
        });
        aggnet=aggnet*discountfromnet/100;
        aggnet=aggnet.toFixed(2);
        $("#agg_discount_net").val('$'+aggnet);
        return aggnet;
    }

    $("#back_btn").click(function () {
        $("#quotation_ref_table").show();
        $("#create_quotation_portlet").hide();
    });

    var inid;
    var itemslider;
    $(document).on("click","#create_quotation_btn",function(){
        $("#quotation_ref_table").hide();
        $("#create_quotation_portlet").show();
        var selectedrow=$(this).parent().parent().parent();
        inid=selectedrow.children("td:eq(0)").text();
        var inno=selectedrow.children("td:eq(1)").text();
        $("#create_quotation_portlet_title").text("Create Quotation For "+inno);

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/getInquiry",
            data:{
                inid:inid
            },
            dataType: "json",
            success: function (data) {
                // $("#inquiry_no").val(data.inquiryDTO.inno);
                $("#clno").val(data.inquiryDTO.client);
                $("#created_by").val(data.inquiryDTO.creator);
                var date = new Date();//如果date为13位不需要乘1000
                var Y = date.getFullYear();
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                $("#create_date").val(M+"/"+D+"/"+Y);
                $("#net_value").val("$"+data.inquiryDTO.netvalue);
                $("#expect_value").val("$"+data.inquiryDTO.netvalue);
                netvalue=parseFloat(data.inquiryDTO.netvalue);
                itemlistjson=data.inquiryItemDTOList;
                $.each(itemlistjson,function(index,item){
                    item.item_id=index+1;
                    item.discount=0;
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
    var netvalue;

    //创建报价单
    $("#add_new_quotation_btn").click(function () {
        //报价单基本信息
        var createdate=$("#create_date").val()
        var validfrom=$("#valid_from").val();
        var validto=$("#valid_to").val();
        var reqdate=$("#req_date").val();
        $("input").attr("disabled","disabled");
        $(".kt-datatable a").hide();
        $("#discount_from_net_slider").attr("disabled","disabled");
        $(this).hide();
        $("#back_btn").hide();
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/createQuotation",
            data:{
                inid:inid,
                item:JSON.stringify(itemlistjson),
                expectvalue:$("#expect_value").val().substring(1),
                discount:$("#discount_from_net").val().substring(0,$("#discount_from_net").val().length-1),
                netdiscount:$("#agg_discount_net").val().substring(1),
                itemdiscount:$("#agg_discount_item").val().substring(1),
                createdate:createdate,
                validfrom:validfrom,
                validto:validto,
                reqdate:reqdate
            },
            dataType: "json",
            success: function (data) {
                if(data>=1){
                    var quid=data;
                    var quidString=data+"";
                    var result="QT";
                    for(var i=0;i<6-quidString.length;i++){
                        result+="0";
                    }
                    result+=quidString;
                    var quno=result;
                    $("#quotation_no").val(quno);
                    $("#success_text").text("Inquiry No. "+quno+" has been created !");
                    $("#success_alert").slideDown();
                }else{
                    $("#fail_text").text("Error when creating quotation!Please retry!");
                    $("#fail_alert").slideDown();
                    $("input").removeAttr("disabled");
                    $("select").removeAttr("disabled");
                    $(".kt-datatable a").show();
                    $("#add_new_quotation_btn").show();
                    $("#back_btn").show();
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.statusText);
            }
        });





    });

    var KTnoUiSliderDemos = function() {

        // Private functions


        var demo1 = function() {
            // init slider
            var slider = document.getElementById('discount_from_net_slider');
            noUiSlider.create(slider, {
                start: [ 0 ],
                connect: [true, false],
                step: 1,
                range: {
                    'min': [ 0 ],
                    'max': [ 100 ]
                },
                format: wNumb({
                    decimals: 0,
                    postfix: '%',
                })
            });


            // init slider input
            var sliderInput = document.getElementById('discount_from_net');

            slider.noUiSlider.on('update', function( values, handle ) {
                sliderInput.value = values[handle];
                updateagg();
            });

            sliderInput.addEventListener('change', function(){
                slider.noUiSlider.set(this.value);
                updateagg();
            });
        }

        return {
            // public functions
            init: function() {
                demo1();
            }
        };
    }();
    KTnoUiSliderDemos.init();

    // var ItemDiscountSlider = function() {
    //     var item = function() {
    //         // init slider
    //         itemslider = document.getElementById('item_discount_slider');
    //         noUiSlider.create(itemslider, {
    //             start: [ 0 ],
    //             connect: [true, false],
    //             step: 1,
    //             range: {
    //                 'min': 0 ,
    //                 'max': 100
    //             },
    //             format: wNumb({
    //                 decimals: 0,
    //                 prefix: '$',
    //             })
    //         });
    //
    //
    //         // init slider input
    //         var itemsliderInput = document.getElementById('item_discount');
    //
    //         itemslider.noUiSlider.on('update', function( values, handle ) {
    //             itemsliderInput.value = values[handle];
    //         });
    //
    //         itemsliderInput.addEventListener('change', function(){
    //             itemslider.noUiSlider.set(this.value);
    //         });
    //     }
    //     return {
    //         // public functions
    //         init: function() {
    //             item();
    //         }
    //     };
    // }();
    // ItemDiscountSlider.init();
});


