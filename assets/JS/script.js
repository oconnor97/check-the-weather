// search bar and weather variables

var searchBtn = $('#searchBtn');
var inputValue = $('#inputValue');
var cityName = $('#cityName');
var temp = $('#temp');
var humid = $('#humid');
var wind = $('#wind');
var uvIndex = $('#uvIndex');
var uviNumber = $('#uviNumber');
var searchHistory = $('#history');

var cities = JSON.parse(localStorage.getItem('cities')) || [];

// When the search button is clicked it will run the search function 
searchBtn.on('click', search);


var searchList = $(".history");
function getHistory() {
  console.log(searchList);
  // for (var i = 0; i < localStorage.length; i++) {

  //   var cityHistory = localStorage.getItem(i);
  //   searchList.append("<li>" + cityHistory + "</li>");
  // }
  var histories =JSON.parse(localStorage.getItem('cities'));
  console.log(histories);
  if (histories) {
    histories.forEach(history => {
      searchList.append(`<button>${history}</button>`);
    })
  }
};

getHistory();
// function to retrieve data from the api
function search(event) {
  event.preventDefault();
  
cities.push(inputValue.val());

localStorage.setItem('cities', JSON.stringify(cities));

searchList.empty();


getHistory();

// api url for the initial fetch request
var getUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+inputValue.val()+'&units=imperial&appid=0ecab4d27a41d8e0ccd885f7bc5922d7'

console.log(inputValue.val())

//grabbing the data and setting the values to HTML elements 

fetch(getUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      cityName.text(data.name + " " + moment().format('L'));

      // weather icon
      
      $('#wIcon').show()
      var iconCode = data.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
      $('#wIcon').attr('src', iconUrl);
      temp.text('Temerature: ' + data.main.temp + ' ℉');
      humid.text('Humidity: ' + data.main.humidity + ' %');
      wind.text('Wind Speed: ' + data.wind.speed + ' MPH');
      var longitude = data.coord.lon;
      var lattitude = data.coord.lat;


      // api url for the fetch request returning the uv index
      var uviUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lattitude+'&lon='+longitude+'&units=imperial&appid=0ecab4d27a41d8e0ccd885f7bc5922d7';

      //Getting the uvIndex from a second api and setting the value to HTML elements, then chaning the class based on the number. 

      fetch(uviUrl)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          uviNumber.text(data.current.uvi);
        })
        console.log(uviNumber);
        let uvVal = parseFloat(uviNumber.textContent)
        console.log(uvVal)
        if(uvVal < 3) {
          uviNumber.addClass('favorable');
        } else if (uvVal > 3 && uvVal < 7) {
          uviNumber.addClass('moderate');
        } else {
          uviNumber.addClass('severe')
        };
      
      console.log(lattitude, longitude);
    })

  
    .catch(() => {
      console.error('not a city');
  })
  
};