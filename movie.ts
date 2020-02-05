// mike key 5907c09d

let submitbutton: HTMLElement = document.getElementById("submit");

submitbutton.addEventListener("click", function (){
    console.log("attempting to create listener")
    let searchtext: string = document.getElementById("title")["value"];
    // let typeselector: string = document.getElementsByName("type")["value"]
    let yearselector = document.getElementById("year")["value"];
    console.log(`search string was ${searchtext} and yearselector was ${yearselector}`)
})

