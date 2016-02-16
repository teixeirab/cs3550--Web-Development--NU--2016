(function (){
    $(init);


    var $companyTicker;
    var $searchBtn;
    var $searchResults;
    var $company_name;

    var searchUrl = "https://www.quandl.com/api/v3/datasets/WIKI/TICKER.json?auth_token=iKE6_AQ4XzcBFshm3oES";


    function init() {

        $companyTicker = $("#companyTicker");
        $searchBtn = $("#searchBtn");
        $searchResults = $("#searchResults tbody");
        $searchBtn.click(searchTicker);
        $company_name= $("#company_name")
    }

    function searchTicker() {
        var ticker = $companyTicker.val();
        var url = searchUrl
            .replace("TICKER", ticker);

        $.ajax({
            url: url,
            success: renderSearchResults
        });
    }

    function renderGraph(response){
        var data = response.dataset.data;
        var adjusted_data = [];
        var dates = [];
        var lineChartData;

        for (var m=0; m < 40; m++){
            var row = data[m];
            var date = row[0];
            var adj_close = row[11];

            dates.splice(m, 0, date);
            adjusted_data.splice(m, 0, adj_close);
        }



        lineChartData = {
            labels : dates.reverse(),
            datasets : [
                {
                    label: "Close Price",
                    fillColor : "rgba(220,220,220,0.2)",
                    strokeColor : "rgba(220,220,220,1)",
                    pointColor : "rgba(220,220,220,1)",
                    pointStrokeColor : "#fff",
                    pointHighlightFill : "#fff",
                    pointHighlightStroke : "rgba(220,220,220,1)",
                    data : adjusted_data.reverse()
                }
            ]

        };

        var ctx = document.getElementById("canvas").getContext("2d");
        window.myLine = new Chart(ctx).Line(lineChartData, {responsive: true});
    }

    function renderSearchResults(response){
        $searchResults.empty();

        var company_name = response.dataset.name;

        $company_name.html(company_name);

        renderGraph(response);

        var data = response.dataset.data;
        var adjusted_data = [];

        for (var m=0; m < data.length; m++){
            var row = data[m];
            var date = row[0];
            var open = row[1];
            var high = row[2];
            var low = row[3];
            var close = row[4];
            var volume = row[5];
            var ex_dividend = row[6];
            var split_ratio = row[7];
            var adj_open = row[8];
            var adj_high = row[9];
            var adj_low = row[10];
            var adj_close = row[11];
            var adj_volume = row[12];

            var $tr = $("<tr>");

            var $td = $("<td class='nowrap'>")
                .append(date)
                .appendTo($tr);

            var $td = $("<td class='nowrap'>")
                .append(open)
                .appendTo($tr);

            var $td = $("<td class='nowrap'>")
                .append(high)
                .appendTo($tr);

            var $td = $("<td class='nowrap'>")
                .append(low)
                .appendTo($tr);

            var $td = $("<td class='nowrap'>")
                .append(close)
                .appendTo($tr);

            var $td = $("<td class='nowrap'>")
                .append(volume)
                .appendTo($tr);

            var $td = $("<td class='nowrap'>")
                .append(ex_dividend)
                .appendTo($tr);

            var $td = $("<td class='nowrap'>")
                .append(split_ratio)
                .appendTo($tr);

            var $td = $("<td class='nowrap'>")
                .append(adj_open)
                .appendTo($tr);

            var $td = $("<td class='nowrap'>")
                .append(adj_high)
                .appendTo($tr);

            var $td = $("<td class='nowrap'>")
                .append(adj_low)
                .appendTo($tr);

            var $td = $("<td class='nowrap'>")
                .append(adj_close)
                .appendTo($tr);

            var $td = $("<td class='nowrap'>")
                .append(adj_volume)
                .appendTo($tr);


            $searchResults.append($tr)
        }

    }


})();