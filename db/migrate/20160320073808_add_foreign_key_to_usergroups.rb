class AddForeignKeyToUsergroups < ActiveRecord::Migration
  def change
    add_foreign_key :usergroups, :users
    add_foreign_key :usergroups, :groupconversations
  end
end
