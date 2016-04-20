class RemoveFieldNameFromGroupconversations < ActiveRecord::Migration
  def change
    remove_column :groupconversations, :groupuserarray, :integer
  end
end
