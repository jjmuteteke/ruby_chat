#helpers are used by the controller to abstract certain function that a partial might need
module MessagesHelper
 def self_or_other(message)
    message.user == current_user ? "self" : "other"
  end

  def message_interlocutor(message)
    message.user == message.conversation.sender ? message.conversation.sender : message.conversation.recipient
  end   
end
