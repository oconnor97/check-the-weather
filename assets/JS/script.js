// search bar and weather variables

var searchBtn = $('#searchBtn');
var inputValue = $('#inputValue');
var cityName = $('#cityName');
var temp = $('#temp');
var humid = $('#humid');
var wind = $('#wind');
var uvIndex = $('#uvIndex');

// api call

// var getUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+inputValue.val+'&appid=0ecab4d27a41d8e0ccd885f7bc5922d7'

searchBtn.on('click', function(event) {
  event.preventDefault();
   
  console.log(inputValue.val())
  
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.val()+'&appid=0ecab4d27a41d8e0ccd885f7bc5922d7')
    .then(response => response.json())
    .then(data => console.log(data))
  
    .catch(err => alert('not a city'))
});
