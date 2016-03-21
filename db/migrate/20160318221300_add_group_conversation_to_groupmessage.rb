class AddGroupConversationToGroupmessage < ActiveRecord::Migration
  def change
    add_reference :groupmessages, :groupconversation, index: true, foreign_key: true
  end
end
