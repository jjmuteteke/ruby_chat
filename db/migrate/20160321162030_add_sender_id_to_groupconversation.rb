class AddSenderIdToGroupconversation < ActiveRecord::Migration
  def change
    add_column :groupconversations, :sender_id, :integer
    add_index :groupconversations, :sender_id
  end
end
