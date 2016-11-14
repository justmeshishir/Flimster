class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  mount_uploader :avatar, AvatarUploader
  has_many :reviews
  
  def reviewed?(movie)
    reviews.each do |review|
     return true if review.movie_id == movie.id
    end
    false
  end
end
