#this class will model the conversations of the users
class Conversation < ActiveRecord::Base
    #these two lines indicate that the conversation belongs to both a sender and a recipient which are both users
    #as you can see the foriegn keys link to the sender and receiver
    belongs_to :sender, :foreign_key => :sender_id, class_name: 'User'
    belongs_to :recipient, :foreign_key => :recipient_id, class_name: 'User'
    
    #conversation has many messages
    #depedent destroy means that all things associated with this conversation will be removed if this conversation is removed
    has_many :messages, dependent: :destroy
    #each conversation has a folder
    #each folder row will have a foreign id linking it to a conversation
    has_one :folder
    #makes sure that the sender recipient id conversations are unique
    validates_uniqueness_of :sender_id, :scope => :recipient_id
    
    #this gets all the conversations of the current logged in user
    scope :involving, -> (user) do
        where("conversations.sender_id =? OR conversations.recipient_id =?",user.id,user.id)
    end
    
    #this scope checks wether a conversation exist between two users before creating a new conversation
    scope :between, -> (sender_id,recipient_id) do
        where("(conversations.sender_id = ? AND conversations.recipient_id =?) OR (conversations.sender_id = ? AND conversations.recipient_id =?)", sender_id,recipient_id, recipient_id, sender_id)
    end
    
    scope :availableUsers, ->(sen_id,rec_id) do
        ary = Array.new 
        ary.push(sen_id)
        ary.push(rec_id)
     User.where.not(id: ary)
    end
  
end
