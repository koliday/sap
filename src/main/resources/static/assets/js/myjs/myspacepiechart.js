


var country_data;
var yearly_new_client_data;
var revenue_profit_data;

var demo7;
var demo25;
var KTMorris = function() {
    demo25 = function() {
        // BAR CHART
        new Morris.Bar({
            element: 'revenue_profit_chart',
            data: revenue_profit_data,
            xkey: 'year',
            ykeys: ['revenue', 'profit'],
            labels: ['Revenue', 'Profit'],
            barColors: ['#2abe81', '#24a5ff'],
            resize:true
        });
    }


    demo7 = function() {
        // BAR CHART
        new Morris.Bar({
            element: 'yearly_new_client_chart',
            data: yearly_new_client_data,
            xkey: 'year',
            ykeys: ['count'],
            labels: ['New Client'],
            barColors: ['#2abe81'],
            resize:true
        });
    }
    return {
        // public functions
        init: function() {
            demo7();
            demo25();
        }
    };
}();

var KTPieChart = function() {



    var demo20 = function() {
        var data = [
            {label: "Google", data: 20, color:  KTApp.getStateColor("brand")},
            {label: "Twitter", data: 35, color:  KTApp.getStateColor("success")},
            {label: "Linkedin", data: 20, color:  KTApp.getStateColor("danger")},
            {label: "Instagram", data: 25, color:  KTApp.getStateColor("warning")},
            {label: "Facebook", data: 10, color:  KTApp.getStateColor("info")}
        ];
        $.plot($("#country_distribution_chart"), country_data, {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    label: {
                        show: true,
                        radius: 1,
                        formatter: function(label, series) {
                            return '<div style="font-size:12pt;text-align:center;padding:2px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
                        },
                        background: {
                            opacity: 0.8
                        }
                    }
                }
            },
            legend: {
                show: false
            }
        });
    }

    var demo10 = function() {
        var data = [
            {label: "Google", data: 20, color:  KTApp.getStateColor("brand")},
            {label: "Twitter", data: 35, color:  KTApp.getStateColor("success")},
            {label: "Linkedin", data: 20, color:  KTApp.getStateColor("danger")},
            {label: "Instagram", data: 25, color:  KTApp.getStateColor("warning")},
            {label: "Facebook", data: 10, color:  KTApp.getStateColor("info")}
        ];

        $.plot($("#kt_flotcharts_10"), data, {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    label: {
                        show: true,
                        radius: 1,
                        formatter: function(label, series) {
                            return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
                        },
                        background: {
                            opacity: 0.8
                        }
                    }
                }
            },
            legend: {
                show: false
            }
        });
    }

    return {
        // public functions
        init: function() {
           demo20();


        }
    };
}();



jQuery(document).ready(function() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/getYearlyNewClientChart",
        async:false,
        data:{

        },
        dataType: "json",
        success: function (data) {
            yearly_new_client_data=data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.statusText);
        }
    });


    $.ajax({
        type: "POST",
        url: "http://localhost:8080/getYearlyRevenueProfitChart",
        async:false,
        data:{

        },
        dataType: "json",
        success: function (data) {
            revenue_profit_data=data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.statusText);
        }
    });

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/getFiveYearCountryDistributionChart",
        async:false,
        data:{

        },
        dataType: "json",
        success: function (data) {
            var color=new Array(KTApp.getStateColor("brand"),KTApp.getStateColor("warning"),KTApp.getStateColor("info"),KTApp.getStateColor("danger"),KTApp.getStateColor("success"));
            country_data=data;
            $.each(country_data,function(index,item){
                item.color=color[index];
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.statusText);
        }
    });
    KTPieChart.init();
    KTMorris.init();

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var target = $(e.target).attr("href");
        switch (target) {
            case "#revenue_content":
                demo25.redraw();
                $('svg').css({ width: '100%' });
                break;
            case "#profile_content":
                demo7.redraw();
                $('svg').css({ width: '100%' });
                break;
        }
    });



    $("#customer_tab").click(function () {
        demo7.redraw();
        $('svg').css({ width: '100%' });
    });

    $("#revenue_tab").click(function () {
        demo25.redraw();
        // $('svg').css({ width: '100%' });
    });


});