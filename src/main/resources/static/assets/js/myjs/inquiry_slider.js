// Class definition
var KTnoUiSliderDemos = function() {

    // Private functions

     
    var demo1 = function() {
        // init slider
        var slider = document.getElementById('probability_slide');
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
                postfix: ' %',
            })
        });


        // init slider input
        var sliderInput = document.getElementById('probability_input');

        slider.noUiSlider.on('update', function( values, handle ) {
            sliderInput.value = values[handle];
        });

        sliderInput.addEventListener('change', function(){
            slider.noUiSlider.set(this.value);
        });
    }

    return {
        // public functions
        init: function() {
            demo1();
        }
    };
}();

jQuery(document).ready(function() {
    KTnoUiSliderDemos.init();
});


