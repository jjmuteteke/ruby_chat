class AddColumnToGroupmessages < ActiveRecord::Migration
  def change
    add_column :groupmessages, :body, :text
    add_reference :groupconversations, :groupconversation, index: true, foreign_key: true
    add_reference :users, :user, index: true, foreign_key: true
    
  end
end
