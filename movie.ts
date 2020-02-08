let submitbutton: HTMLElement = document.getElementById("submit");
let searchbar = document.getElementById("title");

function searchstart() {
    let searchtext: string = document.getElementById("title")["value"];
    if (searchtext.length < 3) {
        document.getElementById("moviedisplay").innerText = "Use at least 3 characters to search."
    }
    else {
        let year: string = document.getElementById("year")["value"];
        let type: string = document.querySelector('input[name=type]:checked')["value"];
       let proceed: boolean;
        fetch(`https://www.omdbapi.com/?apikey=5907c09d&r=JSON&page=1&s=${searchtext}&y=${year}&type=${type}`)
            .then(function (response) {
                if (response.status == 200) {
                    proceed = true;
                    return response.json()
                }
                else {
                    proceed = false;
                }
            })
            .then(function (res) {
                if (proceed = false) {
                    document.getElementById("moviedisplay").innerText = "An error occurred.";
                }
                else {
                    document.getElementById("moviedisplay").innerHTML = ""
                    if (res.Error == "Movie not found!") {
                        document.getElementById("moviedisplay").innerHTML = "No movies met that criteria."
                    }
                    else if (res.Error == "Invalid API Key!") {
                        document.getElementById("moviedisplay").innerHTML = "Search failure."
                    }
                    else {
                        searchresulttext(res);
                    }
                }
            })
    }
}

function searchresulttext(response) {
    document.getElementById("moviedisplay").classList.add("off-screen");
    document.getElementById("moviedisplay").classList.add("search-trans");
    response.Search.forEach(element => {
        let div = document.createElement("div");
        div.classList.add("movie-data");
        div.innerText = `${element.Title} - ${element.Year}`;
        document.getElementById("moviedisplay").append(div);
        let poster = document.createElement("img");
        poster.classList.add("thumbnail-img");
        poster.src = element.Poster;
        poster.id = `${element.imdbID}`;
        div.prepend(poster);
        poster.addEventListener("click", function () {
            drillclick(response, this.id)
        })
    })
    window.setTimeout(function (){
        document.getElementById("moviedisplay").classList.remove("off-screen");
    },500)
}

function drillclick(response, imdbid) {
    document.getElementById("moviedisplay").classList.remove("search-trans");
    fetch(`https://www.omdbapi.com/?apikey=5907c09d&r=JSON&page=1&i=${imdbid}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (clickres) {
            document.getElementById("moviedisplay").innerHTML = "";
            if (clickres.Error == "Movie not found!") {
                document.getElementById("moviedisplay").innerHTML = "No movies met that criteria."
            }
            else if (clickres.Error == "Invalid API Key!") {
                document.getElementById("moviedisplay").innerHTML = "Search error."
            }
            else {
                drilltext(clickres);
            }
        })
}


function drilltext(response) {
    let display = document.getElementById("moviedisplay");
    display.classList.add("fade");
    display.style.minWidth = "630px"
    display.style.padding = "15px"
    let poster = document.createElement("img")
    poster.classList.add("poster-img")
    poster.src = `${response.Poster}`
    display.append(poster);
    let head = document.createElement("h1");
    head.innerText = `${response.Title}`
    display.prepend(head);
    let rating = document.createElement("p")
    rating.innerText = `Rated: ${response.Rated}  Released on: ${response.Released}`
    display.append(rating);
    let genre = document.createElement("p");
    genre.innerText = `${response.Runtime} length - ${response.Genre}`
    display.append(genre);
    let director = document.createElement("p");
    director.innerText = `Directed by: ${response.Director}`;
    display.append(director)
    let spacing = document.createElement("div")
    spacing.style.height = "30px"
    display.append(spacing);
    let writer = document.createElement("p")
    writer.innerText = `Written by: ${response.Writer}`
    display.append(writer)
    let cast = document.createElement("p")
    cast.innerText = `Starring: ${response.Actors}`
    display.append(cast);
    let plot = document.createElement("div")
    plot.innerText = `${response.Plot}`
    plot.style.height = "50px";
    display.append(plot);
    let prod = document.createElement("p");
    prod.innerText = `${response.Production} - Total Box Office: ${response.BoxOffice}`
    display.append(prod);
    window.setTimeout(function() {
        display.classList.add("fade-trans") 
        display.classList.remove("fade")
    }, 1);
}


submitbutton.addEventListener("click", function () {
    searchstart();
})

searchbar.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        searchstart()
    }
})

submitbutton.addEventListener("touchstart", function() {
    searchstart()
})