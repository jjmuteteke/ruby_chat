class GroupconversationsController < ApplicationController
    before_filter :authenticate_user!, :only => [:index]
    before_action :set_s3_direct_post, only: [:show]
     enable_sync 
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
  
  def adduserrs
    respond_to do |format|
      format.js
    end
    
  end
  def searchUsers
   #@userChoicer = User.all.select("id","name")
   filen = params[:filename]
   idd = params[:idd]
    @oobject = S3_BUCKET.objects["groupconvo/#{idd}/#{current_user.id}/#{filen}"]
    @text = @oobject.url_for(:get, { :expires => 20.minutes.from_now, :secure => true }).to_s
    client = Bitly.client
    @url = client.shorten(@text)
    respond_to do |format|
      format.html
      format.json { render json: @url }
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
    @post = S3_BUCKET.presigned_post(key: "groupconvo/#{params[:id]}/#{current_user.id}/${filename}", success_action_status: '201', acl: 'public-read')
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
