var searchInput = ""
var weatherContainer = document.getElementById("city-info")
var date = new Date()


function searchBtnFunction(event) {
  var searchInput = event.target.innerText;
  getWeatherInfo(searchInput);
}

function searchData() {
  var searchInput = document.querySelector("#search-bar").value;
  //changes the case so that the first letter is capitalized and the rest lowercase
  searchInput = searchInput.charAt(0).toUpperCase() + searchInput.slice(1).toLowerCase();
  cityButtons(searchInput);
  getWeatherInfo(searchInput);
}

//get latitute and longtitue to use in other API calls
function getWeatherInfo(searchInput) {
  loadData();
  //get input from the search to add to the API url
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
      document.getElementById("city-and-date").innerHTML = data.name + ' ' + date.toLocaleDateString() + '<img src="https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png" width=50px>';
      getWeatherDetails(latitude, longitude); 
      });
    };
  });
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
        //based on the UVI a class will be added so that the background colour reflects the conditions
        if (data.current.uvi <= 2) {
          uvindex.setAttribute("class", "uvi-favourable");
        } else if (data.current.uvi <=5) {
          uvindex.setAttribute("class", "uvi-moderate");
        } else {
          uvindex.setAttribute("class", "uvi-severe");
        }
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
  forecastHeaderContain.innerHTML = "";
  forecastHeaderContain.appendChild(forecastHeaderEl);

  //make API request for 5 day forecast
  fetch(apiURL)
    .then(function(response) {
      //request was successful
      if (response.ok) {
        response.json().then(function(data) {
          console.log(data);
          var forecastContain = document.getElementById("fiveDayContainer");
          forecastContain.innerHTML = "";

          for (var i = 1; i <= 5; i++) {
            console.log(data.daily[i].temp.day);
            var forecastEl = document.createElement("div");
            var forecastDates = new Date();
            forecastDates.setDate(forecastDates.getDate() + i);
            forecastEl.classList = "col";
            forecastEl.setAttribute("id", "forecastElContainer");
            forecastEl.innerHTML = forecastDates.toLocaleDateString() + "<br />";    
            forecastEl.innerHTML += '<img src="https://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png" <br />';
            forecastEl.innerHTML += "Temp: " + data.daily[i].temp.day + "°C <br />";
            forecastEl.innerHTML += "Wind: " + data.daily[i].wind_speed + " KPH <br />";
            forecastEl.innerHTML += "Humidity: " + data.daily[i].humidity + " % <br />"; 
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

//generate buttons based on search
function cityButtons(pastCityString) {
  var loadData = localStorage.getItem("savedSearch");
  var searchArr = JSON.parse(loadData) || [];

//don't generate a button if one already exists
  if (!searchArr.includes(pastCityString)) {
    searchArr.push(pastCityString);
    localStorage.setItem("savedSearch", JSON.stringify(searchArr));
    console.log(searchArr);
  } 
}

//load and make buttons based on search history in local storage
function loadData() {
  var pastCityContainer = document.getElementById("search-history");
  pastCityContainer.innerHTML = "";
  var loadData = localStorage.getItem("savedSearch");
  var pastSearchButton = JSON.parse(loadData) || [];

  for (i = 0; i < pastSearchButton.length; i++) {
      var pastCity = document.createElement("button");
      pastCity.setAttribute("class", "history-buttons search-items form-control");
      pastCity.setAttribute("type", "button");
      pastCity.addEventListener("click", searchBtnFunction);
      pastCity.innerText = pastSearchButton[i];
      pastCityContainer.setAttribute("class", "border-line")
      pastCityContainer.appendChild(pastCity);
  }
}


loadData();

