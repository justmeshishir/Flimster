class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :movie
  has_many :votes
  validate :user, :movie, :comment
  scope :recent, -> {order("created_at DESC").limit(5)}
    def user_name
       user.username 
    end
    
    def user_id
      user.id
    end
    
    def movie_title
       movie.title 
    end
    
    def movie_id
       movie.id 
    end
end