$(document).ready(function () { 
  
  //var for tv shows
  var topics = ["Breaking Bad","Loiter Squad","Rick and Morty", "Game of Thrones", "Batman","Family Guy"]

  //Function to create buttons for tv shows

function createButtons() {


  $("#buttons").empty();

  for (var i = 0; i < topics.length; i++) {
      var button = $("<button class= tv>").attr("name", topics[i]).text(topics[i]);
      $("#new").append(button);
  }

}

createButtons(); 

  //Search Function located in html
function myFunction() {

  event.preventDefault();
  //Take Value of search bar onclick and add to topics
  var newShow = $("#search").val();
  //Push new show into topics
  topics.push(newShow);

  createButtons();
}

});

//Generating new Gifs for each button

$(document).on("click",".tv",function()  {

$("#gif").empty();


//gets value of the name attribute from button when clicked
var shows = $(this).attr("name");

console.log(shows);

//Url that ajax will use
var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + shows + 

"&api_key=0E7YmkMCOB6J9sOjE4aRX3RiKT0HCnKP&limit=10";

//Ajax call

$.ajax({
  url: queryUrl,
  method: "GET",
}).then(function(response) {

  var result = response.data;

  console.log(result);

  //Loop thru images in array
  for (var i = 0; i < result.length; i++)   {
    //create new div and p for each gif
    var newDiv = $("<div>");
    var newP = $("<p>");
    newP.text("Rating:"+ result[i].rating);
    
    //Create new image element and sets its src attribute to the url of the gif
    var image = $("<img class='image'>");
    image.attr("src", result[i].images.original_still.url);


     //Appends the movie image & its corresponding paragraph to the movie div, and then prepends that movie div to the main gifs div in the page
     newDiv.append(image);
     newDiv.prepend(newP);
     $("#gif").prepend(newDiv);

  }
    
     //Pause and Play gifs 
     image.attr("data-state", "still");
     image.attr("data-still", result[i].images.original_still.url);
     image.attr("data-animate", result[i].images.original.url);

  
  $("#gif").prepend("<h1>Click to Play/Pause Gif</h1>");
});

  $(document).on("click", ".image", function(){
    console.log("hello");
    //Assign current data-state to variable
var state = $(this).attr("data-state");
console.log(state)

if (state==="still"){
  $(this).attr("src",$(this).attr("data-animate"));
  $(this).attr("data-state","animate");
} else {
  $(this).attr("src",$(this).attr("data-still"));
  $(this).attr("data-state",'still');
}
  });
});



