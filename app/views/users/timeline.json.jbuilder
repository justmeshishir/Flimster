
json.reviews do
  json.array! @reviews do |review|
    json.movie review.movie, :title, :id, :year, :imdbrating, :imdbid, :poster
    json.comment review.comment
    json.user review.user
  end
end