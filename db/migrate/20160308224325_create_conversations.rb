#this is the data base table described for conversation
#each conversation has a sender and a recipient
#these migration allows us to update the database without constanly going through it ourselves
class CreateConversations < ActiveRecord::Migration
  def change
    create_table :conversations do |t|
      t.integer :sender_id
      t.integer :recipient_id

      t.timestamps null: false
    end
    #these indexes allow for better searching of table
  add_index :conversations, :sender_id
  add_index :conversations, :recipient_id
  end
end
