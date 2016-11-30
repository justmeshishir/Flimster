class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :movie
  validate :user, :movie, :comment
end