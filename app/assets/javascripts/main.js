/* global $ */
/* global id */
$(function(){
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
              htmlString += `<img src=${movie["Poster"] == "N/A" ? "../../../public/images/movies.jpg" : movie["Poster"]} data-id="${movie['imdbID']}" />
                       <p>${movie["Title"]}</p>
                       <p>${movie["Year"]}</p>`;
            });
            container.append(htmlString);
        }
    }
    
    function displayMovie(data)
    {
        let container1 = $('#movies');
        let htmlString1;
        container1.empty();
              htmlString1 = 
              `<div class="movie-poster">
              <img src=${data["Poster"] == "N/A" ? "../../../public/images/movies.jpg" : data["Poster"]} class="img-responsive center-block" />
             </div>
             <div class="movie-detail">
                      <p class="title">${data["Title"]}</p>
                      <label>Year: </label> <p>${data["Year"]}</p>
                      <label>Rated: </label> <p>${data["Rated"]}</p>
                      <label>Released: </label><p>${data["Released"]}</p>
                      <label>Runtime: </label> <p>${data["Runtime"]}</p>
            </div>`;
        container1.append(htmlString1);
    }
    
    $('#movies').on('click', 'img', function(e){
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
  
  
  