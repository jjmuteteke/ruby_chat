class GroupconversationsController < ApplicationController
    before_filter :authenticate_user!

  layout false

    #checks if group conversation between this user and the other group users
    if Groupconversation.between(paramsparams[:sender_id],params[:groupuserarray]).present?
        #do something
        @groupconversation = Groupconversation.between(paramsparams[:sender_id],params[:groupuserarray]).first
    else
        #do smoe
         @groupconversation = Groupconversation.create!(groupconvo_params)

    render json: {groupconversation_id: @groupconversation.id }
  end
    #after being called by chat.js
    #we get who the receiver of message is 
    #as well as the messages in the convo
  def show
    
  end

  private
  def groupconvo_params
      params.permit( :groupuserarray)
    
  end

  def interlocutor(conversation)
    
  end
end
