class GroupmessagesController < ApplicationController
    
      before_filter :authenticate_user!

    #builds a message for the specific conversation
  def create
    @groupconversation = Groupconversation.find(params[:groupconversation_id])
    @groupconversation.touch(:updated_at)
    @groupmessage = @groupconversation.groupmessages.build(message_params)
    @groupmessage.user_id = current_user.id
    @groupmessage.save!

    @gpath = groupconversation_path(@groupconversation)
  end

  private

  def message_params
    params.require(:groupmessage).permit(:body)
  end
end
