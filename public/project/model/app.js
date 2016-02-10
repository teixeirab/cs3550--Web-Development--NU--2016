(function (){
    $(init);


    var $companyTicker;
    var $searchBtn;
    var $searchResults;

    var searchUrl = "https://www.quandl.com/api/v3/datasets/WIKI/TICKER.json?auth_token=iKE6_AQ4XzcBFshm3oES";


    function init() {

        $companyTicker = $("#companyTicker");
        $searchBtn = $("#searchBtn");
        $searchResults = $("#searchResults tbody");
        $searchBtn.click(searchTicker);
    }

    function searchTicker() {
        var ticker = $companyTicker.val();
        console.log(ticker);
        var url = searchUrl
            .replace("TICKER", ticker);

        $.ajax({
            url: url,
            success: renderSearchResults
        });
    }

    function renderSearchResults(response){
        console.log(response);
        var quote = response.Search;


    }


})();