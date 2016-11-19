/* global $ */
/* global id */
$(function(){
    
    $('#movies').imagesLoaded(function(){
        $('#movies').masonry({
            itemSelector: '.box',
            isFitWidth: true
        });
    });
    let form = $('#movie-search');
    form.submit(function(e){
        $.ajax({
        url: 'https://www.omdbapi.com/?',
        data: form.serialize()
        })
        .done(function(data)
        {
            displayMovies(data); 
        });
       e.preventDefault(); 
    });
  function displayMovies(data)
    {
        let container = $('#movies');
        let htmlString ="";
        container.empty();
        if (data["Response"] == "False") {
            htmlString = `<div class="alert alert-danger text-center" role="alert">${data["Error"]}</div>`
        }
        else {
            data["Search"].forEach(function(movie){
              htmlString += `<img class="movie-container-img" src=${movie["Poster"] == "N/A" ? "assets/movies.jpg" : movie["Poster"]} data-id="${movie['imdbID']}" />
                       <p>${movie["Title"]}</p>
                       <p>${movie["Year"]}</p>`;
            });
            container.append(htmlString);
            
        }
    }
    
    function displayMovie(data)
    {
        
        let container = $('#movies');
        let htmlString;
        container.empty();
        
              htmlString = 
              `<div class="movie-poster">
              <img src=${data["Poster"] == "N/A" ? "assets/movies.jpg" : data["Poster"]} class="img-responsive center-block" />
             </div>
             <div class="movie-detail">
                      <p class="title">${data["Title"]}</p>
                      <label>Year: </label> <p>${data["Year"]}</p>
                      <label>Rated: </label> <p>${data["Rated"]}</p>
                      <label>Released: </label><p>${data["Released"]}</p>
                      <label>Runtime: </label> <p>${data["Runtime"]}</p>
            </div>
            <form id="rating-form" action="/reviews" method="POST">
              <input type="hidden" name="authenticity_token" value=${window._token} />
              <input type="hidden" name="imdbid" value=${data["imdbID"]} />
              <textarea name= "review[comment]" class="form-control" placeholder="Your movie review"/>
              <br />
              <input type="submit" class="btn btn-success pull-right" />
            </form>`;
        container.append(htmlString);
    }
    
    $('#movies').on('click', '.movie-container-img', function(e){
      let id = $(e.target).data('id');
      alert(id);
      $.ajax({
        url: `https://www.omdbapi.com/?`,
        data: {i: id}
        })
        .done(function(data){
            displayMovie(data);
        });
        e.preventDefault();
    });
    
  });
  
  