class Groupconversation < ActiveRecord::Base
    has_many :usergroups
    has_many :users, through: :usergroups
    
    #conversation has many messages
    #depedent destroy means that all things associated with this conversation will be removed if this conversation is removed
    has_many :groupmessages, dependent: :destroy
    
    #this scope checks wether a group conversation exists between this user and the array of selected group members
    scope :between, -> (sender_id,groupuserarray) do
         join(:usergroups).where(("usergroups.user_id =?"),sender_id).where(("groupconversation.groupuserarray =?"),groupuserarray)
        
        
    end
end
