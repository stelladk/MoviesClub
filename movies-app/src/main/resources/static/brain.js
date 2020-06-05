var bookmarks;
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
        window.location.href = "index.html";
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
				log_in_out(true);
			}else{
				alert("Wrong Data, try again!");
			}
        },
		error: function(e){
			console.log(e);
		}
	});

}


function signup() {
    log_in_out(true);
}

function bookm(element) {
    checkConn();
    var connected = sessionStorage.getItem('connected');
    if (connected == "false") {
        alert("Please connect to your account to save this movie.");
    } else {

        var preview = element.parentElement.parentElement;
        var opacity = preview.children[0].children[0].children[1];
        var imdbID = opacity.children[1].innerHTML;
        console.log(imdbID);

        var email = sessionStorage.getItem("email");
        console.log(email);

        if (element.children[0].className == "fa fa-bookmark-o") {
            var success = saveBookmark(email, imdbID);
            console.log(success);
            if(success) element.children[0].className = "fa fa-bookmark"; //save
        } else {
            var success = deleteBookmark(email, imdbID);
            if(success) element.children[0].className = "fa fa-bookmark-o"; //delete
			if(window.location.href == "http://localhost:8181/bookmarks"){
				console.log("im in");
				window.location.reload();
			}
        }

    }
}

function saveBookmark(email, imdbID){
//    var bookmark ={}
//    bookmark["bookmarkId"]["email"] = email;
//    bookmark["bookmarkId"]["imdb_id"] = imdbID;

//	var bookmark = {
//	    bookmarkId : {email : email, imdb_id : imdbID}
//	};

    var success = false;

    var account = {};
    account["email"] = email;
    var bookmarkId = {};
    bookmarkId["account"] = account;
    bookmarkId["imdb_id"] = imdbID;

    var bookmark = {};
    bookmark["bookmarkId"] = bookmarkId;

	console.log(bookmark);

	$.ajax({
		url: '/saveb',
		type: 'POST',
		contentType: "application/json",
		data: JSON.stringify(bookmark),
		dataType: 'json',
		async: false,
		cache: false,
		timeout: 600000,
        success: function(data) {
			var json = JSON.stringify(data, null, 4);
			console.log(data);
			var msg = data["message"];
			if(msg=="success"){
				success = true;
			}else{
				alert("System fail!");
			}
        },
		error: function(e){
			console.log(e);
		}
	});
	return success;
}

function deleteBookmark(email, imdbID){
    var success = false;

    var account = {};
    account["email"] = email;
    var bookmarkId = {};
    bookmarkId["account"] = account;
    bookmarkId["imdb_id"] = imdbID;

    var bookmark = {};
    bookmark["bookmarkId"] = bookmarkId;

	console.log(bookmark);

	$.ajax({
		url: '/deleteb',
		type: 'POST',
		contentType: "application/json",
		data: JSON.stringify(bookmark),
		dataType: 'json',
		async: false,
		cache: false,
		timeout: 600000,
        success: function(data) {
			var json = JSON.stringify(data, null, 4);
			console.log(data);
			var msg = data["message"];
			if(msg=="success"){
                success = true;
			}else{
				alert("System fail!");
			}
        },
		error: function(e){
			console.log(e);
		}
	});
	return success;
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
        getBookmarks();
    } else {
        document.getElementById("signup_btn").style.display = "list-item";
        document.getElementById("login_btn").style.display = "list-item";
        document.getElementById("bookm_btn").style.display = "none";
        document.getElementById("profile_btn").style.display = "none";
    }
}

function getMovies(text) {
    var icon;
    var hover;
    empty_icon = "fa fa-bookmark-o";
    full_icon = "fa fa-bookmark";
    let connected = sessionStorage.getItem("connected");

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
                if(connected == "false"){
                    icon = empty_icon;
                }else{
                    var email = sessionStorage.getItem("email");
                    if(checkBookmark(email, movie.imdbID)){
                        icon = full_icon;
                    }else{
                        icon = empty_icon;
                    }
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
                            <button onclick="bookm(this)" type="button" class="btnbkmrk" title="Save it!">
                                <i class="${icon}"></i>
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

function getBookmarks(){
	var email = sessionStorage.getItem('email');
	console.log(email);
	$.ajax({
		url: '/bookmarks',
		type: 'POST',
		contentType: "application/json",
		data: email,
		dataType: 'json',
		async: false,
		cache: false,
		timeout: 600000,
        success: function(data) {
			var json = JSON.stringify(data, null, 4);
			console.log(data);
			var msg = data["message"];
			console.log(msg);
			if(msg=="success"){
                bookmarks = data["bookmarks"];
			}else{
				alert("System fail!");
			}
        },
		error: function(e){
			console.log(e);
		}
	});
}

function checkBookmark(email, imdbID){
    var exists = false;

    var account = {};
    account["email"] = email;

    var bookmarkId = {};
    bookmarkId["account"] = account;
    bookmarkId["imdb_id"] = imdbID;

    var bookmark = {};
    bookmark["bookmarkId"] = bookmarkId;

    $.ajax({
        url: '/checkb',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(bookmark),
        dataType: 'json',
        async: false,
        cache: false,
        timeout: 600000,
        success: function(data) {
            var json = JSON.stringify(data, null, 4);
            console.log(data);
            var msg = data["message"];
            console.log(msg);
            if(msg=="true"){
                exists = true;
            }
        },
        error: function(e){
            console.log(e);
        }
    });
    return exists;
}