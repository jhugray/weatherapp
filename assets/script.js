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
  var currentWeatherEl = document.getElementById("city-info");
  currentWeatherEl.setAttribute("class", "row card");
  var forecastHeaderEl = document.createElement("h3");
  forecastHeaderEl.textContent = "5-Day Forecast:"; 
  var forecastHeaderContain = document.getElementById("forecastHeader");
  forecastHeaderContain.appendChild(forecastHeaderEl);

  var forecastApiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=1bcef183a294ce737390e54c659003f3&units=metric";
  
  

  //make API request for 5 day forecast
  fetch(forecastApiURL)
    .then(function(response) {
      //request was successful
      if (response.ok) {
        response.json().then(function(data) {
        console.log(data);
        for (var i = 1; i <= 5; i++) {
          console.log(data.list[i].main.temp);

         
          var forecastEl = document.createElement("div");
          var forecastDates = new Date();
          forecastDates.setDate(forecastDates.getDate() + i);
          forecastEl.classList = "col";
          forecastEl.setAttribute("id", "forecastElContainer");
          forecastEl.innerHTML = forecastDates.toLocaleDateString() + "<br />";    
          forecastEl.innerHTML += '<img src="http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png" <br />';
          forecastEl.innerHTML += "Temp: " + data.list[i].main.temp + "°C <br />";
          forecastEl.innerHTML += "Wind: " + data.list[i].wind.speed + " KPH <br />";
          forecastEl.innerHTML += "Humidity: " + data.list[i].main.humidity + " % <br />"; 
          

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
  