module GroupmessagesHelper
    def gself_or_other(message)
      puts message.user.name
      puts "gmlol"
      puts current_user.name
      puts "gmcur_use"
    message.user == current_user ? "self" : "other"
  end

  def gmessage_interlocutor(message)
    #message.user == message.conversation.sender ? message.conversation.sender : message.conversation.recipient
    message.user
    
  end   
end
