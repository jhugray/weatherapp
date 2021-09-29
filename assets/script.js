// create search feature
// add weather api
// add city content in top box, then add 5 day forecast
//address errors - if city mispelled, or no text entered etc, have modal 
// save search results to local storage, and get from LS to side bar list
var searchInput = ""
var weatherContainer = document.getElementById("city-info")
var date = new Date().toLocaleDateString()


function getCurrentWeatherInfo() {
  //get input from the search to add to the API url
  var searchInput = document.querySelector("#search-bar").value;
  console.log(searchInput);

  var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=1bcef183a294ce737390e54c659003f3&units=metric";
  
  //make API request for current weather
  fetch(apiURL)
    .then(function(response) {
      //request was successful
      if (response.ok) {
        response.json().then(function(data) {
        console.log(data);
        console.log(data.main.temp);
        console.log(data.wind.speed);
        console.log(data.main.humidity);
        document.getElementById("city-and-date").innerHTML = data.name + " " + date;
        document.getElementById("temp").innerHTML ="Temp: " + data.main.temp +"°C";
        document.getElementById("wind").innerHTML ="Wind: " + data.wind.speed + " KPH";
        document.getElementById("humidity").innerHTML ="Humidity: " + data.main.humidity + " %";
        // document.getElementById("uvindex").innerHTML ="UV Index: " + data.main.temp;
        });
      } else {
        alert("There was a problem with your request");
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather");
    }); 

  var forecastApiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=1bcef183a294ce737390e54c659003f3&units=metric";
  
  //make API request for 5 day forecast
  fetch(forecastApiURL)
    .then(function(response) {
      //request was successful
      if (response.ok) {
        response.json().then(function(data) {
        console.log(data);
        for (var i = 1; i <= 5; i++) {
          // var fiveDayForecast = data.list[i].main.temp
          console.log(data.list[i].main.temp);
          // console.log(fiveDayForecast); // keep working on for loop and then populate to page **************
          // document.getElementsByClassName("fiveDayContainer").innerHTML = "Temp: " + data.list[i].main.temp + "°C";

          var forecastEl = document.createElement("div");
          var forecastDates = new Date();
          forecastDates.setDate(forecastDates.getDate() + i);
          forecastEl.classList = "col";
          forecastEl.innerHTML = forecastDates.toLocaleDateString() + "<br />";    
          forecastEl.innerHTML += data.list[i].weather.icon + "<br />";
          forecastEl.innerHTML += "Temp: " + data.list[i].main.temp + "°C <br />";
          forecastEl.innerHTML += "Wind: " + data.list[i].wind.speed + " KPH <br />";
          forecastEl.innerHTML += "Humidity: " + data.list[i].main.humidity + " % <br />"; 
          

          var forecastContain = document.getElementById("fiveDayContainer");

          forecastContain.appendChild(forecastEl);
        

          
        };

   
        // console.log(data.wind.speed);
        // console.log(data.main.humidity);
        // document.getElementById("city-and-date").innerHTML = data.name + " " + today;
        // document.getElementById("temp").innerHTML ="Temp: " + data.main.temp +"°C";
        // document.getElementById("wind").innerHTML ="Wind: " + data.wind.speed + " KPH";
        // document.getElementById("humidity").innerHTML ="Humidity: " + data.main.humidity + " %";
        // // document.getElementById("uvindex").innerHTML ="UV Index: " + data.main.temp;
        });
      } else {
        alert("There was a problem with your request");
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather");
    }); 
}
  





// function weatherFunction() {
//   var searchInput = document.querySelector("#search-bar").value;
//   var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=9273ac9fe325b93d191b9daf0d028c35";
//   fetch(apiURL).then(function(response) {
//     response.json().then(function(current) {
//     console.log(current);
//     });
//   });
// };


// function weatherFunction() {
//   var searchInput = document.querySelector("#search-bar").value;
//   var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=9273ac9fe325b93d191b9daf0d028c35";
//   fetch(apiURL)
//     .then(function(response) {
//       if (response.ok) {
//         console.log(response);
//         response.json().then(function(data) {
//           console.log(data);
//         });
//       } else {
//         alert("Error: + " + response.statusText)
//       }
//     })
//     .catch(function(error) {
//       alert("Unable to connect to Open Weather");
//     });

//   var weatherReport = document.getElementById("city-info").innerHTML = "response";
//   return weatherReport;
//   }




// var getUserRepos = function(user) {
//   // format the github api url
//   var apiUrl = "https://api.github.com/users/" + user + "/repos";

//   // make a get request to url
//   fetch(apiUrl)
//     .then(function(response) {
//       // request was successful
//       if (response.ok) {
//         console.log(response);
//         response.json().then(function(data) {
//           console.log(data);
//           displayRepos(data, user);
//         });
//       } else {
//         alert("Error: " + response.statusText);
//       }
//     })
//     .catch(function(error) {
//       alert("Unable to connect to GitHub");
//     });
// };


// function weatherFunction() {
//   var searchInput = document.querySelector("#search-bar").value;
//   var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=9273ac9fe325b93d191b9daf0d028c35";
//   fetch(apiURL).then(function(response) {
//     response.json().then(function(data) {
//     console.log(data);
//     });
//   });
// };

// jess key "&appid=1bcef183a294ce737390e54c659003f3"