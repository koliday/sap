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
                }, {
                    field: 'product',
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
                // {
                //     field: 'Description',
                //     title: 'Description',
                //     textAlign: 'center',
                // },
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
						<a id="delete_item_btn" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Delete">\
							<i class="la la-minus-circle"></i>\
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


    var itemJSONData=[];
    var JSONDataSize=0;
    $("#add_item_to_inquiry").click(function () {

        var add_item_select_id=$("#add_item_select").val();
        var add_item_select_name=$("#add_item_select").find("option:selected").text();;
        var price=$("#add_item_select").find("option:selected").data("price");
        var quantity=$("#add_item_quantity").val();
        var probability=$("#probability_input").val();
        probability=parseInt(probability.substring(0,probability.length));
        var net_value=price*quantity;
        net_value=net_value.toFixed(2);
        var exp_profit=net_value*probability/100;
        exp_profit=exp_profit.toFixed(2);
        JSONDataSize++;
        // var desc=$("#item_desc").val();
        var newItemJSONData={
            "item_id":JSONDataSize,
            "product_id":add_item_select_id,
            "product":add_item_select_name,
            "quantity":quantity,
            "price":price,
            "net_value":net_value,
            "prob":probability,
            "exp_profit":exp_profit,
            // "Description":desc,
            "actions":null
        };
        itemJSONData.push(newItemJSONData);
        itemtable.originalDataSet=itemJSONData;
        itemtable.reload();
        updateNetValue();
        updateExpProfit()
        $("#add_item_modal").modal("hide");
    })
    $(document).on("click","#delete_item_btn",function(){
        JSONDataSize--;
        var deletedrow=$(this).parent().parent().parent();
        var deleteIndex=deletedrow.children("td:eq(0)").text();
        // delete itemJSONData[deleteIndex-1];
        itemJSONData.splice(deleteIndex-1,1);
        //重新编号
        $.each(itemJSONData,function(index,item){
            item.item_id=index+1;
        });
        itemtable.originalDataSet=itemJSONData;
        itemtable.reload();
        updateNetValue();
        updateExpProfit()
    });

    function updateNetValue() {
        var netvalue=0;
        $.each(itemJSONData,function(index,item){
            netvalue+=parseFloat(item.net_value);
        });
        netvalue=netvalue.toFixed(2);
        $("#net_value").val('$'+netvalue);
        return netvalue;
    }
    function updateExpProfit() {
        var pro=0;
        $.each(itemJSONData,function(index,item){
            pro+=parseFloat(item.exp_profit);
        });
        pro=pro.toFixed(2);
        $("#expect_value").val('$'+pro);
        return pro;
    }


    var clid;
    var sum_net_value=0;
    var sum_expected_value=0;
    $(document).on("click","#create_inquiry_btn",function(){
        $("#inq_ref_table").hide();
        var selectedrow=$(this).parent().parent().parent();
        clid=selectedrow.children("td:eq(0)").text();
        var clno=selectedrow.children("td:eq(1)").text();
        //初始化portlet
        $("#create_inquiry_portlet_title").text("Create Inquiry For Client "+clno);
        $("#clno").val(clno);
        $("#created_by").val($("#username").text());
        $("#net_value").val("$"+sum_net_value);
        $("#expect_value").val("$"+sum_expected_value);
        var date = new Date();//如果date为13位不需要乘1000
        var Y = date.getFullYear();
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        $("#create_date").val(M+"/"+D+"/"+Y);
        $("#create_inquiry_portlet").show();
    });


    //创建询价单
    $("#add_new_inquiry_btn").click(function () {
        //获取询价单基本信息
        sum_net_value=updateNetValue();
        sum_expected_value=updateExpProfit();
        var createdate=$("#create_date").val()
        var validfrom=$("#valid_from").val();
        var validto=$("#valid_to").val();
        if(validfrom=="" || validto==" " ||itemJSONData.length==0)
            return;
        $("#valid_from").attr("disabled","disabled");
        $("#valid_to").attr("disabled","disabled");
        $(".kt-datatable a").hide();
        $("#add_item_btn").hide();
        $(this).hide();
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/createInquiry",
            data:{
                item:JSON.stringify(itemJSONData),
                clid:clid,
                sum_net_value:sum_net_value,
                sum_expected_value:sum_expected_value,
                createdate:createdate,
                validfrom:validfrom,
                validto:validto
            },
            dataType: "json",
            success: function (data) {
                if(data>=1){
                    var inid=data;
                    var inidString=data+"";
                    var result="IN";
                    for(var i=0;i<6-inidString.length;i++){
                        result+="0";
                    }
                    result+=inidString;
                    var inno=result;
                    $("#inquiry_no").val(inno);
                    $("#success_text").text("Inquiry No. "+inno+" has been created !");
                    $("#success_alert").slideDown();
                }else{
                    $("#fail_text").text("Error when inquiry!Please retry!");
                    $("#fail_alert").slideDown();
                    $("input").removeAttr("disabled");
                    $("select").removeAttr("disabled");
                    $("#add_new_inquiry_btn").show();
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.statusText);
            }
        });





    });

});
