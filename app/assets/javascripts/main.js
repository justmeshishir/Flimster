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
                  htmlString += `<div class="box panel panel-default">
                  <img class="movie-container-img" src=${movie["Poster"] == "N/A" ? "assets/movies.jpg" : movie["Poster"]} data-id="${movie['imdbID']}" />
                           <div class="panel-body">
                               <p>${movie["Title"]}</p>
                               <p>${movie["Year"]}</p>
                            </div>
                    </div>`;
                });
                container.append(htmlString);
                container.masonry('reloadItems');
                 container.imagesLoaded(function(){
                    container.masonry({
                    itemSelector: '.box',
                    isFitWidth: true
                });
            });
        }
    }
    
    function displayMovie(data)
    {
        
        let container = $('#movies');
        let htmlString;
        container.empty();
        
              htmlString = 
              `<div class="col-xs-6 col-md-4">
              <div class="movie-poster">
              <img src=${data["Poster"] == "N/A" ? "assets/movies.jpg" : data["Poster"]} class="img-responsive center-block" />
             </div>
             </div>
             <div class="col-xs-6 col-md-8">
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
            </form>
            </div>`;
        container.append(htmlString);
    }
    
    $('#movies').on('click', '.movie-container-img', function(e){
      let id = $(e.target).data('id');
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
  
  