// create search feature
// add weather api
// add city content in top box, then add 5 day forecast
//address errors - if city mispelled, or no text entered etc, have modal 
// save search results to local storage, and get from LS to side bar list
var searchInput = ""
var weatherContainer = document.getElementById("city-info")
var date = new Date()


function getWeatherInfo() {
  //get input from the search to add to the API url
  var searchInput = document.querySelector("#search-bar").value;
  console.log(searchInput);  

  var weatherApiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=1bcef183a294ce737390e54c659003f3&units=metric";
  fetch(weatherApiURL)
  .then(function(response) {
    //request was successful
    if (response.ok) {
      response.json().then(function(data) {
      console.log(data)
      var longitude = data.coord.lon;
      var latitude = data.coord.lat;
      console.log(longitude);
      console.log(latitude);
      document.getElementById("city-and-date").innerHTML = data.name + " " + date.toLocaleDateString();

      getWeatherDetails(latitude, longitude);


      })
    }
  })
}

function getWeatherDetails(latitude, longitude) {
  var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=1bcef183a294ce737390e54c659003f3&units=metric";
  
  //make API request for current weather
  fetch(apiURL)
    .then(function(response) {
      //request was successful
      if (response.ok) {
        response.json().then(function(data) {
        console.log(data);
        console.log(data.current.temp);
        console.log(data.current.wind_speed);
        console.log(data.current.humidity);
        console.log(data.current.uvi);;
        document.getElementById("temp").innerHTML ="Temp: " + data.current.temp +"°C";
        document.getElementById("wind").innerHTML ="Wind: " + data.current.wind_speed + " KPH";
        document.getElementById("humidity").innerHTML ="Humidity: " + data.current.humidity + " %";
        var uvindex = document.createElement("span");
        uvindex.setAttribute("id", "uvi");
        uvindex.innerText = data.current.uvi
        document.getElementById("uvindex").innerHTML = "UV Index: " + uvindex.outerHTML ;
        });
      } else {
        alert("There was a problem with your request");
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather");
    }); 
  var currentWeatherEl = document.getElementById("city-info");
  currentWeatherEl.setAttribute("class", "row card");
  var forecastHeaderEl = document.createElement("h3");
  forecastHeaderEl.textContent = "5-Day Forecast:"; 
  var forecastHeaderContain = document.getElementById("forecastHeader");
  forecastHeaderContain.appendChild(forecastHeaderEl);

  // var forecastApiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=1bcef183a294ce737390e54c659003f3&units=metric";
  
  

  //make API request for 5 day forecast
  fetch(apiURL)
    .then(function(response) {
      //request was successful
      if (response.ok) {
        response.json().then(function(data) {
        console.log(data);
        for (var i = 1; i <= 5; i++) {
          console.log(data.daily[i].temp.day);

         
          var forecastEl = document.createElement("div");
          var forecastDates = new Date();
          forecastDates.setDate(forecastDates.getDate() + i);
          forecastEl.classList = "col";
          forecastEl.setAttribute("id", "forecastElContainer");
          forecastEl.innerHTML = forecastDates.toLocaleDateString() + "<br />";    
          forecastEl.innerHTML += '<img src="http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png" <br />';
          forecastEl.innerHTML += "Temp: " + data.daily[i].temp.day + "°C <br />";
          forecastEl.innerHTML += "Wind: " + data.daily[i].wind_speed + " KPH <br />";
          forecastEl.innerHTML += "Humidity: " + data.daily[i].humidity + " % <br />"; 
          

          var forecastContain = document.getElementById("fiveDayContainer");
          forecastContain.appendChild(forecastEl);

        
         
        
        

          
        };

  
        });
      } else {
        alert("There was a problem with your request");
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather");
    }); 
}
  