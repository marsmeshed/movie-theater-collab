# Movie Now
This web application can be used to search the top 5 movies that are currently playing at a near by cinema and display the first 5 showtimes of the movies. The trailers of each movie is displayed for the user to view.

## Project Description
To build this application two HTML pages, two CSS files and a JavaScript file was created. To structure and style the two HTMl pages our team used Bulma CSS framework. To add onto the styling of what was created using Bulma our team included the two CSS files. The HTML pages are structured so that the user is first presented with the landing page that gives a brief description of what the user can expect to get from the application and a button that will direct them to the second HTML page. Once on the second page the user will be presented with a carousel of cards displaying the trailers, movie title, description, and showtimes. The movies that will be displayed are the top movies currently in theaters based on MovieGlu's rating system. The page will display five of the top movies. There is an input section where the user can then input their zip code to return the next five showtimes of those movies at their nearest theater. When the user inputs their zip code that information is then stored to the local storage. Below is a list of some of the functions that were created in the JavaScript file in order to make the page functional:
* Functions to display the movie info on a carousel of cards to allow the user to click a button and slide from movie info set to another or allow the page to slide through all options on its own.
* A fetch call to the Movieglu api to retrieve the top movies playing in theaters.
    * A for loop was added inside this fetch call to dynamically display the movie trailer, movie title, and description of the movie.
    * We also set an array variable in this for loop to get the value of the films id that we could use later.
* A second fetch call was then added to the google maps api to retreive the users geolocation.
    * From this data the users latitude and longitude based on the provided zip code would be logged to a variable via a string to pass it through a header of our next fetch call.
* A third fetch call to Movieglu was included to return the theaters and showtimes that the top movies are available to view.
    * In order to use this fetch call we used our variable that holds the latitude and longitude string value and the array with the film id values.
    * We used a for loop to loop through all of the film ids in our array.
* A click event was added to the Search button
    * This click event is what fires off the google api geolocation, and the movie showtimes and theater location info.
    * When the data is returned from the above api calls a for loop was added to dynamically set the showtimes of each movie to their appropriate carousel card.
        * In order to do this, we nested a for loop displaying the showtimes inside another for loop that selected all the appropraite carousel cards.
    * From this click event, the users zip code will also be stored to the local storage.

## Technologies Used
The list below are the technologies we used to build this application:
* HTML
* CSS
* JavaScript
* Bulma CSS Framework
* Movieglu API
* Google Maps API
* GitHub

## Demo of Deployed site
* Below is a demo of the deployed site with a user navigating from the landing page to the main page, inputting their zip code and checking that it is stored into the local storage.

![](./Assets/resources/Untitled_%20Nov%2030%2C%202022%206_09%20PM.gif)

## Project URLs
* Deployed site URL:https://nguyensang0323.github.io/movie-theater-collab/
* GitHub Repo URL: https://github.com/marsmeshed/movie-theater-collab