class DeleteFlimsTable < ActiveRecord::Migration
  def change
    drop_table :flims
  end
end
