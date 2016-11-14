class MoviesController < ApplicationController
    before_action :authenticate_user!
    def index
        @movies = Movie.all
    end
    
    def show
        @movie = Movie.find(params[:id])
        @reviewed = current_user.reviewed?(@movie)
    end
end
