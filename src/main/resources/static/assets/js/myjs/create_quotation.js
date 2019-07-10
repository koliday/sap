// Class definition

var KTBootstrapDatepicker = function () {

    var arrows;
    if (KTUtil.isRTL()) {
        arrows = {
            leftArrow: '<i class="la la-angle-right"></i>',
            rightArrow: '<i class="la la-angle-left"></i>'
        }
    } else {
        arrows = {
            leftArrow: '<i class="la la-angle-left"></i>',
            rightArrow: '<i class="la la-angle-right"></i>'
        }
    }
    
    // Private functions
    var demos = function () {




        // input group layout for modal demo
        $('#create_date').datepicker({
            rtl: KTUtil.isRTL(),
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows
        });
        $('#valid_from').datepicker({
            rtl: KTUtil.isRTL(),
            todayHighlight: true,
            orientation: "top left",
            templates: arrows
        });
        $('#valid_to').datepicker({
            rtl: KTUtil.isRTL(),
            todayHighlight: true,
            orientation: "top left",
            templates: arrows
        });
        $('#req_date').datepicker({
            rtl: KTUtil.isRTL(),
            todayHighlight: true,
            orientation: "top left",
            templates: arrows
        });

    }

    return {
        // public functions
        init: function() {
            demos(); 
        }
    };
}();

jQuery(document).ready(function() {    
    KTBootstrapDatepicker.init();







});