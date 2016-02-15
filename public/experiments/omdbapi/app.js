(function (){
    $(init);


    var $movieTitle;
    var $searchBtn;
    var $searchResults;
    var $detailsTitle;
    var $detailsDirector;
    var $detailsPoster;
    var $detailsActor;
    var $detailsPlot;
    var $currentPage;
    var $previousPage;
    var $nextPage;
    var $totalResults;
    var searchUrl = "http://www.omdbapi.com/?s=TITLE&page=PAGE";
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID";
    var currentPage = 1;

    function init() {

        $movieTitle = $("#movieTitle");
        $searchBtn = $("#searchBtn");
        $searchResults = $("#searchResults tbody");
        $detailsTitle = $("#detailsTitle");
        $detailsDirector = $("#detailsDirector");
        $detailsPoster = $("#detailsPoster");
        $detailsActor = $("#detailsActor");
        $detailsPlot = $("#detailsPlot");
        $currentPage = $("#currentPage");
        $previousPage = $("#previousPage");
        $nextPage = $("#nextPage");
        $totalResults = $("#totalResults");
        $searchBtn.click(searchMovie);
        $previousPage.click(previousPage);
        $nextPage.click(nextPage);
    }

    function previousPage(){
        currentPage--;
        $currentPage.html(currentPage);
        searchMovie();
    }

    function nextPage(){
        currentPage++;
        $currentPage.html(currentPage);
        searchMovie()
    }

    function searchMovie() {
        var title = $movieTitle.val();
        var url = searchUrl
            .replace("TITLE", title)
            .replace("PAGE", currentPage);

        $.ajax({
            url: url,
            success: renderSearchResults
        });
    }

    function renderSearchResults(response){
        $searchResults.empty();
        var totalResults = response.totalResults;
        var movies = response.Search;
        console.log(response);
        console.log(totalResults);
        $totalResults.html(totalResults);


        for (var m=0; m < movies.length; m++){
            var movie = movies[m];
            var title = movie.Title;
            var year = movie.Year;
            var imbdID = movie.imdbID;
            var posterUrl = movie.Poster;


            var $tr = $("<tr>");

            var $img = $("<img>")
                .attr("id", imbdID)
                .attr("src", posterUrl)
                .addClass("thumb-poster")
                .click(fetchMovieDetails);

            $tr.append($img);
            var $td = $("<td>");


            var $td = $("<td>")
                .append(title)
                .appendTo($tr);

            var $td = $("<td>")
                .append(year)
                .appendTo($tr);

            var $td = $("<td>")
                .append(imbdID)
                .appendTo($tr);

            $searchResults.append($tr)
        }

    }

    function fetchMovieDetails(event){
        var $img = $(event.currentTarget);
        var imdbid = $img.attr("id");
        var url = DETAILS_URL.replace("IMDBID", imdbid);
        $.ajax({
            url: url,
            success: renderMovieDetails
        })
    }


    function renderMovieDetails(response){
        console.log(response);

        var title = response.Title;
        var actors = response.Actors;
        var director = response.Director;
        var plot = response.Plot;
        var posterUrl = response.Poster;
        var actorArray = actors.split(",");

        $detailsTitle.html(title);
        $detailsDirector.html(director);
        $detailsPlot.html(plot);
        $detailsPoster.attr("src", posterUrl);

        $detailsActor.empty();

        for (var a in actorArray){
            var actorName = actorArray[a];

            var $li = $("<li>")
                .append(actorName)
                .appendTo($detailsActor)
        }
    }

})();