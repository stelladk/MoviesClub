checkConn();
var g = sessionStorage.getItem('word');
if (g != null) {
    document.getElementById("sef").value = g;
    getMovies(g);
}

function show_signup() {

    document.getElementById("box").style.display = "block";
    document.getElementById("window_form").style.display = "block";
}

function show_login() {

    document.getElementById("box1").style.display = "block";
    document.getElementById("window_form1").style.display = "block";
}


document.getElementById("cancel").onclick = function() { close() };
document.getElementById("box").onclick = function() { close() };
document.getElementById("cancel1").onclick = function() { close() };
document.getElementById("box1").onclick = function() { close() };

function close() {
    document.getElementById("box").style.display = "none";
    document.getElementById("window_form").style.display = "none";
    document.getElementById("box1").style.display = "none";
    document.getElementById("window_form1").style.display = "none";
    
}

function search(value) {
    getMovies(value);
    sessionStorage.setItem("word", value);
}

function backsearch() {
    var v = document.getElementById("sef").value;
    sessionStorage.setItem('word', v);
}

function signout(value) {
    var r = confirm("Would you like to sign out?")
    if (r == true) {
        log_in_out(false);
    }
}

$(document).ready(function () {
    $("#window_form1").submit(function (event) {
        event.preventDefault();
        login();
    });
});

function login() {
	var account ={}
	account["email"]=$("#email_form1").val();
	account["password"]=$("#password_form1").val();
	console.log(account)
	alert("account");
	$.ajax({
		url: '/login',
		type: 'POST',
		contentType: "application/json",
		data: JSON.stringify(account),
		dataType: 'json',
		cache: false,
		timeout: 600000,
        success: function(data) {
			var json = JSON.stringify(data, null, 4);
			console.log(data);
			var msg = data["message"];
			if(msg=="success"){
				sessionStorage.setItem('email', data["account"]["email"]);
				alert("success");
				log_in_out(true);
			}else{
				alert("Wrong Data, try again!");
			}
        },
		error: function(e){
			console.log(e);
			alert("errorz");
		}
	});
	
	
    
}


function signup() {
    log_in_out(true);
    //go to main
}

function bookm(element) {
    checkConn();
    var connected = sessionStorage.getItem('connected');
    if (connected == "false") {
        alert("Please connect to your account to save this movie.");
    } else {

        if (element.children[0].className == "fa fa-bookmark-o") {
            element.children[0].className = "fa fa-bookmark";
        } else {
            element.children[0].className = "fa fa-bookmark-o";
            f = 0;
        }

        var preview = element.parentElement.parentElement;
        console.log(preview);
        var opacity = preview.children[0].children[0].children[1];
        console.log(opacity);
        var imdbId = opacity.children[1].innerHTML;
        console.log(imdbId);
//        getMovieById(imdbId);
    }
}

function log_in_out(f) {
    sessionStorage.setItem('connected', f);
    checkConn();
    window.location.reload();
}

function checkConn() {
    var connected = sessionStorage.getItem('connected');
    if (connected == null) {
        sessionStorage.setItem('connected', false);
        connected = false;
    }
    if (connected == "true") {
        document.getElementById("signup_btn").style.display = "none";
        document.getElementById("login_btn").style.display = "none";
        document.getElementById("bookm_btn").style.display = "list-item";
        document.getElementById("profile_btn").style.display = "list-item";
    } else {
        document.getElementById("signup_btn").style.display = "list-item";
        document.getElementById("login_btn").style.display = "list-item";
        document.getElementById("bookm_btn").style.display = "none";
        document.getElementById("profile_btn").style.display = "none";
    }
}

function getMovies(text) {
    axios.get('http://www.omdbapi.com/?s=' + text + '&apikey=e92b384b')
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                //     output += `
                // <div class="movie-item">
                //     <div class="poster">
                //         <a href="info">
                //             <picture>
                //                 <img src="${movie.Poster}" alt="poster" width="200">
                //             </picture>
                //         </a>
                //         <div class="overlay-down">
                //             <button onclick="bookm(this)" type="button" class="btnbkmrk" title="book">
                //                     <i class="fa fa-bookmark-o"></i>
                //                 </button>
                //         </div>
                //     </div>
                //     <div class="description">
                //         <span class="title">${movie.Title}</span><span class="year"> (${movie.Year})</span>
                //     </div>
                // </div>
                // `;
                var poster = movie.Poster;
                if (poster == "N/A") {
                    poster = "film-reel.png";
                }
                output += `
                <div class="movie-preview">
                    <div class="poster" onclick="saveImdbID(this)">
                        <a href="info">
                            <picture>
                                <img src="${poster}" alt="poster" width="200">
                            </picture>
                            <div class="opacity-box">
                                <p class="title">${movie.Title} (${movie.Year})</p>
                                <p class="imdbID">${movie.imdbID}</p>
                            </div>
                        </a>
                    </div>
                        <div class="overlay-down">
                            <button onclick="bookm(this)" type="button" class="btnbkmrk" title="Αγορά">
                                <i class="fa fa-bookmark-o"></i>
                            </button>
                        </div>
                </div>
                `;
            });

            $('#moviesc').html(output);

        }).catch((err) => {
            console.log(err)
        });
}


//function getMovieById(imdbId){
//    axios.get('http://www.omdbapi.com/?i=' + imdbId + '&apikey=e92b384b')
//    .then((response) => {
//        console.log(response)
//
//    }).catch((err) => {
//        console.log(err)
//    });
//}

function saveImdbID(element){
    var imdbID = element.children[0].children[1].children[1].innerHTML;
    sessionStorage.setItem('imdbID', imdbID);
}