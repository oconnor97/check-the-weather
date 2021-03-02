var callUrl = 'http://api.openweathermap.org/data/2.5/weather?q=columbus&units=imperial&appid=0ecab4d27a41d8e0ccd885f7bc5922d7'



    fetch(callUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
