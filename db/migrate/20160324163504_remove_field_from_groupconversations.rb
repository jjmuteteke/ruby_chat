class RemoveFieldFromGroupconversations < ActiveRecord::Migration
  def change
    remove_column :groupconversations, :sender_id, :integer
  end
end
