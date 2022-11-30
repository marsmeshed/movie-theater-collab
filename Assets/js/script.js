var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("item-slide");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
}

var zipcodeInput = document.querySelector('#zipcode-input');
var googleApiKey = 'AIzaSyCtG32H1uD--pt539GeHzkLgVQDHIazASQ';
var searchBtn = document.querySelector('#search-button');

var filmsIdArray = [];
var dateTime = new Date();
var deviceDateTime = dateTime.toISOString();
var today = dayjs().format('YYYY-MM-DD');
var baseUrl = 'https://api-gate2.movieglu.com/filmShowTimes/';


searchBtn.addEventListener('click', function (event) {
//get lat/long and return a string of lat;long
    getZipcode()
//use lat/long to fetch the showtimes and the cinemas the films are playing at
    .then(
      function(data) {
        console.log(data);
        const movieData = getMovieData(data);
        return movieData;
    })
  //this next .then will use the movieData to append the showtimes to the page
  //Showtimes will be from the closest theater, and the first 5 showings
    .then(
    function(data2) {
    console.log('data2', data2);
    var showtimeIndex = [1, 2, 3, 4, 5];
    //first for loop will select each card of the carousel
    for(var i = 0; i < showtimeIndex.length; i++) {
        var cinemaShowtimes = document.querySelector('#showtime-' + showtimeIndex[i]);
        //second for loop will loop through the showtimes and display the first 5 showtimes in the card
        for(var j = 0; j < 5; j++) {
            var startTime = data2[0].cinemas[0].showings.Standard.times[j].start_time;
            var movieShowing = document.createElement('p');
            movieShowing.textContent = startTime;
            cinemaShowtimes.appendChild(movieShowing);
        }
    }
    })
    localStorage.setItem('zipcode', zipcodeInput.value);

});

function getZipcode() {
    var zipcodeElm = document.querySelector('#zipcode-input');
    var userZipcode = zipcodeElm.value;
    var geoCodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userZipcode + '&key=' + googleApiKey;
    console.log('url', geoCodeUrl);

    const coordinates = fetchLocation(geoCodeUrl);
    return coordinates;
};


async function fetchLocation(url) {
  const response = await fetch(url);
  const data = await response.json();
  const locData = `${data.results[0].geometry.location.lat};${data.results[0].geometry.location.lng}`;
  return locData;
};

//fetch call that uses the film_id of the nowShowingUrl fetch
async function getMovieData(params) {
console.log('movie params', params);
  var dataArray = [];
  
  //for loop to return data using all the differnt film_ids to gather all the film showtimes and locations.
  for (var i = 0; i<filmsIdArray.length; i++) {
    urlParameters = baseUrl + '?film_id=' + filmsIdArray[i] + '&date=' + today + '&n=5'
    //headers are using the Sandbox environment values
    const response = await fetch(urlParameters, {
        'headers': 
            {
          'api-version': 'v200',
          'Authorization': 'Basic TU9WSV8xMzlfWFg6NXNsUmR0c3ZmZ1h4',
          'client': 'MOVI_139',
          'x-api-key': '6nj4MsIz754hbfKi1MrRj6IPwt2gSBdE8I39ByKP',
          'device-datetime': deviceDateTime,
          'territory': 'XX',
          'geolocation': params
           }
          });
    const data = await response.json();
    dataArray.push(data);
  }
  console.log(dataArray);
  return dataArray;
}

var nowShowingUrl = 'https://api-gate2.movieglu.com/filmsNowShowing/?n=5';

//headers are using the Sandbox environment values
fetch(nowShowingUrl, {
    'headers': {
        'api-version': 'v200',
        'Authorization': 'Basic TU9WSV8xMzlfWFg6NXNsUmR0c3ZmZ1h4',
        'client': 'MOVI_139',
        'x-api-key': '6nj4MsIz754hbfKi1MrRj6IPwt2gSBdE8I39ByKP',
        'device-datetime': deviceDateTime,
        'territory': 'XX',
    }
})
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);

    var slideIndex = [1, 2, 3, 4, 5];
    var filmsArray = data.films;
    console.log(filmsArray);

    for(var i = 0; i < filmsArray.length; i++) {
        var movieTrailer = document.querySelector('#image-slide-' + slideIndex[i]);
        var movieTitle = document.querySelector('#movie-title-' + slideIndex[i]);
        var movieDescription = document.querySelector('#movie-description-' + slideIndex[i]);

        var trailer = filmsArray[i].film_trailer;
        console.log(trailer);
        var title = filmsArray[i].film_name;
        var description = filmsArray[i].synopsis_long;
        movieTrailer.src = trailer;
        movieTitle.textContent = title;
        movieDescription.textContent = description;
        filmsIdArray.push(filmsArray[i].film_id);
    }
})

// var titleObj = {

// }
// localStorage.setItem('Movie Title', JSON.stringify(titleObj));