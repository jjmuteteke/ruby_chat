class Usergroup < ActiveRecord::Base
    belongs_to :users
    belongs_to :groupconversations
end
