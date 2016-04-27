class DropGroupfolders < ActiveRecord::Migration
  def change
    drop_table :groupfolders
  end
end
