class RemoveIndexFromGroupconversation < ActiveRecord::Migration
  def change
    remove_index :groupconversations, :groupuserarray
    
  end
end
