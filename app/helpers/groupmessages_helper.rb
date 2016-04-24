module GroupmessagesHelper
    def gself_or_other(message)
      puts message.user
      puts "gmlol"
      puts current_user
      puts "gmcur_use"
      puts message.user == current_user ? "self" : "other"
    message.user == current_user ? "self" : "other"
  end

  def gmessage_interlocutor(message)
    #message.user == message.conversation.sender ? message.conversation.sender : message.conversation.recipient
    message.user
    
  end   
  
  #checks if a string is a link
  def isitLink?(message)
   uri = URI.parse(message)
  %w( http https ).include?(uri.scheme)
  rescue URI::BadURIError
    false
  rescue URI::InvalidURIError
    false
  end
end
