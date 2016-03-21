class AddSenderIdToGroupconversations < ActiveRecord::Migration
  def change
    add_column :groupconversations, :sender_id, :integer
  end
end
