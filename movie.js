// mike key 5907c09d
var submitbutton = document.getElementById("submit");
submitbutton.addEventListener("click", function () {
    var searchtext = document.getElementById("title")["value"];
    var year = document.getElementById("year")["value"];
    var type = document.querySelector('input[name=type]:checked')["value"];
    console.log("http://www.omdbapi.com/?apikey=5907c09d&r=JSON&page=1&s=" + searchtext + "&y=" + year + "&type=" + type);
    fetch("http://www.omdbapi.com/?apikey=5907c09d&r=JSON&page=1&s=" + searchtext + "&y=" + year + "&type=" + type)
        .then(function (response) {
        console.log(response);
        return response.json();
    })
        .then(function (res) {
        document.getElementById("moviedisplay").innerHTML = "";
        if (res.Error == "Movie not found!") {
            document.getElementById("moviedisplay").innerHTML = "No movies met that criteria.";
        }
        else if (res.Error == "Invalid API Key!") {
            document.getElementById("moviedisplay").innerHTML = "Search failure.";
        }
        else {
            res.Search.forEach(function (element) {
                var div = document.createElement("div");
                div.classList.add("movie-data");
                div.innerText = element.Title + " - " + element.Year;
                document.getElementById("moviedisplay").append(div);
                var poster = document.createElement("img");
                poster.classList.add("thumbnail-img");
                poster.src = element.Poster;
                div.prepend(poster);
                var imdbid = element.imdbID;
                poster.addEventListener("click", function () {
                    fetch("http://www.omdbapi.com/?apikey=5907c09d&r=JSON&page=1&i=" + imdbid)
                        .then(function (clickresponse) {
                        return clickresponse.json();
                    })
                        .then(function (clickres) {
                        document.getElementById("moviedisplay").innerHTML = "";
                        if (clickres.Error == "Movie not found!") {
                            document.getElementById("moviedisplay").innerHTML = "No movies met that criteria.";
                        }
                        else if (clickres.Error == "Invalid API Key!") {
                            document.getElementById("moviedisplay").innerHTML = "Search error.";
                        }
                        else {
                            document.getElementById("moviedisplay").innerHTML = "Director: " + clickres.Director + ".  Plot summary: " + clickres.Plot;
                        }
                    });
                });
            });
        }
    });
});
