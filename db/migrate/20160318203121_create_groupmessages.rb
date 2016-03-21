class CreateGroupmessages < ActiveRecord::Migration
  def change
    create_table :groupmessages do |t|
      t.text :body
      t.references :groupconversation, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
