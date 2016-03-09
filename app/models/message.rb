#this class is for messages
#each message has a user who sent it
#each message belongs to a conversation
class Message < ActiveRecord::Base
  belongs_to :conversation
  belongs_to :user
  
  #validates that the three specific attributes ar not blank
  validates_presence_of :body, :conversation_id, :user_id
end
