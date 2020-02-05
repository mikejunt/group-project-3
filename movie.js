// mike key 5907c09d
console.log("THING");
var submitbutton = document.getElementById("submit");
submitbutton.addEventListener("click", function () {
    console.log("attempting to create listener");
    var searchtext = document.getElementById("title")["value"];
    // let typeselector: string = document.getElementsByName("type")["value"]
    var yearselector = document.getElementById("year")["value"];
    console.log("search string was " + searchtext + " and yearselector was " + yearselector);
});
