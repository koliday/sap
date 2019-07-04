var KTKBootstrapTouchspin = function() {

    // Private functions
    var demos = function() {
        // minimum setup
        $('#add_item_quantity').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',

            min: 1,
            max: 10000,
            step: 1,
            decimals: 0,
        });

    }


    return {
        // public functions
        init: function() {
            demos();
        }
    };
}();


// Initialization
jQuery(document).ready(function() {
    KTKBootstrapTouchspin.init();
});