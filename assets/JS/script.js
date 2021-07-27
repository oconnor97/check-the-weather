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

  var histories = JSON.parse(localStorage.getItem('cities'));
  if (histories) {
    histories.forEach(history => {
      searchList.append(`<li>${history}</li>`);
    })
  }
};

getHistory();



// function to retrieve data from the api
async function search(event) {
  event.preventDefault();

  cities.push(inputValue.val());

  localStorage.setItem('cities', JSON.stringify(cities));

  searchList.empty();


  getHistory();

  // api url for the initial fetch request
  var getUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.val() + '&units=imperial&appid=0ecab4d27a41d8e0ccd885f7bc5922d7'


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
      var uviUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lattitude + '&lon=' + longitude + '&units=imperial&appid=0ecab4d27a41d8e0ccd885f7bc5922d7';

      //Getting the uvIndex from a second api and setting the value to HTML elements, then chaning the class based on the number. 

      fetch(uviUrl)
        .then(response => response.json())
        .then(data => {
          uviNumber.text(data.current.uvi);
          console.log(uviNumber.text())
          let uvVal = parseFloat(uviNumber.text())

          if (uvVal < 3) {
            uviNumber.addClass('favorable');
          } else if (uvVal > 3 && uvVal < 7) {
            uviNumber.addClass('moderate');
          } else {
            uviNumber.addClass('severe')
          };
        })


    })


  // change here to a for each and create the rendered html for the 5 day forecast

  // 5 day api call
  let fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + inputValue.val() + '&units=imperial&appid=0ecab4d27a41d8e0ccd885f7bc5922d7'

  fetch(fiveDayUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // day one of 5 day forecast
      $('#day1').text(moment().add(1, 'days').format('MM-DD-YYYY'));
      $('.five-day-icon').show();
      let dayOneIcon = data.list[0].weather[0].icon;
      let dayOneUrl = "http://openweathermap.org/img/wn/" + dayOneIcon + ".png";
      $('#logo1').attr('src', dayOneUrl);
      $('#temp1').text('Temp: ' + data.list[0].main.temp + ' ℉')
      $('#humid1').text('Humidity ' + data.list[0].main.humidity + '%')

      // day two of 5 day forecast
      $('#day2').text(moment().add(2, 'days').format('MM-DD-YYYY'));
      let dayTwoIcon = data.list[1].weather[0].icon;
      let dayTwoUrl = "http://openweathermap.org/img/wn/" + dayTwoIcon + ".png";
      $('#logo2').attr('src', dayTwoUrl);
      $('#temp2').text('Temp: ' + data.list[1].main.temp + ' ℉')
      $('#humid2').text('Humidity ' + data.list[1].main.humidity + '%')

      // day three of 5 day forecast
      $('#day3').text(moment().add(3, 'days').format('MM-DD-YYYY'));
      let dayThreeIcon = data.list[2].weather[0].icon;
      let dayThreeUrl = "http://openweathermap.org/img/wn/" + dayThreeIcon + ".png";
      $('#logo3').attr('src', dayThreeUrl);
      $('#temp3').text('Temp: ' + data.list[2].main.temp + ' ℉')
      $('#humid3').text('Humidity ' + data.list[2].main.humidity + '%')

      // day four of 5 day forecast
      $('#day4').text(moment().add(4, 'days').format('MM-DD-YYYY'));
      let dayFourIcon = data.list[3].weather[0].icon;
      let dayFourUrl = "http://openweathermap.org/img/wn/" + dayFourIcon + ".png";
      $('#logo4').attr('src', dayFourUrl);
      $('#temp4').text('Temp: ' + data.list[3].main.temp + ' ℉')
      $('#humid4').text('Humidity ' + data.list[3].main.humidity + '%')

      // day ffive of 5 day forecast
      $('#day5').text(moment().add(5, 'days').format('MM-DD-YYYY'));
      let dayFiveIcon = data.list[4].weather[0].icon;
      let dayFiveUrl = "http://openweathermap.org/img/wn/" + dayFiveIcon + ".png";
      $('#logo5').attr('src', dayFiveUrl);
      $('#temp5').text('Temp: ' + data.list[4].main.temp + ' ℉')
      $('#humid5').text('Humidity ' + data.list[4].main.humidity + '%')





    })






    .catch(() => {
      console.error('not a city');


    })

};