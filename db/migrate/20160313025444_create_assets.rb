class CreateAssets < ActiveRecord::Migration
  def change
    create_table :assets do |t|
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
      add_index :assets, :user_id
    end
  end
end
