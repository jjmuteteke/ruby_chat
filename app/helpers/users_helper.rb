module UsersHelper
    def conversation_interlocutor(conversation)
    conversation.recipient == current_user ? conversation.sender : conversation.recipient
    end
  
    def grconversation_interlocutor(conversation)
        newrec = conversation.groupuserarray
        newrec.delete(current_user.id)
        val = User.find(newrec)
        tnum = val.length-1
        if conversation.groupuserarray.length == 2
            
            return val[0].name + " and " + val[1].name
        else
            return val[0].name + " and #{tnum} more"
        end
    end
end
