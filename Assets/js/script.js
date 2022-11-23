// var movieCard = document.querySelector('#movie-card');

var dateTime = new Date();
var deviceDateTime = dateTime.toISOString();
console.log(deviceDateTime);

fetch('https://api-gate2.movieglu.com/filmsNowShowing/?n=10', {
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


})

