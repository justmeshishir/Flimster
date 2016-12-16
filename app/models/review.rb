class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :movie
  has_many :votes
  validate :user, :movie, :comment
  scope :recent, -> {order("created_at DESC").limit(5)}
  delegate :username, :id, to: :user, prefix: true
  delegate :title, :id, to: :movie, prefix: true  
end