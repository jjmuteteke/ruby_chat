class Groupconversation < ActiveRecord::Base
    has_many :usergroups
    has_many :users, through: :usergroups
    
    #conversation has many messages
    #depedent destroy means that all things associated with this conversation will be removed if this conversation is removed
     has_one :groupfolders
    has_many :groupmessages, dependent: :destroy
    
    #this scope checks wether a group conversation exists between this user and the array of selected group members
    scope :exists, -> (groupuserarray) do
         #join(:usergroups).where(("usergroups.user_id =?"),sender_id).where(("groupconversation.groupuserarray =?"),groupuserarray)
          #Groupconversation.joins(:usergroups).group(:id) #gets all users sorted perconversation
          
         # arlist = Array.new(groupuserarray.length)
         # groupuserarray.each do |d|
          #    arlist.push(Usergroup.where('usergroups.user_id =?',d))
              
         # end
         #added the ::int[] to type cast the groupuserarray
         #Groupconversation.joins(:users).where(:users => {:id => groupuserarray}).uniq.where('groupuserarray = ARRAY[?]::int[]', groupuserarray)
           Groupconversation.uniq.where('groupuserarray = ARRAY[?]::int[]', groupuserarray)   
        
    end
    
    #this is used to update the many to many table so that
    #the users are connected to their groupconversations
    scope :upgrade, -> (groupuserarray,groupconvo_id) do
     
       test = User.find(groupuserarray)
       puts "in upgrade";
       puts groupuserarray;
       puts test;
       test.each do |d|
           puts "1";
          d.usergroups.create(groupconversation_id: groupconvo_id) 
       end
       
    
       
    end
    #returns al the users that are not in the group
    #meaning the users available for selection will not be in the group currently
    scope :availableUsers, ->(groupuserarray) do
     User.where.not(id: groupuserarray)
    end
    
    scope :currentUsers, ->(groupuserarray) do
      User.find(groupuserarray)
    end
end
