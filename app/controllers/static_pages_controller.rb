class StaticPagesController < ApplicationController
    def index
       @movie = Movie.recent
    end
end
