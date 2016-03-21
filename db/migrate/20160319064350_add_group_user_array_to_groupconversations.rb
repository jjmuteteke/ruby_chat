class AddGroupUserArrayToGroupconversations < ActiveRecord::Migration
  def change
    add_column :groupconversations, :groupuserarray, :integer, array:true, default: []
  end
end
