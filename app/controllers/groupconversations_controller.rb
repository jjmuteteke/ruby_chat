class GroupconversationsController < ApplicationController
    before_filter :authenticate_user!, :only => [:index]
    before_action :set_s3_direct_post, only: [:show]

    #skip_before_filter :authenticate_user! , :only => [:index]
  layout false
   respond_to :json
    def index
      @groupconvo = Groupconversation.all
    end
    #checks if group conversation between this user and the other group users
    def create
    #if Groupconversation.between(params[:sender_id],params[:groupuserarray]).present?
        #do something
       # @groupconversation = Groupconversation.between(params[:sender_id],params[:groupuserarray]).first
    #else
        #do smoe
        if Groupconversation.exists(params[:groupuserarray]).present?
            @groupconversation = Groupconversation.exists(params[:groupuserarray]).first
        else
            @groupconversation = Groupconversation.create!(groupconversation_params)
            Groupconversation.upgrade(params[:groupuserarray],@groupconversation.id)
        end
    #end
    
    render json: {groupconversation_id: @groupconversation.id }

    end
    #after being called by chat.js
    #we get who the receiver of message is 
    #as well as the messages in the convo
  def show
    @gconversation = Groupconversation.find(params[:id])
    @recievers = interlocutor(@gconversation)
    @gmessages = @gconversation.groupmessages
    @gmessage = Groupmessage.new
    @newUsers = Groupconversation.new
    @userChoice = Groupconversation.availableUsers(@gconversation.groupuserarray)
    #@s3_direct_post = set_s3_direct_post
    
    
    
  end

  def update
    @gconversation = Groupconversation.find(params[:id])
    newG= params[:newGuys]
    puts "in update"
    puts newG
    if @gconversation.update(groupconversation_params)
      Groupconversation.upgrade(newG,params[:id])
      #redirect_to action: "show" #this keeps causing errors which is that it keeps adding to usergroup r some reason
      render :nothing => true, :status => 200
      #redirect_to @gconversation
    else
      redirect_to action: "show"
    end
  
    
    
    
  end
  def searchUsers
    @userChoicer = User.all.select("id","name")
    respond_to do |format|
      format.html
      format.json { render json: @userChoicer }
    end
  end
  private
  def groupconversation_params
      params.permit(:groupuserarray => [])
    
  end
    #this will return a list of users who are in this group
    #this will need to be updated since one of the group members will be part of the group
    #so it will have to checck wether the aprticualr member is current user
  def interlocutor(gconversation)
    newrec = gconversation.groupuserarray
    newrec.delete(current_user.id)
    return User.find(newrec)
  end
  
   def set_s3_direct_post
    #@s3_direct_post = S3_BUCKET.presigned_post(key: "g/g/y/${filename}", success_action_status: '201', acl: 'public-read')
    cred  = Aws::Credentials.new(ENV['AKIAJTXU6ODJFSNWQ5VA'], ENV['DNf3X97Imm+cBIE8hHHTLiFHidlpnl6K6wnG+6qO'])
    
    @post = Aws::S3::PresignedPost.new(cred, "Oregon", "groupchat", {
  key: "g/g/y/${filename}", success_action_status: '201', acl: 'public-read'
  
})
 #render json: {  url: @post.url }

   end 
end
