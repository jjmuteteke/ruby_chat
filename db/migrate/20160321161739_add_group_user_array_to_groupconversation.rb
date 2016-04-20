class AddGroupUserArrayToGroupconversation < ActiveRecord::Migration
  def change
    add_column :groupconversations, :groupuserarray, :integer, array: true, default: []
    add_index :groupconversations, :groupuserarray, unique: true
  end
end
