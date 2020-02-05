// mike key 5907c09d

let submitbutton: HTMLElement = document.getElementById("submit");


submitbutton.addEventListener("click", function () {
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
                        res.Search.forEach(element => {
                            let div = document.createElement("div");
                            div.classList.add("movie-data");
                            div.innerText = `${element.Title} - ${element.Year}`;
                            document.getElementById("moviedisplay").append(div);
                            let poster = document.createElement("img");
                            poster.classList.add("thumbnail-img");
                            poster.src = element.Poster;
                            div.prepend(poster);
                            let imdbid: string = element.imdbID;
                            poster.addEventListener("click", function () {
                                fetch(`http://www.omdbapi.com/?apikey=5907c09d&r=JSON&page=1&i=${imdbid}`)
                                    .then(function (clickresponse) {
                                        return clickresponse.json()
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
                                            document.getElementById("moviedisplay").innerHTML = `Director: ${clickres.Director}.  Plot summary: ${clickres.Plot}`
                                        }
                                    })
                            })
                        })
                    }
                }
            })
    }
})

