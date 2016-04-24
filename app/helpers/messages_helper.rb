#helpers are used by the controller to abstract certain function that a partial might need
module MessagesHelper
 def self_or_other(message)
     puts message.user.name
      puts "mlol"
      puts current_user.name
      puts "mcur_use"
      puts message.user == current_user ? "self" : "other"
    message.user == current_user ? "self" : "other"
  end

  def message_interlocutor(message)
    message.user == message.conversation.sender ? message.conversation.sender : message.conversation.recipient
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
