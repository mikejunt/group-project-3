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
        console.log(res);
    });
});
