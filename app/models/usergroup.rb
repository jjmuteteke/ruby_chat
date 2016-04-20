class Usergroup < ActiveRecord::Base
    belongs_to :user
    belongs_to :groupconversation
end
