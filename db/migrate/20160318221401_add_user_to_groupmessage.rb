class AddUserToGroupmessage < ActiveRecord::Migration
  def change
    add_reference :groupmessages, :user, index: true, foreign_key: true
  end
end
