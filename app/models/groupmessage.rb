class Groupmessage < ActiveRecord::Base
    belongs_to :groupconversation
  belongs_to :user
  
  #validates that the three specific attributes ar not blank
  validates_presence_of :body, :groupconversation_id, :user_id
end
