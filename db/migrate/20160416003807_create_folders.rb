class CreateFolders < ActiveRecord::Migration
  def change
    create_table :folders do |t|
      t.references :conversation, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
