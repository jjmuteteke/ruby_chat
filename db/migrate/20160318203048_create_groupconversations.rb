class CreateGroupconversations < ActiveRecord::Migration
  def change
    create_table :groupconversations do |t|

      t.timestamps null: false
    end
  end
end
