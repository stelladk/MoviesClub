checkConn();

function show_window(v) {

    document.getElementById("confirm").value = v;
    document.getElementById("box").style.display = "block";
    document.getElementById("window_form").style.display = "block";

    // document.getElementById("confirm").onclick = function() {
    //     if (v = "Log in") {
    //         login();
    //     } else {
    //         signup();
    //     }
    // };


}
document.getElementById("cancel").onclick = function() { close() };
document.getElementById("box").onclick = function() { close() };

function close() {
    document.getElementById("box").style.display = "none";
    document.getElementById("window_form").style.display = "none";
}

function search(value) {
    getMovies(value);
}

function signout(value) {
    var r = confirm("Would you like to sign out?")
    if (r == true) {
        log_in_out(false);
    }
}

function login() {

    log_in_out(true);
}

function signup() {
    // var user = {
    //     email: $("#email_form").val(),
    //     password: $("password_form").val()
    // }

    // $.ajax({
    //     url: '/signup',
    //     type: 'POST',
    //     dataType: 'json',
    //     data: JSON.stringify(user),
    //     success: function(test) {
    //         log_in_out(true);
    //         console.log(test);
    //     }
    // });
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
                    <div class="poster">
                        <a href="info">
                            <picture>
                                <img src="${poster}" alt="poster" width="200">
                            </picture>
                            <div class="opacity-box">
                                <p class="title">${movie.Title} (${movie.Year})</p>
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