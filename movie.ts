// mike key 5907c09d

let submitbutton: HTMLElement = document.getElementById("submit");

submitbutton.addEventListener("click", function () {
    let searchtext: string = document.getElementById("title")["value"];
    let year: string = document.getElementById("year")["value"];
    let type: string = document.querySelector('input[name=type]:checked')["value"];
    console.log(`http://www.omdbapi.com/?apikey=5907c09d&r=JSON&page=1&s=${searchtext}&y=${year}&type=${type}`)
    fetch(`http://www.omdbapi.com/?apikey=5907c09d&r=JSON&page=1&s=${searchtext}&y=${year}&type=${type}`)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then (function (res){
            console.log(res)
        })
        
})

