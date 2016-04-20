#this is the controller that actually talks to the server
#in this case its the conversation class so it accesses those methods
class ConversationsController < ApplicationController
    before_filter :authenticate_user!

  layout false

    #checks if converstation between sender and recipient is available if not create in database
  def create
    if Conversation.between(params[:sender_id],params[:recipient_id]).present?
      @conversation = Conversation.between(params[:sender_id],params[:recipient_id]).first
    else
      @conversation = Conversation.create!(conversation_params)
      #@folderobj  = S3_BUCKET.objects[params[:file].original_filename]
    end

    render json: { conversation_id: @conversation.id }
  end
    #after being called by chat.js
    #we get who the receiver of message is 
    #as well as the messages in the convo
  def show
    @conversation = Conversation.find(params[:id])
    @reciever = interlocutor(@conversation)
    @messages = @conversation.messages
    @message = Message.new
  end

  private
  def conversation_params
    params.permit(:sender_id, :recipient_id)
  end

  def interlocutor(conversation)
    current_user == conversation.recipient ? conversation.sender : conversation.recipient
  end
  
  
end
