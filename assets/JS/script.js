// search bar and weather variables

var searchBtn = $('#searchBtn');
var inputValue = $('#inputValue');
var cityName = $('#cityName');
var temp = $('#temp');
var humid = $('#humid');
var wind = $('#wind');
var uvIndex = $('#uvIndex');
var uviNumber = $('#uviNumber');

// api call

// var getUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+inputValue.val()+'&units=imperial&appid=0ecab4d27a41d8e0ccd885f7bc5922d7'

searchBtn.on('click', function(event) {
  event.preventDefault();
   
  console.log(inputValue.val())
  
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.val()+'&units=imperial&appid=0ecab4d27a41d8e0ccd885f7bc5922d7')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      cityName.text(data.name + " " + moment().format('L'));
      temp.text('Temerature: ' + data.main.temp + ' ℉');
      humid.text('Humidity: ' + data.main.humidity + ' %');
      wind.text('Wind Speed: ' + data.wind.speed + ' MPH');
      var longitude = data.coord.lon;
      var lattitude = data.coord.lat;
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lattitude+'&lon='+longitude+'&units=imperial&appid=0ecab4d27a41d8e0ccd885f7bc5922d7')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          uviNumber.text(data.current.uvi);
        })
        if(uviNumber.val() <= 3) {
          uviNumber.addClass('favorable');
        } else if (uviNumber.val() > 3 && uviNumber < 7) {
          uviNumber.addClass('moderate');
        } else {
          uviNumber.addClass('severe')
        };
      
      console.log(lattitude, longitude);
    })

  
    .catch(() => {
      console.error('not a city');
  })
  
});
