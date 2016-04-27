#this is the controller that actually talks to the server
#in this case its the conversation class so it accesses those methods
class ConversationsController < ApplicationController
    before_filter :authenticate_user!
   before_action :set_s3_direct_post, only: [:show]
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
    @userChoice = Conversation.availableUsers(@conversation.sender_id,@conversation.recipient_id)
  end
  
  def searchUsers
   #@userChoicer = User.all.select("id","name")
   filen = params[:filename]
   idd = params[:idd]
    @oobject = S3_BUCKET.objects["convo/#{idd}/#{current_user.id}/#{filen}"]
    @text = @oobject.url_for(:get, { :expires => 20.minutes.from_now, :secure => true }).to_s
    client = Bitly.client
    @url = client.shorten(@text)
    respond_to do |format|
      format.html
      format.json { render json: @url }
    end
  end

  private
  def conversation_params
    params.permit(:sender_id, :recipient_id)
  end

  def interlocutor(conversation)
    current_user == conversation.recipient ? conversation.sender : conversation.recipient
  end
  def set_s3_direct_post
    @post = S3_BUCKET.presigned_post(key: "convo/#{params[:id]}/#{current_user.id}/${filename}", success_action_status: '201', acl: 'public-read')
    #@oobject = S3_BUCKET.objects["#{params[:id]}/#{current_user.id}/"]
    #@text = @oobject.url_for(:get, { :expires => 20.minutes.from_now, :secure => true }).to_s
=begin    
   cred  = Aws::Credentials.new(ENV['AWS_ACCESS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY'])
    #buck = ENV['groupchat']
    #buckk = Aws::S3::Resource.new.bucket('groupchat')
    @post = Aws::S3::PresignedPost.new(cred, "us-west-2", ENV['S3_BUCKET'] , {
  key: "uploads/#{SecureRandom.uuid}/${filename}",  content_length_range: 0..999999999, acl: 'public-read',success_action_status: '201',
  
  })
  @fie = @post.to_json;
=end
 #@fie = @post.to_json;
 #render json: {  url: @post.url }

   end 
  
end
