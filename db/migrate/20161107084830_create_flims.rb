class CreateFlims < ActiveRecord::Migration
  def change
    create_table :flims do |t|
      t.text :name
      t.text :genre
      t.integer :rating
      t.timestamps null: false
    end
  end
end
