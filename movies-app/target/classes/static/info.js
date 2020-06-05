var imdbID = sessionStorage.getItem('imdbID');
console.log(imdbID);

getMovieById(imdbID);


function getMovieById(imdbId){
    axios.get('http://www.omdbapi.com/?i=' + imdbId + '&apikey=e92b384b')
    .then((response) => {
        console.log(response)

        let movie = response.data;

        var img = movie.Poster;
        if (img == "N/A") {
            img = "film-reel.png";
        }
    console.log(movie.Title);
        document.getElementById("poster").src = img;
        document.getElementById("title").innerHTML = movie.Title;
        document.getElementById("year").innerHTML = movie.Year;
        document.getElementById("released").innerHTML = movie.Released;
        document.getElementById("runtime").innerHTML = movie.Runtime;
        document.getElementById("genre").innerHTML = movie.Genre;
        document.getElementById("director").innerHTML = movie.Director;
        document.getElementById("writer").innerHTML = movie.Writer;
        document.getElementById("actors").innerHTML = movie.Actors;
        document.getElementById("plot").innerHTML = movie.Plot;
        document.getElementById("language").innerHTML = movie.Language;
        document.getElementById("country").innerHTML = movie.Country;
        document.getElementById("awards").innerHTML = movie.Awards;
        document.getElementById("rating").innerHTML = movie.imdbRating;
        document.getElementById("type").innerHTML = movie.Type;
        document.getElementById("dvd").innerHTML = movie.DVD;
        document.getElementById("boxoffice").innerHTML = movie.BoxOffice;
        document.getElementById("production").innerHTML = movie.Production;

    }).catch((err) => {
        console.log(err)
    });
}