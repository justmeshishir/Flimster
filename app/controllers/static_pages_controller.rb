class StaticPagesController < ApplicationController
    def index
       @movie = Movie.recent
       @recent_reviews = Review.recent
    end
    
    def user_name
       user.username 
    end
    
    def movie_title
       movie.title 
    end
    
    def movie_id
       movie.id 
    end
end
