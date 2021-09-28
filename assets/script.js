// create search feature
// add weather api
// add city content in top box, then add 5 day forecast
//address errors - if city mispelled, or no text entered etc, have modal 
// save search results to local storage, and get from LS to side bar list
var searchInput = ""

$(".btn").click(function(event) {
  event.preventDefault();
  var searchInput = $("#search-bar").val(); 
  console.log(searchInput);
  localStorage.setItem("savedSearch", JSON.stringify(searchInput));
});

function weatherFunction() {
  // var searchInput = document.querySelector("#search-bar").value;
  var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=1bcef183a294ce737390e54c659003f3"
  fetch(apiURL).then(function(response) {
    return response.json();
  })
  .then(function(response) {
    console.log(response);
  });
}