getBookmarks();


function getBookmarks(){
	var email = sessionStorage.getItem('email');
	console.log(email);
	$.ajax({
		url: '/bookmarks',
		type: 'POST',
		contentType: "application/json",
		data: email,
		dataType: 'json',
		cache: false,
		timeout: 600000,
        success: function(data) {
			var json = JSON.stringify(data, null, 4);
			console.log(data);
			var msg = data["message"];
			console.log(msg);
			if(msg=="success"){
				alert("success");
                var bookmarks = data["bookmarks"];
				let output='';
				$.each(bookmarks, (index, bookmark) => {
					var imdbId = bookmark["bookmarkId"]["imdb_id"];
					    axios.get('http://www.omdbapi.com/?i=' + imdbId + '&apikey=e92b384b')
					    .then((response) => {
					        console.log(response)
					
					        let movie = response.data;
					
					        var img = movie.Poster;
					        if (img == "N/A") {
					            img = "film-reel.png";
					        }						
			                output += `
			                <div class="movie-preview">
			                    <div class="poster" onclick="saveImdbID(this)">
			                        <a href="info">
			                            <picture>
			                                <img src="${img}" alt="poster" width="200">
			                            </picture>
			                            <div class="opacity-box">
			                                <p class="title">${movie.Title} (${movie.Year})</p>
			                                <p class="imdbID">${movie.imdbID}</p>
			                            </div>
			                        </a>
			                    </div>
		                        <div class="overlay-down">
		                            <button onclick="bookm(this)" type="button" class="btnbkmrk" title="Bookmark">
		                                <i class="fa fa-bookmark"></i>
		                            </button>
		                        </div>
			                </div>
			                `;
						$('#moviesc').html(output);
						console.log("test101");
					    }).catch((err) => {
					        console.log(err)
					    });
				});


					
			}else{
				alert("System fail!");
			}
        },
		error: function(e){
			console.log(e);
			alert("errorz");
		}
	});
}