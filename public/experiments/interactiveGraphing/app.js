(function (){
    $(init);

    function init() {
        renderGraph1();
        renderBar();
        renderBar2();
    }

    var wfcRoe = [
        21.96, 20.32, 21.84, 6.98, 15.23, 10.06
    ];

    var roeLabels = [
        2005,2006,2007,2008,2009,2010
    ];

    var bacRoe = [
        22.09, 24.36, 19.81, 8.14, 5.96, 4.70
    ];


    var banksEconomicYield = [
        6.85	,
        7.49	,
        6.27	,
        5.82	,
        5.25	,
        5.25	,
        5.48	,
        5.66	,
        6.45	,
        5.98	,
        6.00	,
        6.31	,
        6.55	,
        7.46	,
        7.95	,
        6.49	,
        6.26	,
        7.04	,
        6.54	,
        6.46	,
        5.82	,
        6.35	,
        7.36	,
        7.24	,
        8.12	,
        7.62	,
        9.65	,
        5.47	,
        5.90	,
        6.52	,
        6.96	,
        7.86	,
        8.07	,
        9.08	,
        8.07	,
        8.48	,
        8.44	,
        8.22	,
        8.45	,
        8.31	,
        10.36	,

    ];

    var banksEconomicYieldLabels = [
        "1996-Feb"	,
        "1996-Jul"	,
        "1997-Feb"	,
        "1997-Jul"	,
        "1998-Feb"	,
        "1998-Jul"	,
        "1999-Feb"	,
        "1999-Jul"	,
        "2000-Feb"	,
        "2000-Jul"	,
        "2001-Feb"	,
        "2001-Jul"	,
        "2002-Feb"	,
        "2002-Jul"	,
        "2003-Feb"	,
        "2003-Jul"	,
        "2004-Feb"	,
        "2004-Jul"	,
        "2005-Feb"	,
        "2005-Jul"	,
        "2006-Feb"	,
        "2006-Jul"	,
        "2007-Feb"	,
        "2007-Jul"	,
        "2008-Feb"	,
        "2008-Jul"	,
        "2009-Feb"	,
        "2009-Jul"	,
        "2010-Feb"	,
        "2010-Jul"	,
        "2011-Feb"	,
        "2011-Jul"	,
        "2012-Feb"	,
        "2012-Jul"	,
        "2013-Feb"	,
        "2013-Jul"	,
        "2014-Feb"	,
        "2014-Jul"	,
        "2015-Feb"	,
        "2015-Jul"	,
        "2016-Feb"

    ];

    var longTermMedian = [
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72	,
        5.72
    ];

    function renderGraph1(){
        lineChartData = {
            labels : banksEconomicYieldLabels,
            datasets : [
                {
                    label: "Economic Yield",
                    fillColor : "rgba(220,220,220,0.2)",
                    strokeColor : "rgba(220,220,220,1)",
                    pointColor : "rgba(220,220,220,1)",
                    pointStrokeColor : "#fff",
                    pointHighlightFill : "#fff",
                    pointHighlightStroke : "rgba(220,220,220,1)",
                    data : banksEconomicYield

                },
                {
                    label: "Long-Term Median",
                    pointDot : false,
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: longTermMedian
                }
            ]

        };

        var ctx = document.getElementById("canvas1").getContext("2d");
        window.myLine = new Chart(ctx).Line(lineChartData, {responsive: true});
    }

    function renderBar(){
        console.log(wfcRoe);
        barChartData = {
            labels : roeLabels,
            datasets : [
                {
                    label: "WFC ROE:",
                    fillColor : "rgba(220,220,220,0.2)",
                    strokeColor : "rgba(220,220,220,1)",
                    pointColor : "rgba(220,220,220,1)",
                    pointStrokeColor : "#fff",
                    pointHighlightFill : "#fff",
                    pointHighlightStroke : "rgba(220,220,220,1)",
                    data : wfcRoe
                }
            ]

        };

        var ctx = document.getElementById("canvas4").getContext("2d");
        window.myBar = new Chart(ctx).Bar(barChartData, {responsive: true});
    }


    function renderBar2(){
        console.log(wfcRoe);
        barChartData = {
            labels : roeLabels,
            datasets : [
                {
                    label: "WFC ROE:",
                    fillColor : "rgba(220,220,220,0.2)",
                    strokeColor : "rgba(220,220,220,1)",
                    pointColor : "rgba(220,220,220,1)",
                    pointStrokeColor : "#fff",
                    pointHighlightFill : "#fff",
                    pointHighlightStroke : "rgba(220,220,220,1)",
                    data : bacRoe
                }
            ]

        };

        var ctx = document.getElementById("canvas5").getContext("2d");
        window.myBar = new Chart(ctx).Bar(barChartData, {responsive: true});
    }



})();