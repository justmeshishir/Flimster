class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :movie
  has_many :votes
  validate :user, :movie, :comment
  
end