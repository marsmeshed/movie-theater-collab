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

var dateTime = new Date();
var deviceDateTime = dateTime.toISOString();
console.log(deviceDateTime);

fetch('https://api-gate2.movieglu.com/filmsNowShowing/?n=5', {
    'headers': {
        'api-version': 'v200',
        'Authorization': 'Basic TU9WSV8xMzk6TVBranBHdlFJY1hF',
        'client': 'MOVI_139',
        'x-api-key': 'QDqtayJAQ31sIStPEa6Ps7VoNuv3Tflo3QvNgGEg',
        'device-datetime': deviceDateTime,
        'territory': 'US',
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
    }
})

