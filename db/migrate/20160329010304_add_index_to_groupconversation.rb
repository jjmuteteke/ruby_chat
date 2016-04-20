class AddIndexToGroupconversation < ActiveRecord::Migration
  def change
   
    add_index :groupconversations, :groupuserarray, unique: true
  end
end
