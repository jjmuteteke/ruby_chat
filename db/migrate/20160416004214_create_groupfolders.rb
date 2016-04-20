class CreateGroupfolders < ActiveRecord::Migration
  def change
    create_table :groupfolders do |t|
      t.references :groupconversation, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
