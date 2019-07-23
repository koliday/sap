var yearly_inquiry_and_orders_vol_chart_data;

var conversion_rate_data;
var conversion_rate_year;
var KTMorrisChartsDemo = function() {

    // Private functions


    var demo3 = function() {
        // BAR CHART
        new Morris.Bar({
            element: 'yearly_inquiry_and_orders_vol_chart',
            data: yearly_inquiry_and_orders_vol_chart_data,
            xkey: 'year',
            ykeys: ['inquiryCount', 'orderCount'],
            labels: ['Inquiry', 'Order'],
            barColors: ['#2abe81', '#24a5ff']
        });
    }

        // [
        // {
        //     y: '2014',
        //     a: 100,
        //     b: 90
        // },
        //     {
        //         y: '2015',
        //         a: 75,
        //         b: 65
        //     },
        //     {
        //         y: '2016',
        //         a: 50,
        //         b: 40
        //     },
        //     {
        //         y: '2017',
        //         a: 75,
        //         b: 65
        //     },
        //     {
        //         y: '2018',
        //         a: 50,
        //         b: 40
        //     }
        // ]

    return {
        // public functions
        init: function() {
            demo3();
        }
    };
}();

var KTFlotchartsDemo = function() {

    //Private functions

    var demo1 = function() {
        // var pageviews = [
        //     [2014, 0.65],
        //     [2015, 0.55],
        //     [2016, 0.72],
        //     [2017, 0.45],
        //     [2018, 0.85]
        //
        // ];

        var plot = $.plot($("#conversion_rate_chart"), [{
            data: conversion_rate_data,
            label: "Conversion Rate",
            lines: {
                lineWidth: 1,
            },
            shadowSize: 0

        }], {
            series: {
                lines: {
                    show: true,
                    lineWidth: 2,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.05
                        }, {
                            opacity: 0.01
                        }]
                    }
                },
                points: {
                    show: true,
                    radius: 3,
                    lineWidth: 1
                },
                shadowSize: 2
            },
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#eee",
                borderColor: "#eee",
                borderWidth: 1
            },
            colors: [KTApp.getStateColor("brand")],
            xaxis: {
                ticks: conversion_rate_year,
                tickDecimals: 0,
                tickColor: "#eee",
            },
            yaxis: {
                ticks: 11,
                min: 0,
                max: 1,
                tickDecimals: 2,
                tickColor: "#eee",
            }
        });

        function showTooltip(x, y, contents) {
            $('<div id="tooltip">' + contents + '</div>').css({
                position: 'absolute',
                display: 'none',
                top: y + 5,
                left: x + 15,
                border: '1px solid #333',
                padding: '4px',
                color: '#fff',
                'border-radius': '3px',
                'background-color': '#333',
                opacity: 0.80
            }).appendTo("body").fadeIn(200);
        }

        var previousPoint = null;
        $("#chart_2").bind("plothover", function(event, pos, item) {
            $("#x").text(pos.x.toFixed(2));
            $("#y").text(pos.y.toFixed(2));

            if (item) {
                if (previousPoint != item.dataIndex) {
                    previousPoint = item.dataIndex;

                    $("#tooltip").remove();
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);

                    showTooltip(item.pageX, item.pageY, item.series.label + " of " + x + " = " + y);
                }
            } else {
                $("#tooltip").remove();
                previousPoint = null;
            }
        });
    }

    return {
        // public functions
        init: function() {
            // default charts
            demo1();
        }
    };
}();



jQuery(document).ready(function() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/getFiveYearInquiryOrderChart",
        async:false,
        data:{

        },
        dataType: "json",
        success: function (data) {
            yearly_inquiry_and_orders_vol_chart_data=data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.statusText);
        }
    });

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/getFiveYearConversionRateChart",
        async:false,
        data:{

        },
        dataType: "json",
        success: function (data) {
            conversion_rate_year=data.year;
            conversion_rate_data=data.data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.statusText);
        }
    });

    KTMorrisChartsDemo.init();

    KTFlotchartsDemo.init();
});