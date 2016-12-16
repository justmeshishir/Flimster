class UsersController < ApplicationController
    def show
        @user = User.find(params[:id])
        @movies = Movie.all.includes(:reviews)
    end
    
    def timeline
        @reviews = current_user.reviews.order("created_at DESC")
    end
end
