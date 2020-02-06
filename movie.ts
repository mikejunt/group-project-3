// mike key 5907c09d

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
        console.log(`http://www.omdbapi.com/?apikey=5907c09d&r=JSON&page=1&s=${searchtext}&y=${year}&type=${type}`)
        let proceed: boolean;
        fetch(`http://www.omdbapi.com/?apikey=5907c09d&r=JSON&page=1&s=${searchtext}&y=${year}&type=${type}`)
            .then(function (response) {
                if (response.status == 200) {
                    proceed = true;
                    console.log(proceed)
                    return response.json()
                }
                else {
                    proceed = false;
                    console.log(proceed)
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
    response.Search.forEach(element => {
        let div = document.createElement("div");
        div.classList.add("movie-data");
        div.innerText = `${element.Title} - ${element.Year}`;
        document.getElementById("moviedisplay").append(div);
        let poster = document.createElement("img");
        poster.classList.add("thumbnail-img");
        poster.src = element.Poster;
        poster.id = `${element.imdbID}`;
        console.log(poster.id)
        div.prepend(poster);
        poster.addEventListener("click", function () {
            drillclick(response, this.id)
        })
    })
}

function drillclick(response, imdbid) {
    console.log(imdbid)
    fetch(`http://www.omdbapi.com/?apikey=5907c09d&r=JSON&page=1&i=${imdbid}`)
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
    document.getElementById("moviedisplay").innerHTML = `Director: ${response.Director}.  Plot summary: ${response.Plot}`
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