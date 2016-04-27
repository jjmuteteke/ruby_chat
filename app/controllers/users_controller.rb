class UsersController < ApplicationController
    before_filter :authenticate_user!
    
  def index
      @fusers = User.all
      @users = User.where.not("id = ?",current_user.id).order("created_at DESC")
      @conversations = Conversation.involving(current_user).order("created_at DESC")
      @groupconversations = Groupconversation.joins(:users).where(:users => {:id => current_user.id}).order("created_at DESC")
      @assets = Asset.involving(current_user)
  end
end
